const jwt = require("jsonwebtoken");
const { UserModel } = require("../models");

const validateJWT = async (req, res, next) => {
    try {
    if (req.method === "OPTIONS") {
       return next();
    } else if (
        req.headers.authorization){
            const {authorization} = req.header 
            const payload = authorization ? jwt.verify
            (authorization, process.env.JWT_SECRET_KEY): undefined

            if (payload) {
                let foundUser = await UserModel.findOne({
                    where: {id: payload.id}
                })

                if (foundUser) {
                    req.User = foundUser
                    next()
                } else {
                    res.status(400).json({
                        message: "User not found"
                    })
                }
            } else {
                res.status(401).json({
                    message:"Invalid Token"
                })
            }
        } else {
            res.status(403).json({
                message: "Forbidden"
            })
        }
    } catch (err) {
        res.status(500).json({
            message: err
        })
        
    }
}

module.exports = validateJWT;
