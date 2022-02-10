const router = require("express").Router()
const { UserModel } = require("../model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

//! REGISTER
router.post("/register", async (req, res) => {

  const { firstName, lastName, petName, email, password, } = req.body

  try {
      const newUser = await UserModel.create({
          firstName,
          lastName,
          petName,
          email,
          password: bcrypt.hashSync(password, 10),
          
      })

      const token = jwt.sign(
          { id: newUser.id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: 60 * 60 * 24 }
      )

      res.status(201).json({
          message: "User created",
          user: newUser,
          token
      })

  } catch(err) {
      if (err.name === "SequelizeUniqueConstraintError") {
          res.status(409).json({
              message: `Email already in use.`
          })
      } else {
          res.status(500).json({
              message: `You don' messed up and I don't know where.`,
              error: err
          })
      }
  }
})



//! LOGIN

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      let loginUser = await UserModel.findOne({
          where: { email }
      });

      if (loginUser) {
              let passwordComparison = await bcrypt.compare(password, loginUser.password);
  
              if (passwordComparison) {
      
              let token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET_KEY, {expiresIn: 60 * 60 * 24});
      
              res.status(200).json({
                  user: loginUser,
                  message: 'User successfully logged in!',
                  token
                  });
              } 
      
      } else {
          res.status(401).json({
              message: 'Incorrect email'
          })
      } 
    
     } catch (error) {
         console.log(error)
         res.status(500).json({
             message: 'Failed to log user in'
         })
       }
  });
  











module.exports = router