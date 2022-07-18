const express = require('express')
const router = express.Router()

const qrController = require('../controllers/qr-reader.controller')

router.post('/scan',qrController.readResult)


module.exports = router