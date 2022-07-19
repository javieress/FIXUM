const express = require('express')
const router = express.Router()

const asset = require('../controllers/asset.controller')
const auth = require('../middlewares/authJwt')

router.get('/:id',async (req,res) =>{
    res.render('./details/asset-details.ejs',{title: ' | Activo', asset: await asset.get(req,res), navBar: await auth.navigationBar(req)})
} )

module.exports = router