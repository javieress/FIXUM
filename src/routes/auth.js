const express = require('express')
const router = express.Router()

const authController = require('../auth/auth.controller')
const {verifyToken, isAdmin} = require('../middlewares/authJwt')

router.post('/login',authController.Auth.login)


module.exports = router 