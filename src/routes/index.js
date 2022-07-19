const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { expressjwt: expressJwt } = require("express-jwt");


const qrController = require('../controllers/qr-reader.controller')
const userController = require('../controllers/user.controller');
const authController = require('../auth/auth.controller')
const {verifyToken, isAdmin ,navigationBar} = require('../middlewares/authJwt')
const User = require('../models/User');

const notificationsController = require('../controllers/notifications.controller')

router.get('/',async (req,res,next) => {
    const navBar = await navigationBar(req)
    res.render('index.ejs',{title: '  FIXUM', navBar: navBar })
})

router.get('/login',async (req,res,next) => {
    const navBar = await navigationBar(req)
    res.render('login.ejs',{title: ' | Login',message: '', navBar: navBar })
})
router.get('/log', async (req,res,next) => authController.Auth.login(req,res), async (req,res,next) => res.redirect('/')
)

router.get('/admin-profile',verifyToken,isAdmin,async (req,res,next)=> {
    const navBar = await navigationBar(req)
    res.render('./profiles/admin-profile.ejs',{title: ' | Perfil Administrador', navBar: navBar })
})
router.get('/user-profile',async (req,res,next) => {
    const navBar = await navigationBar(req)
    res.render('user-profile.ejs',{title: ' | Perfil Usuario', navBar: navBar })
})
router.get('/contact',async (req,res,next) => {
    const navBar = await navigationBar(req)
    res.render('contact.ejs',{title: ' | Contacto', navBar: navBar })
})
router.get('/scan',async (req,res,next) => {
    const navBar = await navigationBar(req)
    res.render('prueba_LectorQR.ejs',{title: ' | Lector QR', message: '', navBar: navBar })
})
router.get('/notifications',notificationsController.get)

//pruebas de home
router.get('/homeA',async (req,res,next) => {
    const navBar = await navigationBar(req)
    res.render('home/homeAdmin.ejs',{title: ' | Home Admin', navBar: navBar })
})
router.get('/homeU',async (req,res,next) => {
    res.render('home/homeUser.ejs',{title: ' | Home', navBar: navBar })
})


// solo prueba del creador de qr
router.get('/qr-generator',async (req,res,next) => {
    // res.render('qr-code-generator.ejs',{title: 'FIXUM'})
    const navBar = await navigationBar(req)
    res.render('qr-code-generator.ejs',{title: ' | Generador QR', navBar: navBar })

})


module.exports = router