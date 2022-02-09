const router = require('express').Router()
const {PostModel}= require('../model')
const validateJWT = require("../middleware/validate-session")

router.post('/', validateJWT, async (req, res) => {
const { image, desc, petType} = req.body
const {id} = req.user
    try{
        const createPost = await PostModel.create({
            image,
            desc,
            petType,
            ownerId: id
        })
        console.log(createPost)
        res.status(201).json({
            message: 'Post successfully created',
            createPost
        })
    }catch(err) {
        res.status(500).json({
            message: `Failed to create post ${err}`
        })
    }
})
module.exports =router