const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://gebolic1500:1BwoQDM9ty99OiNC@cluster0.riqzzjx.mongodb.net/miapp?retryWrites=true&w=majority')

const User = mongoose.model('User',{
    username: String,
    edad: Number,
})

const crear = async () => {
    const user = User ({username: 'Giovanni Eboli', edad: 25})
    const SavedUser = await user.save()
    console.log(SavedUser)
}
//crear()
const BuscarTodo =async()=>{
    const users = await User.find()
    console.log(users)
}   
const Buscar = async()=>{
    const user = await User.find({username: 'Jonas Sanchez'})
    console.log(user)
}
const BuscarUno = async()=>{
    const user = await User.findOne({username: 'Jonas Sanchez'})
    console.log(user)
}
const actualizar = async() =>{
    const user = await User.findOne({username: 'Jonas Sanchez'})
    console.log(user)
    user.edad = 27
    await user.save()
}
const eliminar = async() =>{
    const user = await User.findOne({username: 'Jonas Sanchez'})
    console.log(user)
    if (user){
        await user.deleteOne({_id:'64ad7eb0d490d24896aad868'}) 
    }
}

eliminar()