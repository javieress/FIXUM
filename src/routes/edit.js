const express = require('express')
const router = express.Router()

const userController = require('../controllers/user.controller')
const assetController = require('../controllers/asset.controller')
const assetTypeController = require('../controllers/asset-type.controller')
const locationController = require('../controllers/location.controller')
const userPosition = require('../controllers/userPosition.controller')
const auth = require('../middlewares/authJwt')

// Ruta de vista general de Ubicaciones
router.get('/location', auth.verifyToken, auth.isAdmin, async (req, res, next) => {
    res.render('./edits/location.ejs', { title: ' | Ubicaciones ', locations: await locationController.list(), navBar: await auth.navigationBar(req) })
})
// Ruta de vista general de Tipos de Activos
router.get('/AssetTypes', auth.verifyToken, auth.isAdmin, async (req, res, next) => {
    res.render('./edits/AssetTypes.ejs', { title: ' | Tipos de Activos ', AssetTypes: await assetTypeController.list(), navBar: await auth.navigationBar(req) })
})
// Ruta de vista general de Usuarios
router.get('/Users', auth.verifyToken, auth.isAdmin, async (req, res, next) => {
    res.render('./edits/Users.ejs', { title: ' | Usuarios ', Users: await userController.list(), navBar: await auth.navigationBar(req) })
})
// Ruta de vista general de Activos
router.get('/Assets', auth.verifyToken, auth.isAdminOrUser, async (req, res, next) => {
    res.render('./edits/Assets.ejs', { title: ' | Activos ', Assets: await assetController.list(), navBar: await auth.navigationBar(req) })
})
// Ruta de vista general de Cargos
router.get('/UserPosition', auth.verifyToken, auth.isAdminOrUser, async (req, res, next) => {
    res.render('./edits/UserPosition.ejs', { title: ' | Cargos ', userPosition: await userPosition.list(), navBar: await auth.navigationBar(req) })
})

module.exports = router