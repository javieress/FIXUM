const config = require('../config/dbconfig')
const sql = require('mssql')
const user = require('../models/User')
const bodyParser = require('body-parser')
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
            res.render('./register/user-register.ejs', { title: ' | Usuarios', message: '', userPosition: await userPositionList.list() , navBar: await auth.navigationBar(req) })
        } catch (err) {
            console.log(err.message)
        }
    },
    list: async function () {
        return await user.list()
    },
    post: async function (req, res) {

        try {
            let message = "El usuario '"

            const { body } = req

            if (Fn.validaRut(req.body['new-user-rut']) && validationUserLenght(req, res) && validationName(req, res) && validationLastName(req, res) && validationPwd(req, res)) {

                const user_esta = await user.findOneRut(req, res) || await user.findOneUserName(req, res);

                if (user_esta != null) {
                    message += req.body['new-user-username'] + "'ya existe.";
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
                    console.log(newUser);
                    const createdUser = await user.post(newUser)

                    const token = jwt.sign({ _id: createdUser.dataValues.id_users }, 'adInfinitum123', { expiresIn: 86400 })
                    res.status(201).redirect('/edit/Users')
                    // user.post(req, res)//llamo a funcion post para que cree usuario
                    message += req.body['new-user-username'] + "' se guardó con éxito."

                }

            } else {
                message += "'Error en datos ingresados,intentelo nuevamente";

            }
            res.render('./register/user-register.ejs', { title: 'Registro Usuarios', message: message, userPosition: await userPositionList.list(), navBar: await auth.navigationBar(req) })

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
                    id = req.user._id
                }
                return await user.get(id)
            }
            return await user.get(id)
        } catch (error) {
            res.redirect('/error')

        }

    },
    update: async function (req, res) {
        try {
            if (validationUserLenght(req, res) && validationName(req, res) && validationLastName(req, res)) {
                const user_esta = await user.get(req.body['new-user-rut'])
                if (user_esta[0] == null) {
                    res.redirect('/register/user-edit/' + req.body['new-user-rut'])
                }
                else {
                    const updated =  user.update(req)

                    if (updated) {
                        res.redirect('/edit/Users')
                    }
                    else {
                        res.redirect('/register/user-edit/' + req.body['new-user-rut'])
                    }


                }
            }
            else {
                res.redirect('/register/user-edit/' + req.body['new-user-rut'])
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
    updatePassword:async function(req,res){

        if(validationPwd(req,res)){
            const salt = await bcrypt.genSalt()
            const hashed = await bcrypt.hash(req.body['new-user-password'], salt)
            req.body['new-user-password']=hashed


            const updatedPwd = await user.updatePassword(req,res)
            if (updatedPwd) {
                res.redirect('/edit/Users')
            }
            else {
                res.redirect('/register/user-edit/' + req.body['new-userpwd-id'])
            }


            

        }

      
    }

}