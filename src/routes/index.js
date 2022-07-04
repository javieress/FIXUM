const express = require('express')
const router = express.Router()

router.get('/',(req,res,next) => {
    res.render('index.ejs',{title: '  FIXUM'})
})
router.get('/login',(req,res,next) => {
    res.render('login.ejs',{title: ' | Login'})
})
router.get('/admin-profile',(req,res,next) => {
    res.render('./profiles/admin-profile.ejs',{title: ' | Perfil Administrador'})
})
router.get('/user-profile',(req,res,next) => {
    res.render('user-profile.ejs',{title: ' | Perfil Usuario'})
})
router.get('/contact',(req,res,next) => {
    res.render('contact.ejs',{title: ' | Contacto'})
})
router.get('/scan',(req,res,next) => {
    res.render('prueba_LectorQR.ejs',{title: 'Lector QR'})
})




// solo prueba del creador de qr
router.get('/qr-generator',(req,res,next) => {
    // res.render('qr-code-generator.ejs',{title: 'FIXUM'})
    res.render('qr-code-generator.ejs',{title: ' | Generador QR'})

})


module.exports = router