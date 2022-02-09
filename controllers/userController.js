const router = require('express').Router()
const{UserModel} = require('../model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/register', async (req,res) =>{

    const{firstName, lastName, petName, email, password} = req.body

    try {
        const newUser = await UserModel.create({
            firstName,
            lastName,
            petName,
            email,
            password: bcrypt.hashSync(password, 10),
        })
        const token = jwt.sign({id: newUser.id}, 
            process.env.JWT_SECRET_KEY, 
            {expiresIn: 60 * 60 * 24})
    
        res.status(201).json({
            message: "User Created",
            user: newUser,
            token
        })

    } catch(err) {
        if (err.name === "SequelizeUniqueConstraintError") {
            res.status(409).json({
                messgae: "email in use"
            })
        } else {
            res.status(500).json({
                message: `You fail. do better`
            })
        }
        }
    })
    router.post ('/login', async (req, res) => {
        const {email,password}= req.body;
    
        try {
            const loginUser = await UserModel.findOne({
                where: {
                email,
                }
            });
            //try allows us to move forward and "TRY"
       if (loginUser) {
            let passwordComparison = await bcrypt.compare(password, loginUser.password)
    
            if (passwordComparison) {
    
                let token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET_KEY,{expiresIn: 60 * 60 * 24})
    
                res.status(200).json({
                    user: loginUser,
                    message: "You may enter",
                    token
                })
            }

            } else {
                res.status(401).json({
                    message:"incorrect email or password, YOU SHALL NOT PASSSSSS"
                })
            }
        } catch (err) {
            res.status(500).json({
                message: "Fail!!! Go research your mistakes"
            })
        }
    })
    

    module.exports = router;