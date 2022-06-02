import activosRoutes from './routes/activos.routes'

const express = require('express')
const config = require('./config')
const path = require('path')

const app = express()


// settings
app.set('port', config.port) 
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

// routs
app.use(require('./routes/index'))
app.use(activosRoutes)

// static files
app.use(express.static(path.join(__dirname,'public')))

app.listen(app.get('port'), () => {
    console.log('Server on port',app.get('port'));
})