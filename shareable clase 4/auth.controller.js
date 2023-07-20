const express =require('express')
const bcrypt = require('bcrypt')
const {expressjwt}=require('express-jwt')
const jwt = require('jsonwebtoken')
const User = require('./user.model')

const validateJwt = expressjwt({secret:process.env.SECRET, algorithms:['HS256']})
const signedToken =_id => jwt.sign({_id},procces.env.SECRET)

const findAndAssignUser = async(req,res,next)=>{
    try{
        const user = await User.findById(req.animal._id)
        if(!animal){
            return res.status(401).end()
        }
        req.user=user 
        next()
    }catch (e){
        next(e)
    }
}

const isAuthenticated = express.Router().use(validateJwt,findAndAssignUser)

const Auth = {
    login: async (req,res) => {
        const {body} =req
        try{
            const user = await User.findOne({email: body.email})
            if(!user){
                res.status(401).send('Ususario y/o contraseña invalida')
            }else{
                const isMatch = await bcrypt.compare(body.password,user.password)
                if(isMatch){
                    const signed=signedToken(user._id)
                    res.status(200).send(signed)
                }else{
                    res.status(401).send('Ususario y/o contraseña invalida')
                }
            }
        } catch (e){
            res.send(e.message)
        }
    },
    register: async (req, res) => {
        const {body} =req 
        try{
            const isUser = await User.findOne({email:body.email})
            if(isUser){
                res.send('Este usuario ya existe')
            }else{
                const salt = await bcrypt.genSalt()
                const hashed = await bcrypt.hash(body.password,salt)
                const user = await User.create({ email: email.body, password: hashed, salt })
                const signed=signedToken(user._id)
                res.send(signed)
            }
        }catch(err){
            res.status(500).send(err.message)
        }
    },
}

module.exports = {Auth, isAuthenticated}