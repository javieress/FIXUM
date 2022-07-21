const express = require('express')
const bcrypt = require('bcrypt')
const { expressjwt: expressJwt } = require("express-jwt");
const jwt = require('jsonwebtoken')
const userController = require('../controllers/user.controller')
const User = require('../models/User')

const auth = require('../middlewares/authJwt')

const db = require("../database/conection2")


const signToken = _id => jwt.sign({_id} ,process.env.SECRET,{expiresIn:86400})


const validateJwt = expressJwt({ secret: process.env.SECRET, algorithms: ['HS256']})

const findAndAssignUser = async (req,res,next) => {
    try {
        console.log(req)
        const user = await User.get(req)
        if (!user[0]){
            return res.status(401).end()
        }
        req.user = user[0]
        next()
    }catch(err){
        next(err)
    }
}

const isAuthenticated = express.Router().use(validateJwt,findAndAssignUser)


const Auth = {
    login: async (req,res,next) => {
        // console.log(req.body)
        const body = req.body
        try {
            const user = await User.get(body.id)
            // console.log(user)
            if (!user[0]) {                
                // res.status(401).send('Usuario no encontrado')
                res.status(401).render('login.ejs',{title: ' | Login',message: 'Usuario no encontrado', navBar: await auth.navigationBar(req)})
            }else{
                const isMatch = await bcrypt.compare(body['password'], user[0].dataValues.pwd)

                if(isMatch) {
                    // const signed = jwt.sign({ _id: user[0].dataValues.id_users }, process.env.SECRET)
                    const token = signToken(user[0].dataValues.id_users)
                    req.session.token = token
                    // res.status(200).send({token : token})
                    next()
                    res.status(200).redirect('/')
                }else{
                    res.status(401).render('login.ejs',{title: ' | Login',message: 'Contraseña inválida', navBar: await auth.navigationBar(req)})
                }
            }
        }catch(e){
            res.send(e.message)
        }
    },
    logout: async(req,res,next) => {
        try {
            await req.session.destroy()
            res.redirect('/')
        } catch (error) {
            console.log(error);
        }
       
    }
}

module.exports = {Auth, isAuthenticated}