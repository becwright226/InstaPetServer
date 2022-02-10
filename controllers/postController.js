const router = require('express').Router();
const { PostModel } = require('../model/index');
let validateJWT = require('../middleware/validate-session')

//! CREATING A POST:
router.post("/", validateJWT, async (req, res) => {

  const { image, desc, petType, public } = req.body
  const { id } = req.user;
  try {
      const createPost = await PostModel.create({
          image, 
          desc,
          petType,
          public,
          ownerId: id
      });

      console.log(createPost);

      res.status(201).json({
          message: 'Post successful',
          createPost
      })
  } catch (err) {
      res.status(500).json({
          message: `Failed to post ${err.message}`
      })
  }
});


//! GET ALL PET POSTS BY ALL USERS
router.get('/allpets', async (req, res) => {
  try {
      const allPosts = await PostModel.findAll()

      res.status(200).json(allPosts)

  } catch (err) {

      res.status(500).json({
          error: err,
          message: "The server broke but the app is still running"
      });
  }
});

//! GET ALL YOUR OWN POSTS - This is actually just getting all posts?????????????????????
router.get("/mypets", validateJWT, async (req,res) => {
    let { id } = req.user;
    try {
        const userPosts = await PostModel.findAll({
            where: {
                ownerId: id
            }
        });
        res.status(200).json(userPosts);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});


//! GET POSTS BY public
router.get('/public', async (req, res) => {
    try {
        const results = await PostModel.findAll({
            where: { public: true }
        });
        res.status(200).json(results);
    }  catch (err) {
        res.status(500).json({ error: err });
    }
    console.log(results, '***********')
});


//! GET POSTS BY PET TYPE
router.get('/:petType', async (req, res) => {
    const  { petType } = req.params;
    try {
        const results = await PostModel.findAll({
            where: { petType: petType, public: true }
        });
        res.status(200).json(results);
    }  catch (err) {
        res.status(500).json({ error: err });
    }
});


//! UPDATE POST BY ID:
router.put('/:id', validateJWT, async (req, res) => {
    const { image, desc, petType, public } = req.body;
    const postId = req.params.id;
    const userId = req.user.id;

    const query = {
        where: {
            id: postId,
            ownerId: userId
        }
    };

    const updatedPost = {
        image: image, 
        desc: desc, 
        petType: petType, 
        public: public
    };

    try {
        const update = await PostModel.update(updatedPost, query);
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});


router.delete("/:id", validateJWT, async (req,res) => {
    const ownerId = req.user.id;
    const postId = req.params.id;

    try {
        const query = {
            where: {
                id: postId,
                ownerId: ownerId
            }
        };

        await PostModel.destroy(query);
        res.status(200).json({ message: "Image Removed"});
    } catch (err) {
        res.status(500).json({ error: err });
    }
})



 //! GET LOG BY ID:
// router.get('/:id', validateJWT, async (req, res) => {
//     const  id = req.params.id;
//     try {
//         const results = await PostModel.findAll({
//             where: { ownerId: id }
//         });
//         res.status(200).json(results);
//     }  catch (err) {
//         res.status(500).json({ error: err });
//     }
// });







module.exports = router;