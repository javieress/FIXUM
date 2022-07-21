const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { expressjwt: expressJwt } = require("express-jwt");

const assetController = require('../controllers/asset.controller')
const printerController = require('../controllers/printer.controller')
const qrController = require('../controllers/qr-reader.controller')
const userController = require('../controllers/user.controller');
const authController = require('../auth/auth.controller')
const {verifyToken, isAdmin ,navigationBar,isAdminOrUser,isUser} = require('../middlewares/authJwt')
const User = require('../models/User');

const notificationsController = require('../controllers/notifications.controller')

router.get('/',async (req,res,next) => {
    const navBar = await navigationBar(req)
    res.render('index.ejs',{title: '  FIXUM', navBar: navBar })
})

router.get('/login',async (req,res,next) => {
    if (req.session.token) {
        res.redirect('/')
    }else{
        const navBar = await navigationBar(req)
        res.render('login.ejs',{title: ' | Inicio de Sesión',message: '', navBar: navBar })
    }
})

router.get('/logout',verifyToken,async (req,res,next) => {
    authController.Auth.logout(req,res,next)
})

router.get('/admin-profile',verifyToken,isAdmin,async (req,res,next)=> {
    const navBar = await navigationBar(req)
    res.render('./profiles/admin-profile.ejs',{title: ' | Perfil Administrador', navBar: navBar })
})
router.get('/user-profile',verifyToken,isUser,async (req,res,next) => {
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
router.get('/notifications',verifyToken,isAdmin,notificationsController.get)

//pruebas de home
router.get('/homeA',async (req,res,next) => {
    const navBar = await navigationBar(req)
    res.render('home/homeAdmin.ejs',{title: ' | Inicio', navBar: navBar })
})
router.get('/homeU',async (req,res,next) => {
    const navBar = await navigationBar(req)
    res.render('home/homeUser.ejs',{title: ' | Inicio', navBar: navBar })
})

// solo prueba del creador de qr
router.get('/qr-generator',async (req,res,next) => {
    // res.render('qr-code-generator.ejs',{title: 'FIXUM'})
    const navBar = await navigationBar(req)
    res.render('qr-code-generator.ejs',{title: ' | Generador QR', navBar: navBar })

})

router.get('/print', verifyToken, isAdminOrUser, async(req,res,next) => {
    const navBar = await navigationBar(req)
    res.render('select_qr_to_print.ejs',{title: ' | Imprimir QR', assetList: await assetController.list(), navBar: navBar})
})
router.post('/print', printerController.create_qr_download)

router.get('/error', async (req,res,next) => {
    const navBar = await navigationBar(req)
    res.render('error.ejs',{title: ' | Error', navBar: navBar })
})


module.exports = router