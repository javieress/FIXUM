const jwt = require('jsonwebtoken')
const User = require('../models/User')

// Verificación de token
const verifyToken = async (req, res, next) => {
    try {
        const token = req.session.token
        if (!token) return res.status(403).redirect('/')

        const decoded = jwt.verify(token, process.env.SECRET)
        req.userId = decoded._id

        const user = await User.get(req.userId)
        if (!user) return res.status(404).redirect('/')
        next()
        return

    } catch (error) {
        console.log(error);
    }
}

// Verificación de usuario administrador
const isAdmin = async (req, res, next) => {
    try {
        const user = await User.get(req.userId)
        if (user) {
            if (user[0].dataValues.typeUser == 1) {
                next()
                return
            }
        }
        return res.status(403).redirect('/')
    } catch (error) {
        console.log(error);
        return res.status(403).redirect('/')
    }
}

// Verificación de usuario registrado
const isUser = async (req, res, next) => {
    try {
        const user = await User.get(req.userId)
        if (user) {
            if (user[0].dataValues.typeUser == 0) {
                next()
                return
            }
        }
        return res.status(403).redirect('/')
    } catch (error) {
        console.log(error);
        return res.status(403).redirect('/')
    }

}

// Verificación de usuario registrado o usuario administrador
const isAdminOrUser = async (req, res, next) => {
    try {
        const user = await User.get(req.userId)
        if (user) {
            if ((user[0].dataValues.typeUser == 1) || (user[0].dataValues.typeUser == 0)) {
                next()
                return
            }
        }
        return res.status(403).redirect('/')
    } catch (error) {
        console.log(error);
        return res.status(403).redirect('/')
    }

}

// Elección de barra de navegación según tipo de usuario
const navigationBar = async (req, res, next) => {
    try {
        const token = req.session.token
        if (!token) return 'partials/navigationX'
        else {
            const decoded = jwt.verify(token, process.env.SECRET)
            req.userId = decoded._id
            const user = await User.get(req.userId)
            if (user) {
                if (user[0].dataValues.typeUser == 1) {
                    return 'partials/navigation1'
                }
                else if (user[0].dataValues.typeUser == 0) {
                    return 'partials/navigation0'
                }
            }
            else {
                return 'partials/navigationX'
            }
        }
    }
    catch (err) {
        console.log(err);
    }
    return 'partials/navigation0'

}

// Elección de vista de detalles de Activo según tipo de usuario
const details = async (req, res, next) => {
    try {
        const token = req.session.token
        if (!token) return 'asset-detailsview.ejs'
        else {
            const decoded = jwt.verify(token, process.env.SECRET)
            req.userId = decoded._id
        }
        const user = await User.get(req.userId)
        if ((user[0].dataValues.typeUser == 1) || (user[0].dataValues.typeUser == 0)) {
            return 'asset-details.ejs'
        }
    }
    catch (err) {
        console.log(err);
        return 'asset-detailsview.ejs'
    }

}

// Elección de vista principal según tipo de usuario
const mainView = async (req, res, next) => {
    try {
        const token = req.session.token
        if (!token) return 'homeUser.ejs'
        else {
            const decoded = jwt.verify(token, process.env.SECRET)
            req.userId = decoded._id
            const user = await User.get(req.userId)
            if ((user[0].dataValues.typeUser == 0)) {
                return 'homeRegisterUser.ejs'
            }
            else if ((user[0].dataValues.typeUser == 1)) {
                return 'homeAdmin.ejs'
            }
        }
    } catch (error) {
        console.log(error);
        return 'homeUser.ejs'
    }
}

module.exports = { verifyToken, isAdmin, isUser, navigationBar, isAdminOrUser, details, mainView }