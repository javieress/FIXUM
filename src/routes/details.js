const express = require('express')
const router = express.Router()

const asset = require('../controllers/asset.controller')
const auth = require('../middlewares/authJwt')

// Ruta de vista de detalles de Activos
router.get('/:id', async (req, res) => {
    const details = await auth.details(req, res)
    res.render('./details/' + details, { title: ' | Información del Activo', asset: await asset.get(req, res), navBar: await auth.navigationBar(req) })
})

module.exports = router