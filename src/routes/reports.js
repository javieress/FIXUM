const express = require('express')
const router = express.Router()

const asset = require('../controllers/asset.controller')

router.get('/',(req,res,next) => {
    res.render('./reports/reports.ejs',{title: ' | Reportes'})
})
router.get('/last-10-added',(req,res,next) => {
    res.render('./reports/last-10-added.ejs',{title: ' | Reportes', last10AssetAdded: asset.last10Added()})
})

module.exports = router