const express =require('express')
const mongoose =require('mongoose')
const user = require('./user.controller')
const app = express()
const port = 3000

app.use(express.static('app'))
app.use(express.json())
mongoose.connect('mongodb+srv://gebolic1500:1BwoQDM9ty99OiNC@cluster0.riqzzjx.mongodb.net/miapp?retryWrites=true&w=majority')

app.get('/users',user.list)

app.post('/users', user.create)

app.get('/users:id',user.get)

app.put('/users:id',user.update)

app.patch('/users:id',user.update)

app.delete('/usesrs:id',user.destroy)

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});


app.get('*',(req,res)=>{
    res.status(404).send('Esta pagina no existe')
})

app.listen(port,() =>{
    console.log('Arrancando la aplicacion')
})