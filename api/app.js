const express = require('express') //es como importar express
const mongoose = require('mongoose')
const user = require('./user.controller')
const app = express()
const port = 4000

app.use(express.json())
// mongoose.connect('mongodb+srv://Javieres:nicolas123@cluster0.kiirv.mongodb.net/miapp?retryWrites=true&w=majority')

app.get('/users',user.list)
app.get('/users/:id', user.get)
app.post('/users', user.create)
app.put('/users/:id', user.update)
app.patch('/users/:id', user.update)
app.delete('/users/:id', user.delete)

app.use(express.static('app'))

app.get('/',(req,res) => {
    console.log(__dirname)
    res.sendFile(`${__dirname}/index.html`)
})

app.get('*', (req,res) =>{
    res.status(404).send('Error 404, No encontrado')
} )

app.listen(port, () => {
    console.log('Arrancando la aplicación')
})

