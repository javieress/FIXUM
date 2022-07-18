const express = require('express')
const router = express.Router()

const asset = require('../controllers/asset.controller')
const assetTypes=require('../controllers/asset-type.controller')


router.get('/',(req,res,next) => {
    res.render('./reports/reports.ejs',{title: ' | Reportes'})
})
router.get('/last-10-added',async (req,res,next) => {
    const top10Assets = await asset.last10Added()
    res.render('./reports/last-10-added.ejs',{title: ' | Reportes', last10AssetAdded: await top10Assets})
})
router.get('/totalByAssets',async (req,res,next) => {
    const totalByAssets = await asset.AssetsPrices()
    res.render('./reports/totalByAssets.ejs',{title: ' | Reportes', totalByAssets: await totalByAssets})
})
router.get('/totalByAssetsTypes',async (req,res,next) => {
    const totalByAssetsTypes = await assetTypes.TotalByAssetsTypes()
    res.render('./reports/totalByAssetsTypes.ejs',{title: ' | Reportes', totalByAssetsTypes: await totalByAssetsTypes})
})
router.get('/totalAssetsByLocation',async (req,res,next) => {
    const totalAssetsByLocation = await asset.TotalAssetsByLocation()
    res.render('./reports/totalAssetsByLocation.ejs',{title: ' | Reportes', totalAssetsByLocation: await totalAssetsByLocation})
})




module.exports = router