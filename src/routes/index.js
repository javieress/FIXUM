const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { expressjwt: expressJwt } = require("express-jwt");


const qrController = require('../controllers/qr-reader.controller')
const userController = require('../controllers/user.controller');
const authController = require('../auth/auth.controller')
const {verifyToken, isAdmin} = require('../middlewares/authJwt')
const User = require('../models/User');


router.get('/',(req,res,next) => {
    res.render('index.ejs',{title: '  FIXUM'})
})
router.get('/login',(req,res,next) => {
    res.render('login.ejs',{title: ' | Login',message: ''})
})
router.get('/log', async (req,res,next) => authController.Auth.login(req,res)
)

router.get('/admin-profile',verifyToken,isAdmin,(req,res,next)=> {
    res.render('./profiles/admin-profile.ejs',{title: ' | Perfil Administrador'})
})
router.get('/user-profile',(req,res,next) => {
    res.render('user-profile.ejs',{title: ' | Perfil Usuario'})
})
router.get('/contact',(req,res,next) => {
    res.render('contact.ejs',{title: ' | Contacto'})
})
router.get('/scan',qrController.index)


// solo prueba del creador de qr
router.get('/qr-generator',(req,res,next) => {
    // res.render('qr-code-generator.ejs',{title: 'FIXUM'})
    res.render('qr-code-generator.ejs',{title: ' | Generador QR'})

})


module.exports = router