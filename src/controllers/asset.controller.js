const config = require('../config/dbconfig')
const sql = require('mssql')
const asset = require('../models/Asset')
const bodyParser = require('body-parser')

const assetTypeController = require('../controllers/asset-type.controller')
const locationController = require('../controllers/location.controller')
const userController = require('../controllers/user.controller')
const auth = require('../middlewares/authJwt')



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
        res.render('./register/asset-register.ejs',{title: ' | Activos', location: await locationController.list(), assetType: await assetTypeController.list(),user: await userController.list(), navBar: await auth.navigationBar(req)})
    },
    list: async function(){
        return await asset.list()
    },
    detailList: async function(){
        try {
            return await asset.detailList()
        } catch (error) {
            console.log(error)
            
        }

    },
    post: async function (req,res) {
        let message=''
        try {
            if (validationAssetName(req, res) && validationQuantity(req, res) && validationPrice(req, res) && validationDescription(req, res)) {
                if (await asset.post(req, res)) {
                    message+="Activo Registrado correctamente"
                    res.render('./register/asset-register.ejs', { title: ' | Registro de Activos', message: message, location: await locationController.list(), assetType: await assetTypeController.list(), user: await userController.list() , navBar: await auth.navigationBar(req)})
                }
                else {
                    message+="Verifique que los valores ingresados sean correctos"
                    res.render('./register/asset-register.ejs', { title: ' | Registro de Activos', message: message, location: await locationController.list(), assetType: await assetTypeController.list(), user: await userController.list() , navBar: await auth.navigationBar(req)})
                   

                }
            }
            else {
                message+="Verifique que los valores ingresados sean correctos"
                res.render('./register/asset-register.ejs', { title: ' | Registro de Activos', message: message, location: await locationController.list(), assetType: await assetTypeController.list(), user: await userController.list() , navBar: await auth.navigationBar(req)})

            
            }

        } catch (error) {
            console.log(error);
            res.redirect('/error')
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

    get: async function (req, res) {
        try {
            return await asset.get(req, res)

        } catch (error) {
            console.log(error)
            res.redirect('/error')
        }
    },
    update: async function (req, res) {
        let message=''
        try {
            if(validationAssetName(req,res)&&validationQuantity(req,res)&&validationPrice(req,res)&&validationDescription(req,res)){
                const updated = await asset.update(req, res)
                if (updated) {
                    message+="Activo actualizado correctamente"
                    res.render('./register/asset-edit.ejs',{title: ' | Edit', asset: await asset.get(req,res),message: message,location: await locationController.list(), assetType: await assetTypeController.list(),user: await userController.list(), navBar: await auth.navigationBar(req)})    
                }
                else {
                    message+="Verifique que los valores ingresados sean correctos"
                    res.render('./register/asset-edit.ejs',{title: ' | Edit', asset: await asset.get(req,res),message: message,location: await locationController.list(), assetType: await assetTypeController.list(),user: await userController.list(), navBar: await auth.navigationBar(req)})    
                }
            }
            else{
                message+="Verifique que los valores ingresados sean correctos"
                res.render('./register/asset-edit.ejs',{title: ' | Edit', asset: await asset.get(req,res),message: message,location: await locationController.list(), assetType: await assetTypeController.list(),user: await userController.list(), navBar: await auth.navigationBar(req)})    
            }
        } catch (error) {
            console.log(error)
            res.redirect('/error')
        }
        
        
        
    },
    delete: async function (req,res){
        try {
            const deleted = await asset.delete(req, res)
            if (deleted) {
                res.redirect('/edit/Assets')
            } else {
                res.redirect('/edit/Assets')

            }
        } catch (error) {
            res.redirect('/error')

        }

         
    }
}