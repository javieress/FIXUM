const express = require('express')
const router = express.Router()

router.get('/',(req,res,next) => {
    res.render('index.ejs',{title: 'FIXUM'})
})
router.get('/QR_Reader',(req,res,next) => {
    res.render('prueba_LectorQR.ejs',{title: 'Lector QR'})
})

module.exports = router