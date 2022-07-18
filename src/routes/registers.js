const express = require('express')
const router = express.Router()

const userController = require('../controllers/user.controller')
const mailController = require('../controllers/mail.controller')
const assetController = require('../controllers/asset.controller')
const assetTypeController = require('../controllers/asset-type.controller')
const locationController = require('../controllers/location.controller')

router.get('/user',userController.index)
router.post('/user',userController.post)

router.get('/asset',assetController.index)
router.post('/asset',assetController.post)

router.get('/location',locationController.index)
router.post('/location',locationController.post)

router.get('/asset-type',assetTypeController.index)
router.post('/asset-type',assetTypeController.post)

router.post('/contact',mailController.contact)

router.post('/notification',mailController.adminNotification)

module.exports = router