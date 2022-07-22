const express = require('express')
const router = express.Router()

const assetController = require('../controllers/asset.controller')
const printerController = require('../controllers/printer.controller')
const userController = require('../controllers/user.controller');
const authController = require('../auth/auth.controller')
const { verifyToken, isAdmin, navigationBar, isAdminOrUser, isUser, mainView } = require('../middlewares/authJwt')
const notificationsController = require('../controllers/notifications.controller')

// Ruta de vista inicial
router.get('/', async (req, res, next) => {
    const navBar = await navigationBar(req)
    const main = await mainView(req, res)
    res.render('home/' + main, { title: '  FIXUM', navBar: navBar })
})

// Ruta de vista de inicio de sesión
router.get('/login', async (req, res, next) => {
    if (req.session.token) {
        res.redirect('/')
    } else {
        const navBar = await navigationBar(req)
        res.render('login.ejs', { title: ' | Inicio de Sesión', message: '', navBar: navBar })
    }
})

// Ruta de envio de datos de cierre de sesión
router.get('/logout', async (req, res, next) => {
    authController.Auth.logout(req, res, next)
})

// Ruta de vista de perfil de usuario administrador
router.get('/admin-profile', verifyToken, isAdmin, async (req, res, next) => {
    const navBar = await navigationBar(req)
    res.render('./profiles/admin-profile.ejs', { title: ' | Perfil Administrador', navBar: navBar, user: await userController.getUserWithPosition(req, res) })
})

// Ruta de vista de perfil de usuario registrado
router.get('/user-profile', verifyToken, isUser, async (req, res, next) => {
    const navBar = await navigationBar(req)
    res.render('./profiles/user-profile.ejs', { title: ' | Perfil Usuario', navBar: navBar, user: await userController.getUserWithPosition(req, res) })
})

// Ruta de vista de contacto
router.get('/contact', async (req, res, next) => {
    const navBar = await navigationBar(req)
    res.render('contact.ejs', { title: ' | Contacto', navBar: navBar })
})

// Ruta de vista de escanear QR
router.get('/scan', async (req, res, next) => {
    const navBar = await navigationBar(req)
    res.render('prueba_LectorQR.ejs', { title: ' | Lector QR', message: '', navBar: navBar })
})

// Ruta de vista de notificaciones desde usuario administrador
router.get('/notifications', verifyToken, isAdmin, notificationsController.get)

// Ruta de vista de generación de codigos QRs
router.get('/print', verifyToken, isAdminOrUser, async (req, res, next) => {
    const navBar = await navigationBar(req)
    res.render('select_qr_to_print.ejs', { title: ' | Imprimir QR', assetList: await assetController.detailList(), navBar: navBar })
})

// Ruta de envio de datos de generación de codigos QRs
router.post('/print', printerController.create_qr_download)

// Ruta de vista de error
router.get('/error', async (req, res, next) => {
    const navBar = await navigationBar(req)
    res.render('error.ejs', { title: ' | Error', navBar: navBar })
})

// Ruta de vista de información
router.get('/info',verifyToken,isAdmin,async (req,res,next)=> {
    const navBar = await navigationBar(req)
    res.render('info.ejs',{ title: ' | Info', navBar: navBar})
})
router.get('/user-manual',verifyToken,isAdmin,printerController.downloadUserManual)
router.get('/admin-manual',verifyToken,isAdmin,printerController.downloadAdminManual)
router.get('/db-doc',verifyToken,isAdmin,printerController.downloadDbDocumentation)


module.exports = router