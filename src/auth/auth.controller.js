const express = require('express')
const bcrypt = require('bcrypt')
const { expressjwt: expressJwt } = require("express-jwt");
const jwt = require('jsonwebtoken')
const User = require('../models/user.model.js')

const validateJwt = expressJwt({secret: process.env.SECRET, algorithms: ['HS256']})

const signToken = _id => jwt.sign({_id} ,process.env.SECRET)

const findAndAssingUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.auth._id)
        if(!user){
            return res.status(401).end()
        }
        req.auth = user
    }catch(e){
        next(e)
    }
}

const isAuthenticated = express.Router().use(validateJwt,findAndAssingUser)

const Auth = {
    login: async (req,res) => {
        const {body} = req
        try {
            const user = await User.findOne({email: body.email})
            if(!user){
                res.status(401).send('Usuario y/o constraseña inválida')
            }else{
                const isMatch = await bcrypt.compare(body.password,user.password)
                if(isMatch) {
                    const signed = signToken(user._id)
                    res.status(200).send(signed)
                }else{
                    res.status(401).send('Usuario y/o constraseña inválida')
                }
            }
        }catch(e){
            res.send(e.message)
        }
    },
    register: async (req,res) => {
        const {body} = req
        try{
            const isUser = await User.findOne({email: body.email})
            if(isUser){
                res.status(401).send('Usuario ya existe')
            }else{
                const salt = await bcrypt.genSalt()
                const hashed = await bcrypt.hash(body.password, salt)
                const user = await User.create({email: body.email, password: hashed, salt})

                const signed = signToken(user._id)
                res.status(201).send(signed)
            }
        }
        catch (e){
            res.status(500).send(e.message)
        }
    },
}

module.exports = {Auth, isAuthenticated}