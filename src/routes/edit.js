const express = require('express')
const router = express.Router()

const userController = require('../controllers/user.controller')
const mailController = require('../controllers/mail.controller')
const assetController = require('../controllers/asset.controller')
const assetTypeController = require('../controllers/asset-type.controller')
const locationController = require('../controllers/location.controller')
const userPosition = require('../controllers/userPosition.controller')
const SendmailTransport = require('nodemailer/lib/sendmail-transport')



router.get('/location',async (req,res,next)=>{
    res.render('./edits/location.ejs',{title: ' | Edit ',locations:await locationController.list()})
})
router.get('/AssetTypes',async (req,res,next)=>{
    res.render('./edits/AssetTypes.ejs',{title: ' | Edit ',AssetTypes:await assetTypeController.list()})
})
router.get('/Users',async (req,res,next)=>{
    res.render('./edits/Users.ejs',{title: ' | Edit ',Users:await userController.list()})
})
router.get('/Assets',async (req,res,next)=>{
    res.render('./edits/Assets.ejs',{title: ' | Edit ',Assets:await assetController.list()})
})



module.exports=router