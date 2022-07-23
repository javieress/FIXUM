const express = require('express')
const config = require('./config')
const path = require('path')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')
const registerRouter = require('./routes/registers')
const reportsRouter = require('./routes/reports')
const detailsRouter = require('./routes/details')
const authsRouter = require('./routes/auth')
const qrRouter = require('./routes/qr')
const editRouter=require('./routes/edit')

var session = require('express-session');
var MSSQLStore = require('connect-mssql')(session);


const app = express()

// Settings
app.set('port', config.port) 
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.set('trust proxy', 1)

// Conexión con la base de datos para guardar datos de sesión
var dbConfig = {
    user: 'adinfinitum_SQLLogin_1',
    password: 'jync46vhxn',
    server: 'fixus-db.mssql.somee.com', 
    database: 'fixus-db',
}

app.use(session({
    store: new MSSQLStore(dbConfig), // options are optional
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
}));

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// Rutas
app.use('/',indexRouter)
app.use('/register',registerRouter)
app.use('/reports',reportsRouter)
app.use('/details',detailsRouter)
app.use('/qr',qrRouter)
app.use('/auth',authsRouter)
app.use('/edit',editRouter)
app.use((err,req,res,next) => {
    res.redirect('/error')
})

// Archivos estáticos
app.use(express.static(path.join(__dirname,'public')))

app.listen(app.get('port'), () => {
    console.log('Server on port',app.get('port'));
})