const config = require('../config/dbconfig')
const sql = require('mssql')
const userPosition = require('../models/UserPosition')
const bodyParser = require('body-parser');
const UserPosition = require('../models/UserPosition');

const auth = require('../middlewares/authJwt')

function validationUserPositionLenght(req, res) {

    if (req.body['new-user-position'].length <= 50 && req.body['new-user-position'].length >= 1) {
        return true;
    }
    return false;
}
module.exports = {
    index: async function (req, res) {
        res.render('./register/UserPosition-register.ejs', { title: ' | Registro de Cargo', message: '', navBar: await auth.navigationBar(req) })
    },
    list: async function () {
        return await userPosition.list()
    },
    post: async function (req, res) {
        let message = ""
        if (validationUserPositionLenght(req, res)) {
            if (userPosition.post(req, res)) {
                message += 'Cargo guardado con éxito'
            }
            else {
                message += 'Ocurrio un error'
            }

        } else {
            message += "Verifique que los valores ingresados sean correctos"
        }
        res.render('./register/userPosition-register.ejs', { title: ' | Registro de Cargo', message: message, navBar: await auth.navigationBar(req) })
    },
    update: async function (req, res) {
        let message = ''
        if (validationUserPositionLenght(req, res)) {
            const updated = await userPosition.update(req, res)
            if (updated) {
                message = 'El cargo se actualizó con éxito'
                res.render('./register/userPosition-edit.ejs', { title: ' | Editar Cargo', userPosition: await userPosition.get(req, res), message: message, navBar: await auth.navigationBar(req) })
            }
            else {
                const positionUpdated =
                    [
                        {
                            dataValues:
                            {
                                id: req.body['new-user-position-id'],
                                position: ''
                            }
                        }]
                message = "Verifique que los valores ingresados sean correctos"
                res.render('./register/userPosition-edit.ejs', { title: ' | Editar Cargo', userPosition: positionUpdated, message: message, navBar: await auth.navigationBar(req) })

            }
        }
        else {
            const positionUpdated =
                [
                    {
                        dataValues:
                        {
                            id: req.body['new-user-position-id'],
                            position: ''
                        }
                    }]
            message = "Verifique que los valores ingresados sean correctos"
            res.render('./register/userPosition-edit.ejs', { title: ' | Editar Cargo', userPosition: positionUpdated, message: message, navBar: await auth.navigationBar(req) })

        }

    },
    delete: async function (req, res) {
        const deleted = await userPosition.delete(req, res)
        if (deleted) {
            res.redirect('/edit/UserPosition')
        } else {
            res.redirect('/edit/UserPosition')

        }

    },
    get: async function (req, res) {
        return await UserPosition.get(req, res)
    }
}