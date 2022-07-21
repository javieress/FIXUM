const user = require('../models/User')
const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')

const auth = require('../middlewares/authJwt')

const userPositionList = require('./userPosition.controller')

const Fn = {
    // Valida el rut con su cadena completa "XXXXXXXX-X"
    validaRut: function (rutCompleto) {
        if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
            return false;
        let tmp = rutCompleto.split('-');
        let digv = tmp[1];
        let rut = tmp[0];
        if (digv == 'K') digv = 'k';
        return (Fn.dv(rut) == digv);
    },
    dv: function (T) {
        let M = 0, S = 1;
        for (; T; T = Math.floor(T / 10))
            S = (S + T % 10 * (9 - M++ % 6)) % 11;
        return S ? S - 1 : 'k';
    }
}

function validationUserLenght(req, res) {

    if (req.body['new-user-username'].length <= 50 && req.body['new-user-username'].length >= 1) {
        return true;
    }
    return false;
}
function validationName(req, res) {

    if (req.body['new-user-name'].length <= 20 && req.body['new-user-name'].length >= 1) {
        return true;
    }
    return false;
}
function validationLastName(req, res) {

    if (req.body['new-user-lastName'].length <= 20 && req.body['new-user-lastName'].length >= 1) {
        return true;
    }
    return false;
}
function validationPwd(req, res) {

    if (req.body['new-user-password'].length >= 0 && req.body['new-user-password'].length <= 12) {
        return true;
    }
    return false;
}

module.exports = {
    index: async function (req, res) {
        try {
            res.render('./register/user-register.ejs', { title: ' | Registro de Usuario', message: '', userPosition: await userPositionList.list(), navBar: await auth.navigationBar(req) })
        } catch (err) {
            console.log(err.message)
        }
    },
    list: async function () {
        return await user.list()
    },
    post: async function (req, res) {

        try {
            let message = ''

            const { body } = req

            if (Fn.validaRut(req.body['new-user-rut']) && validationUserLenght(req, res) && validationName(req, res) && validationLastName(req, res) && validationPwd(req, res)) {

                const sameRut = await user.findOneRut(req, res)
                const sameUsername = await user.findOneUserName(req, res);

                if (sameUsername != null) {
                    message += req.body['new-user-username'] + " ya existe.";
                }
                else if (sameRut != null) {
                    message += req.body['new-user-rut'] + " ya existe.";
                }
                else {
                    const salt = await bcrypt.genSalt()
                    const hashed = await bcrypt.hash(body['new-user-password'], salt)

                    let rut = req.body['new-user-rut']
                    let userName = req.body['new-user-username']
                    let name = req.body['new-user-name'].toLowerCase()
                    name = name.charAt(0).toUpperCase() + name.slice(1)
                    let lastName = req.body['new-user-lastName'].toLowerCase()
                    lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1)
                    let position = req.body['new-user-position']
                    let userType = req.body['new-user-userType']
                    let email = req.body['new-user-email']

                    const newUser = {
                        rut: rut,
                        userName: userName,
                        name: name,
                        lastName: lastName,
                        position: position,
                        userType: userType,
                        password: hashed,
                        email: email,
                        salt, salt,
                    }
                    const createdUser = await user.post(newUser)

                    const token = jwt.sign({ _id: createdUser.dataValues.id_users }, 'adInfinitum123', { expiresIn: 86400 })
                    // res.status(201).redirect('/edit/Users')
                    // user.post(req, res)//llamo a funcion post para que cree usuario
                    message += 'El usuario se creó con éxito'

                }

            } else {
                message += 'Verifique que los valores ingresados sean correctos';

            }
            res.render('./register/user-register.ejs', { title: ' | Registro de Usuario', message: message, userPosition: await userPositionList.list(), navBar: await auth.navigationBar(req) })

        } catch (error) {
            console.log(error)
            res.redirect('/error')

        }



    },
    get: async function (req, res) {
        try {
            let { id } = req.params
            if (!id) {
                id = req.query['id']
                if (!id) {
                    id = req.userId
                    if (!id) {
                        id = req.user._id
                    }
                }
            }
            return await user.get(id)
        } catch (error) {
            console.log(error)
            res.redirect('/error')
        }

    },
    update: async function (req, res) {
        try {
            if (validationUserLenght(req, res) && validationName(req, res) && validationLastName(req, res)) {

                const user_esta = await user.get(req.body['new-user-rut'])
                const sameName = await user.findOneUserName(req, res)

                if (user_esta[0] == null) {
                    res.redirect('/register/user-edit/' + req.body['new-user-rut'])
                }
                else if (user_esta[0].dataValues.UserName == req.body['new-user-username']) {

                    const updated = await user.update(req)

                    if (updated) {
                        res.render('./register/user-edit.ejs', { title: ' | Editar Usuario', user: await user.get(req.body['new-user-rut']), message: 'Usuario editado con éxito', userPosition: await userPositionList.list(), navBar: await auth.navigationBar(req) })
                    }
                    else {

                        res.render('./register/user-edit.ejs', { title: ' | Editar Usuario', user: await user.get(req.body['new-user-rut']), message: "Verifique que los valores ingresados sean correctos", userPosition: await userPositionList.list(), navBar: await auth.navigationBar(req) })
                    }
                }
                else if (sameName) {
                    res.render('./register/user-edit.ejs', { title: ' | Editar Usuario', user: await user.get(req.body['new-user-rut']), message: "El nombre de usuario ya existe", userPosition: await userPositionList.list(), navBar: await auth.navigationBar(req) })
                } else {
                    const updated = await user.update(req)
                    if (updated) {
                        res.render('./register/user-edit.ejs', { title: ' | Editar Usuario', user: await user.get(req.body['new-user-rut']), message: 'Usuario editado con éxito', userPosition: await userPositionList.list(), navBar: await auth.navigationBar(req) })
                    }
                    else {
                        // res.redirect('/register/user-edit/' + req.body['new-user-rut'])
                        res.render('./register/user-edit.ejs', { title: ' | Editar Usuario', user: await user.get(req.body['new-user-rut']), message: "Verifique que los valores ingresados sean correctos", userPosition: await userPositionList.list(), navBar: await auth.navigationBar(req) })
                    }
                }
            }
            else {
                res.render('./register/user-edit.ejs', { title: ' | Editar Usuario', user: await user.get(req.body['new-user-rut']), message: "Verifique que los valores ingresados sean correctos", userPosition: await userPositionList.list(), navBar: await auth.navigationBar(req) })
            }


        } catch (error) {
            console.log(error)
            res.redirect('/error')

        }


    },
    delete: async function (req, res) {
        try {
            const deleted = await user.delete(req, res)
            if (deleted) {
                res.redirect('/edit/Users')
            } else {
                res.redirect('/edit/Users')

            }
        } catch (error) {
            console.log(error)
            res.redirect('/error')

        }


    },
    updatePassword: async function (req, res) {
        let message = ''
        if (validationPwd(req, res)) {
            const salt = await bcrypt.genSalt()
            const hashed = await bcrypt.hash(req.body['new-user-password'], salt)
            req.body['new-user-password'] = hashed


            const updatedPwd = await user.updatePassword(req, res)
            if (updatedPwd) {
                message = 'Se cambió la contraseña con éxito'
                res.render('./register/password-edit.ejs', { title: ' | Editar Contraseña de Usuario', user: await user.get(req.body['new-userpwd-id']), message: message, navBar: await auth.navigationBar(req) })
            }
            else {
                message = 'Error con la contraseña'
                res.render('./register/password-edit.ejs', { title: ' | Editar Contraseña de Usuario', user: await user.get(req.body['new-userpwd-id']), message: message, navBar: await auth.navigationBar(req) })
            }




        }
    },
    getUserWithPosition: async function (req, res) {

        try {
            let { id } = req.params
            if (!id) {
                id = req.query['id']
                if (!id) {
                    id = req.userId
                    if (!id) {
                        id = req.user._id
                    }
                }
            }
            return await user.getUserWithPosition(id)
        } catch (error) {
            console.log(error)
            res.redirect('/error')
        }

    }


}