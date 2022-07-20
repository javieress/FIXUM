const config = require('../config/dbconfig')
const sql = require('mssql')
const assetType = require('../models/Asset-Type')
const bodyParser = require('body-parser')


function validationAssetType(req, res) {
    if (req.body['new-asset-type-name'].length <= 50 && req.body['new-asset-type-name'].length >= 0) {
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
        try {
            let message = ""
            if (validationAssetType(req, res)) {
                if (assetType.post(req, res)) {
                    message += req.body['new-asset-type-name'].toUpperCase() + "' se guardó con éxito."
                }
                else {
                    message += "Ocurrio un error"
                }
            } else {
                message += " maximo de caracteres superado"
            }
            res.render('./register/asset-type-register.ejs', { title: ' | Tipos de Activos', message: message })
        } catch (error) {
            res.redirect('/error')

        }

    },
    TotalByAssetsTypes: async function () {
        return await assetType.TotalByAssetsTypes()
    },
    get: async function (req, res) {
        try {
            return await assetType.get(req, res)
        }
        catch (error) {
            res.redirect('/error')
        }

    },
    update: async function (req, res) {

        try {
            if (validationAssetType(req, res)) {
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
            else {
                const assetTypeUpdated = [
                    {
                        dataValues:
                        {
                            id: req.body['new-asset-type-id'],
                            assetType: ''
                        }
                    }]
                res.render('./register/asset-type-edit.ejs', { title: ' | Edit', assetType: assetTypeUpdated, message: 'Texto ingresado supera el máximo de caracteres' })
            }
        } catch (error) {
            res.redirect('/error')
        }


    },
    delete: async function (req, res) {
        try {
            const deleted = await assetType.delete(req, res)
            if (deleted) {
                res.redirect('/edit/AssetTypes')
            } else {
                res.redirect('/edit/AssetTypes')

            }
        } catch (error) {
            res.redirect('/error')

        }


    },


}