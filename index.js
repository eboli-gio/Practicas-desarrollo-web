const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {expressjwt} = require('express-jwt')
const User = require('./user')

mongoose.connect('mongodb+srv://gebolic1500:1BwoQDM9ty99OiNC@cluster0.riqzzjx.mongodb.net/auth?retryWrites=true&w=majority')

const app = express()

app.use(express.json())
const validateJwt = expressjwt({secret:process.env.SECRET, algorithms:['HS256']})
const signToken = _id => jwt.sign({_id}, process.env.SECRET)

app.post('/register',async(req,res)=>{
    const {body} = req
    console.log({body})
    try{
        const isUser = await User.findOne({email:body.email})
        if(isUser){
            return res.status(403).send('Ususario ya existe')
        }
        const salt = await bcrypt.genSalt()
        const hashed = await bcrypt.hash(body.password, salt)
        const user = await User.create({email:body.email, password: hashed, salt})
        const signed = signToken(user._id)
        res.status(201).send(signed)
    }catch(err){
        console.log(err)
        res.status(500).send(err.message)
    }
})

app.post('/login', async (req,res)=>{
    const {body} = req
    try{
            const user =await User.findOne({email:body.email})
            if (!user){
                res.status(403).send('Usuario y/o contraseña invalido')
            }else{
                const isMatch =  await bcrypt.compare(body.password,user.password)
                if(isMatch){
                    const  signed = signToken(user._id)
                    res.status(200).send(signed)
                }else{
                    res.status(403).send('Ususario y/o contraseña invvalida')
                }
            }
    }catch(err){
        res.status(500).send(err.message)
    }  
})
const findAndAssignUser = async(req,res,next)=>{
    try{
        const user =await User.findById(req.auth._id)
        if(!user){
            res.status(401).send()
        }
        req.user=user
        next()
    }catch(e){
        next(e)
    }
}
const isAuthenticated= express.Router().use(validateJwt,findAndAssignUser)
app.get('/lele',isAuthenticated, (req,res)=>{
    throw new Error('nuevo error')
    //res.send(req.user)
})
app.use((err,req,res,next)=>{
    console.error('Mi nuevo error')
    next(err)
})
app.use((err,req,res,next)=>{
    res.send('Ha ocurrido un error :(')
})
app.listen(3000, ()=>{
    console.log('Listening in port 3000')
})