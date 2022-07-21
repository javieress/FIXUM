const express = require('express')
const router = express.Router()

const asset = require('../controllers/asset.controller')
const auth = require('../middlewares/authJwt')

router.get('/:id',async (req,res) =>{
    const details = await auth.details(req,res)
    console.log(details);
    res.render('./details/'+details,{title: ' | Información del Activo', asset: await asset.get(req,res), navBar: await auth.navigationBar(req)})
} )

module.exports = router