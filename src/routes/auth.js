const express = require('express')
const router = express.Router()

const authController = require('../auth/auth.controller')
const {verifyToken, isAdmin} = require('../middlewares/authJwt')

router.post('/login',authController.Auth.login)

router.post('/x',verifyToken, isAdmin)



module.exports = router 