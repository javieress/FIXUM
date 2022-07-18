// import { DataTypes } from 'sequelize';
// import db from "../database/conection2";

const {DataTypes} = require('sequelize');
const db = require("../database/conection2")

const bcrypt = require('bcrypt');
const saltRounds = 10;


const users=db.define('User', {
    
    id_users: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey:true
    },
    pwd: {
        type: DataTypes.STRING,
        allowNull:false
    },
    nameUser: {
        type: DataTypes.STRING,
        allowNull:false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull:false
    },
    id_position: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    typeUser: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    UserName: {
        type: DataTypes.STRING,
        allowNull:false
    },
    salt: {
        type: DataTypes.STRING,
        allowNull: false
    }
}
)




module.exports = {
    list: async function () {

        const userList = await users.findAll({ attributes: ['id_users', 'UserName', 'nameUser', 'last_name', 'typeUser', 'id_position', 'email'] })

        return userList
    },
    post: async function (newUser) {

        try {
            return await users.create(
                {
                    id_users: newUser.rut,
                    UserName: newUser.userName,
                    pwd: newUser.password,
                    nameUser: newUser.name,
                    last_name: newUser.lastName,
                    id_position: newUser.position,
                    typeUser: newUser.userType,
                    email: newUser.email,
                    salt: newUser.salt,
                }
            );
            
        } catch (error) {
            console.log(error.message);
        }



    },
    findOneRut:async function (req,res) {
        const user_Creado= await users.findOne({ where: { id_users:req.body['new-user-rut']}});
        return user_Creado;
    },
    findOneUserName:async function (req,res) {
        const userss= await users.findOne({ where: { UserName:req.body['new-user-username']}});
        return userss;
    },
    get: async function (id) {
        const userFound = await users.findAll({
            where: {
                id_users: id
            }
        })

        return userFound
    },
    update: async function (req, res) {
        console.log('poto');
        console.log(req.body);
        try {
            await users.update({
                nameUser: req.body['new-user-name'],
                last_name: req.body['new-user-lastName'],
                typeUser: req.body['new-user-userType'],
                id_position: req.body['new-user-position'],
                UserName: req.body['new-user-username'],
                email: req.body['new-user-email'],
            },
                {
                    where: {
                        id_users: req.body['new-user-rut']
                    }
                })
            return true
        } catch (err) {
            console.log(err)
            return false
        }
        return null
    },
    update: function (req, res) {

    },
    delete: function (req, res) {
        // const name = req.body['user-name']
        // const exist = userList.includes(name)
        // if(exist){
        //     userList = userList.filter((item) =>item !== name)
        // }
        // return exist
    }
}