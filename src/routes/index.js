const express = require('express')
const router = express.Router()

router.get('/',(req,res,next) => {
    res.render('index.ejs',{title: 'FIXUM'})
})
router.get('/login',(req,res,next) => {
    res.render('login.ejs',{title: 'Login FIXUM'})
})
router.get('/user-register',(req,res,next) => {
    res.render('user-register.ejs',{title: 'Login FIXUM'})
})


// solo prueba del creador de qr
router.get('/qr-generator',(req,res,next) => {
    // res.render('qr-code-generator.ejs',{title: 'FIXUM'})
    res.render('qr-code-generator.ejs',{title: 'FIXUM'})

})


module.exports = router