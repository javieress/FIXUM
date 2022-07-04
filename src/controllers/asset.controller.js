const config = require('../config/dbconfig')
const sql = require('mssql')
const asset = require('../models/Asset')
const bodyParser = require('body-parser')

const assetTypeController = require('../controllers/asset-type.controller')
const locationController = require('../controllers/location.controller')
const userController = require('../controllers/user.controller')


module.exports={
    index:function(req,res){
        res.render('./register/asset-register.ejs',{title: ' | Registro de Activo', location: locationController.list(), assetType: assetTypeController.list(),user: userController.list()})
    },
    list:function(){
        return asset.list()
    },
    post:function (req,res) {
        let message = "El tipo de activo '"
        if(asset.post(req,res)){
            message+= req.body['new-asset-name'].toUpperCase() + "' se guardó con éxito."
        }
        else{
            message+= req.body['new-asset-name'].toUpperCase() + "' ya existe."
        }
        res.render('./register/asset-register.ejs',{title: ' | Registro de Activo', location: locationController.list(), assetType: assetTypeController.list(),user: userController.list()})
    },
    last10Added: function (){
        return asset.last10Added()
    }
}