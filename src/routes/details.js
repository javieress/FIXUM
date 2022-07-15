const express = require('express')
const router = express.Router()

const asset = require('../controllers/asset.controller')

router.get('/:id',async (req,res) =>{
    res.render('./details/asset-details.ejs',{title: ' | Activo', asset: await asset.get(req,res)})
} )


module.exports = router