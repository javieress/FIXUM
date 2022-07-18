const config = require('../config/dbconfig')
const sql = require('mssql')
const asset = require('../models/Asset')
const bodyParser = require('body-parser')

const assetTypeController = require('../controllers/asset-type.controller')
const locationController = require('../controllers/location.controller')
const userController = require('../controllers/user.controller')


module.exports={
    index: async function(req,res){
        res.render('./register/asset-register.ejs',{title: ' | Registro de Activo', location: await locationController.list(), assetType: await assetTypeController.list(),user: await userController.list()})
    },
    list: async function(){
        return await asset.list()
    },
    post: async function (req,res) {
        let message = "El tipo de activo '"
        if(asset.post(req,res)){
            message+= req.body['new-asset-name'].toUpperCase() + "' se guardó con éxito."
        }
        else{
            message+= req.body['new-asset-name'].toUpperCase() + "' ya existe."
        }
        res.render('./register/asset-register.ejs',{title: ' | Registro de Activo', location: locationController.list(), assetType: assetTypeController.list(),user: userController.list()})
    },
    last10Added: async function (){
        return await asset.last10Added()
    },
    get: async function(req,res){
        return await asset.get(req,res)
    },
    update: async function (req, res) {
        const updated = await asset.update(req, res)
        if (updated) {
            // const locationUpdated =
            //     [
            //         {
            //             dataValues:
            //             {
            //                 id: req.body['new-location-id'],
            //                 locations: ''
            //             }
            //         }]
            // res.render('./register/location-edit.ejs', { title: ' | Edit', location: locationUpdated, message: 'Editado con éxito' })
            res.redirect('/details/'+req.body['new-asset-id'])
        }
        else {
            // const locationUpdated =
            //     [
            //         {
            //             dataValues:
            //             {
            //                 id: req.body['new-location-id'],
            //                 locations: ''
            //             }
            //         }]
            // res.render('./register/location-edit.ejs', { title: ' | Edit', location: locationUpdated, message: 'No se puedo editar' })
            res.redirect('/')

        }
        
    },
    delete: async function (req,res){
        console.log('yyyyyy');
        const deleted = await asset.delete(req,res)
        if (deleted){
            res.redirect('/')
        }else{
            res.redirect('/')

        }
         
    }
}