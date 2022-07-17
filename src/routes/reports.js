const express = require('express')
const router = express.Router()

const asset = require('../controllers/asset.controller')
const { last10Added } = require('../models/Asset')

router.get('/',(req,res,next) => {
    res.render('./reports/reports.ejs',{title: ' | Reportes'})
})
router.get('/last-10-added',async (req,res,next) => {
    const top10Assets = await asset.last10Added()
    console.log(top10Assets)
    res.render('./reports/last-10-added.ejs',{title: ' | Reportes', last10AssetAdded: await top10Assets})
})

module.exports = router