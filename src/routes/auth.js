const express = require('express')
const router = express.Router()

const authController = require('../auth/auth.controller')

// Ruta de envío de datos de sesión
router.post('/login', authController.Auth.login)


module.exports = router 