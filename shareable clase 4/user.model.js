const mongoose = require('mongoose')
 const Users = mongoose.model('Users',{
    email:{type:String, required:true, minLenght: 5},
    password:{type:String, required:true},
    salt:{type:String, required:true},
})

 module.exports =Users