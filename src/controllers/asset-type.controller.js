const config = require('../config/dbconfig')
const sql = require('mssql')
const assetType = require('../models/Asset-Type')
const bodyParser = require('body-parser')

module.exports={
    index:function(req,res){
        res.render('./register/asset-type-register.ejs',{title: ' | Tipos de Activos',message: ''})
    },
    list:function(){
        return assetType.list()
    },
    post:function (req,res) {
        let message = "El tipo de activo '"
        if(assetType.post(req,res)){
            message+= req.body['new-asset-type-name'].toUpperCase() + "' se guardó con éxito."
        }
        else{
            message+= req.body['new-asset-type-name'].toUpperCase() + "' ya existe."
        }
        res.render('./register/asset-type-register.ejs',{title: 'FIXUM',message: message})
    }
}