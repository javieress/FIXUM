const config = require('../config/dbconfig')
const sql = require('mssql')
const asset = require('../models/Asset')
const bodyParser = require('body-parser')

const assetTypeController = require('../controllers/asset-type.controller')
const locationController = require('../controllers/location.controller')
const userController = require('../controllers/user.controller')



function validationAssetName(req,res){

    if(req.body['new-asset-name'].length<=50 && req.body['new-asset-name'].length>=1){
        return true;
    }
    return false;
}
function validationQuantity(req,res){

    if(req.body['new-asset-quantity']<=999999999 && req.body['new-asset-quantity']>=0){
        return true;
    }
    return false;
}
function validationPrice(req,res){

    if(req.body['new-asset-price']<=999999999 && req.body['new-asset-price'].length>=0){
        return true;
    }
    return false;
}
function validationDescription(req,res){

    if(req.body['new-asset-description'].length<=255){
        return true;
    }
    return false;
}



module.exports={
    index: async function(req,res){
        res.render('./register/asset-register.ejs',{title: ' | Registro de Activo', location: await locationController.list(), assetType: await assetTypeController.list(),user: await userController.list()})
    },
    list: async function(){
        return await asset.list()
    },
    post: async function (req,res) {
        //let message=''
        if(validationAssetName(req,res)&&validationQuantity(req,res)&&validationPrice(req,res)&&validationDescription(req,res)){
            if(asset.post(req,res)){
               //message+="Activo Registrado correctamente"
            res.render('./register/asset-register.ejs',{title: ' | Registro de Activo',message: message, location: locationController.list(), assetType: assetTypeController.list(),user: userController.list()})

               

            }
            else{
               // message+="Ocurrio un error al registrar activo"
               res.redirect('/')
                
            }
        }
        else{
            //message+="Verifique la cantidad de caracteres ingresados en cada seccion"
            res.redirect('/')
        }

    

    },
    last10Added: async function (){
        return await asset.last10Added()
    },
    AssetsPrices: async function(){
        return await asset.AssetsPrices()
    },
    TotalAssetsByLocation: async function(){
        return await asset.TotalAssetsByLocation()
    },

    get: async function(req,res){
        return await asset.get(req,res)
    },
    update: async function (req, res) {

        if(validationAssetName(req,res)&&validationQuantity(req,res)&&validationPrice(req,res)&&validationDescription(req,res)){
            const updated = await asset.update(req, res)
            if (updated) {
                res.redirect('/edit/Assets')
            }
            else {
                res.redirect('/register/asset-edit/'+req.body['new-asset-id'])

            }
        }
        else{
            res.redirect('/register/asset-edit/'+req.body['new-asset-id'])
        }
        
        
    },
    delete: async function (req,res){
        const deleted = await asset.delete(req,res)
        if (deleted){
            res.redirect('/edit/Assets')
        }else{
            res.redirect('/edit/Assets')

        }
         
    }
}