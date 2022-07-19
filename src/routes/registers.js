const express = require('express')
const router = express.Router()

const userController = require('../controllers/user.controller')
const mailController = require('../controllers/mail.controller')
const assetController = require('../controllers/asset.controller')
const assetTypeController = require('../controllers/asset-type.controller')
const locationController = require('../controllers/location.controller')
const userPosition = require('../controllers/userPosition.controller')

router.get('/user',userController.index)
router.post('/user',userController.post)
router.get('/user-delete/:id',userController.delete)
router.post('/user-update',userController.update)
router.get('/user-edit/:id', async (req,res,next) => {
    res.render('./register/user-edit.ejs',{title: ' | Edit', user: await userController.get(req,res), message: '',userPosition: await userPosition.list()})
})

router.get('/asset',assetController.index)
router.post('/asset',assetController.post)
router.get('/asset-delete/:id',assetController.delete)
router.post('/asset-update',assetController.update)
router.get('/asset-edit/:id', async (req,res,next)=> {
    res.render('./register/asset-edit.ejs',{title: ' | Edit', asset: await assetController.get(req,res),message: '',location: await locationController.list(), assetType: await assetTypeController.list(),user: await userController.list()})
})
// router.get('/edit-asset/:id',assetController.get)

router.get('/location',locationController.index)
router.post('/location',locationController.post)
router.get('/location-delete/:id',locationController.delete)
router.post('/location-update',locationController.update)
router.get('/location-edit/:id', async (req,res,next) => {
    res.render('./register/location-edit.ejs',{title: ' | Edit', location: await locationController.get(req,res), message: ''})
})


router.get('/asset-type',assetTypeController.index)
router.post('/asset-type',assetTypeController.post)
router.get('/asset-type-delete/:id',assetTypeController.delete)
router.post('/asset-type-update',assetTypeController.update)
router.get('/asset-type-edit/:id', async (req,res,next) => {
    res.render('./register/asset-type-edit.ejs',{title: ' | Edit', assetType: await assetTypeController.get(req,res), message: ''})
})


router.post('/contact',mailController.contact)

router.post('/notification',mailController.adminNotification)

module.exports = router