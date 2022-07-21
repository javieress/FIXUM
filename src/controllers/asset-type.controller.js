const config = require('../config/dbconfig')
const sql = require('mssql')
const assetType = require('../models/Asset-Type')
const bodyParser = require('body-parser')
const auth = require('../middlewares/authJwt')


function validationAssetType(req, res) {
    if (req.body['new-asset-type-name'].length <= 50 && req.body['new-asset-type-name'].length >= 0) {
        return true
    }
    return false
}

module.exports = {
    index: async function (req, res) {
        res.render('./register/asset-type-register.ejs', { title: ' | Registro de Tipo de Activos', message: '' , navBar: await auth.navigationBar(req)})
    },
    list: async function () {
        return await assetType.list()
    },
    post: async function (req, res) {
        try {
            let message = ''
            if (validationAssetType(req, res)) {
                if (assetType.post(req, res)) {
                    message += 'Tipo de Activo guardado con éxito'
                }
                else {
                    message += "Ocurrio un error"
                }
            } else {
                message += " maximo de caracteres superado"
            }
            res.render('./register/asset-type-register.ejs',{ title: ' | Registro de Tipo de Activos', message: message , navBar: await auth.navigationBar(req)})
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
        let message = ''
        try {
            if (validationAssetType(req, res)) {
                const updated = await assetType.update(req, res)
                if (updated) {
                    message = 'El Tipo de Activo se editó con éxito'
                    res.render('./register/asset-type-edit.ejs', { title: ' | Editar Tipo de Activos', assetType: await assetType.get(req,res), message: message , navBar: await auth.navigationBar(req)})
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
                    message = "Verifique que los valores ingresados sean correctos"
                    res.render('./register/asset-type-edit.ejs', { title: ' | Editar Tipo de Activos', assetType: assetTypeUpdated, message: message , navBar: await auth.navigationBar(req)})

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
                message = 'Texto ingresado supera el máximo de caracteres'
                res.render('./register/asset-type-edit.ejs', { title: ' | Editar Tipo de Activos', assetType: assetTypeUpdated, message: message , navBar: await auth.navigationBar(req)})
            }
        } catch (error) {
            console.log(error);
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