const express = require('express')
const router = express.Router()

const userController = require('../controllers/user.controller')
const mailController = require('../controllers/mail.controller')
const assetController = require('../controllers/asset.controller')
const assetTypeController = require('../controllers/asset-type.controller')
const locationController = require('../controllers/location.controller')
const userPosition = require('../controllers/userPosition.controller')

const auth = require('../middlewares/authJwt')

//users
router.get('/user',auth.verifyToken,auth.isAdmin,async (req,res,next) => {
    res.render('./register/user-register.ejs',{title: ' | Registro de Usuario',message: '',userPosition: await userPosition.list(), navBar: await auth.navigationBar(req)})
})
router.post('/user',auth.verifyToken,auth.isAdmin,userController.post)
router.get('/user-delete/:id',auth.verifyToken,auth.isAdmin,userController.delete)
router.post('/user-update',auth.verifyToken,auth.isAdmin,userController.update)
router.post('/user-update-password',auth.verifyToken,auth.isAdmin,userController.updatePassword)
router.get('/user-edit-password/:id',auth.verifyToken,auth.isAdmin,async (req,res,next)=>{
    res.render('./register/password-edit.ejs',{title: ' | Edit', user: await userController.get(req,res), message: '', navBar: await auth.navigationBar(req)})
})
router.get('/user-edit/:id',auth.verifyToken,auth.isAdmin, async (req,res,next) => {
    res.render('./register/user-edit.ejs',{title: ' | Edit', user: await userController.get(req,res), message: '',userPosition: await userPosition.list(), navBar: await auth.navigationBar(req)})
})

//assets
router.get('/asset',auth.verifyToken,auth.isAdminOrUser,async (req,res,next) => {
    console.log('aqui');
    res.render('./register/asset-register.ejs',{title: ' | Registro de Activo',message: '', location: await locationController.list(), assetType: await assetTypeController.list(),user: await userController.list(), navBar: await auth.navigationBar(req)})
})
router.post('/asset',auth.verifyToken,auth.isAdminOrUser,assetController.post)
router.get('/asset-delete/:id',auth.verifyToken,auth.isAdminOrUser,assetController.delete)
router.post('/asset-update',auth.verifyToken,auth.isAdminOrUser,assetController.update)
router.get('/asset-edit/:id',auth.verifyToken,auth.isAdminOrUser, async (req,res,next)=> {
    res.render('./register/asset-edit.ejs',{title: ' | Edit', asset: await assetController.get(req,res),message: '',location: await locationController.list(), assetType: await assetTypeController.list(),user: await userController.list(), navBar: await auth.navigationBar(req)})
})

//locations
router.get('/location',auth.verifyToken,auth.isAdmin,async (req,res,next) => {
    res.render('./register/location-register.ejs',{title: ' | Ubicaciones',message: '', navBar: await auth.navigationBar(req)})
})
router.post('/location',auth.verifyToken,auth.isAdmin,locationController.post)
router.get('/location-delete/:id',auth.verifyToken,auth.isAdmin,locationController.delete)
router.post('/location-update',auth.verifyToken,auth.isAdmin,locationController.update)
router.get('/location-edit/:id',auth.verifyToken,auth.isAdminOrUser, async (req,res,next)=> {
    res.render('./register/location-edit.ejs',{title: ' | Edit', location: await locationController.get(req,res),message: '', navBar: await auth.navigationBar(req)})
})

//asset types
router.get('/asset-type',auth.verifyToken,auth.isAdmin,async (req,res,next) => {
    res.render('./register/asset-type-register.ejs', { title: ' | Tipos de Activos', message: '' , navBar: await auth.navigationBar(req)})
})
router.post('/asset-type',auth.verifyToken,auth.isAdmin,assetTypeController.post)
router.get('/asset-type-delete/:id',auth.verifyToken,auth.isAdmin,assetTypeController.delete)
router.post('/asset-type-update',auth.verifyToken,auth.isAdmin,assetTypeController.update)
router.get('/asset-type-edit/:id',auth.verifyToken,auth.isAdmin, async (req,res,next) => {
    res.render('./register/asset-type-edit.ejs',{title: ' | Edit', assetType: await assetTypeController.get(req,res), message: '', navBar: await auth.navigationBar(req)})
})

//UserPosition
router.get('/user-position',auth.verifyToken,auth.isAdmin,async (req,res,next) => {
    res.render('./register/userPosition-register.ejs', { title: ' | Cargo', message: '', navBar: await auth.navigationBar(req)})
})
router.post('/user-position',auth.verifyToken,auth.isAdmin,userPosition.post)
router.get('/user-position-delete/:id',auth.verifyToken,auth.isAdmin,userPosition.delete)
router.post('/user-position-update',auth.verifyToken,auth.isAdmin,userPosition.update)
router.get('/userPosition-edit/:id',auth.verifyToken,auth.isAdmin, async (req,res,next) => {
    res.render('./register/userPosition-edit.ejs',{title: ' | Edit', userPosition: await userPosition.get(req,res), message: '', navBar: await auth.navigationBar(req)})
})


router.post('/contact',auth.verifyToken,auth.isAdmin,mailController.contact)

router.post('/notification',auth.verifyToken,auth.isAdmin,mailController.adminNotification)

module.exports = router