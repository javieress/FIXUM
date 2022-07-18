const express = require('express')
const config = require('./config')
const path = require('path')
const bodyParser = require('body-parser')

const {Auth, isAuthenticated} = require('./auth/auth.controller.js')

const app = express()

const indexRouter = require('./routes/index')
const registerRouter = require('./routes/registers')
const reportsRouter = require('./routes/reports')
const detailsRouter = require('./routes/details')
const qrRouter = require('./routes/qr')
const { builtinModules } = require('module')

// settings
app.set('port', config.port) 
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
// controllers


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
// routs
app.use('/',indexRouter)
app.use('/register',registerRouter)
app.use('/reports',reportsRouter)
app.use('/details',detailsRouter)
app.use('/qr',qrRouter)



// app.use(express.urlencoded()); 
// app.use(express.json());  

app.post('/user-register',Auth.register)

// static files
app.use(express.static(path.join(__dirname,'public')))

app.listen(app.get('port'), () => {
    console.log('Server on port',app.get('port'));
})