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
// const session = require('express-session')

var session = require('express-session');
var MSSQLStore = require('connect-mssql')(session);


const app = express()
// settings
app.set('port', config.port) 
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.set('trust proxy', 1)
// controllers

var dbConfig = {
    user: 'adinfinitum_SQLLogin_1',
    password: 'jync46vhxn',
    server: 'fixus-db.mssql.somee.com', // You can use 'localhost\\instance' to connect to named instance
    database: 'fixus-db',

}

app.use(session({
    store: new MSSQLStore(dbConfig), // options are optional
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
}));



// app.use(session({
//     secret: process.env.SECRET,
//     resave: true,
//     saveUninitialized:true
// }))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// routs
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

// static files
app.use(express.static(path.join(__dirname,'public')))

app.listen(app.get('port'), () => {
    console.log('Server on port',app.get('port'));
})