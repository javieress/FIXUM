const express = require('express')
const router = express.Router()

const userController = require('../controllers/user.controller')
const mailController = require('../controllers/mail.controller')
const assetController = require('../controllers/asset.controller')
const assetTypeController = require('../controllers/asset-type.controller')
const locationController = require('../controllers/location.controller')
const userPosition = require('../controllers/userPosition.controller')

const auth = require('../middlewares/authJwt')

router.get('/user',async (req,res,next) => {
    res.render('./register/asset-register.ejs',{title: ' | Registro de Activo', location: await locationController.list(), assetType: await assetTypeController.list(),user: await userController.list(), navBar: await auth.navigationBar(req)})

})
router.post('/user',userController.post)
router.post('/user-update',userController.update)
router.get('/user-edit/:id', async (req,res,next) => {
    res.render('./register/user-edit.ejs',{title: ' | Edit', user: await userController.get(req,res), message: '',userPosition: await userPosition.list(), navBar: await auth.navigationBar(req)})
})

router.get('/asset',async (req,res,next) => {
    res.render('./register/user-register.ejs',{title: ' | Usuarios',message: '',userPosition: await userPosition.list(), navBar: await auth.navigationBar(req)})
})
router.post('/asset',assetController.post)
router.post('/asset-delete/:id',assetController.delete)
router.post('/asset-update',assetController.update)
router.get('/asset-edit/:id', async (req,res,next)=> {
    res.render('./register/asset-edit.ejs',{title: ' | Edit', asset: await assetController.get(req,res),message: '',location: await locationController.list(), assetType: await assetTypeController.list(),user: await userController.list(), navBar: await auth.navigationBar(req)})
})
// router.get('/edit-asset/:id',assetController.get)

router.get('/location',async (req,res,next) => {
    res.render('./register/location-register.ejs',{title: ' | Ubicaciones',message: '', navBar: await auth.navigationBar(req)})
})
router.post('/location',locationController.post)
router.post('/location-update',locationController.update)
router.get('/location-edit/:id', async (req,res,next) => {
    res.render('./register/location-edit.ejs',{title: ' | Edit', location: await locationController.get(req,res), message: '', navBar: await auth.navigationBar(req)})
})


router.get('/asset-type',async (req,res,next) => {
    res.render('./register/asset-type-register.ejs', { title: ' | Tipos de Activos', message: '' , navBar: await auth.navigationBar(req)})
})
router.post('/asset-type',assetTypeController.post)
router.post('/asset-type-update',assetTypeController.update)
router.get('/asset-type-edit/:id', async (req,res,next) => {
    res.render('./register/asset-type-edit.ejs',{title: ' | Edit', assetType: await assetTypeController.get(req,res), message: '', navBar: await auth.navigationBar(req)})
})

router.post('/contact',mailController.contact)

router.post('/notification',mailController.adminNotification)

module.exports = router