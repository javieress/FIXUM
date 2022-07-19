const config = require('../config/dbconfig')
const sql = require('mssql')
const assetType = require('../models/Asset-Type')
const bodyParser = require('body-parser')


function validationAssetType(req,res){
    if(req.body['new-asset-type-name'].length<=50 &&req.body['new-asset-type-name'].length>=0){
        return true
    }
    return false
}

module.exports = {
    index: function (req, res) {
        res.render('./register/asset-type-register.ejs', { title: ' | Tipos de Activos', message: '' })
    },
    list: async function () {
        return await assetType.list()
    },
    post: function (req, res) {
        let message = "El tipo de activo '"
        if (assetType.post(req, res)) {
            message += req.body['new-asset-type-name'].toUpperCase() + "' se guardó con éxito."
        }
        else {
            message += req.body['new-asset-type-name'].toUpperCase() + "' ya existe."
        }
        res.render('./register/asset-type-register.ejs', { title: ' | Tipos de Activos', message: message })
    },
    TotalByAssetsTypes: async function(){
        return await assetType.TotalByAssetsTypes()
    },
    get: async function (req, res) {
        return await assetType.get(req, res)
    },
    update: async function (req, res) {

        if(validationAssetType(req,res)){
            const updated = await assetType.update(req, res)
            if (updated) {

                res.redirect('/edit/AssetTypes')
               
          
            }
            else {
                const assetTypeUpdated =
                    [
                        {
                            dataValues:
                            {
                                id: req.body['new-asset-type-id'],
                                assetType: ''
                            }
                        }]
                res.render('./register/asset-type-edit.ejs', { title: ' | Edit', assetType: assetTypeUpdated, message: 'ERROR NO SE PUDO MODIFICAR' })

            }
        }
        else{
            const assetTypeUpdated =[
                        {
                            dataValues:
                            {
                                id: req.body['new-asset-type-id'],
                                assetType: ''
                            }
                        }]
                res.render('./register/asset-type-edit.ejs', { title: ' | Edit', assetType: assetTypeUpdated, message: 'Texto ingresado supera el máximo de caracteres' })
        }
        
    },
    delete: async function (req,res){
        const deleted = await assetType.delete(req,res)
        if (deleted){
            res.redirect('/edit/AssetTypes')
        }else{
            res.redirect('/edit/AssetTypes')

        }
         
    },


}