// import { DataTypes } from 'sequelize';
// import db from "../database/conection2";

const { DataTypes } = require('sequelize');
const db = require("../database/conection2")

const bcrypt = require('bcrypt');
const saltRounds = 10;


const users = db.define('User', {

    id_users: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    pwd: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nameUser: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_position: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    typeUser: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    UserName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },

},
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false
    }
)




module.exports = {
    list: async function () {

        const userList = await users.findAll({ attributes: ['id_users', 'UserName', 'nameUser', 'last_name', 'typeUser', 'id_position'] })
        return userList
    },
    post: async function (req, res) {

        let rut = req.body['new-user-rut']
        let username = req.body['new-user-username']
        let name = req.body['new-user-name'].toLowerCase()
        name = name.charAt(0).toUpperCase() + name.slice(1)
        let lastName = req.body['new-user-lastName'].toLowerCase()
        lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1)
        let position = req.body['new-user-position']
        let userType = req.body['new-user-userType']
        let password = req.body['new-user-password']
        let email = req.body['new-user-email']


        /** encripto contraseña */
        const password1 = await bcrypt.hash(password, saltRounds);
        /** inserto datos usando el modelo users  */
        try {
            await users.create(
                {
                    id_users: rut,
                    UserName: username,
                    pwd: password1,
                    nameUser: name,
                    last_name: lastName,
                    id_position: position,
                    typeUser: userType,
                    email: email,
                }
            );

        } catch (error) {
            console.log(error.message);

        }
        return true;

    },
    findOneRut: async function (req, res) {
        const user_Creado = await users.findOne({ where: { id_users: req.body['new-user-rut'] } });
        return user_Creado;
    },
    findOneUserName: async function (req, res) {
        const userss = await users.findOne({ where: { UserName: req.body['new-user-username'] } });
        return userss;
    },
    get: async function (req, res) {
        const { id } = req.params
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
    },
    delete: async function (req, res) {
        const {id} = req.params
        try {
            await users.destroy({
                where: {
                  id_users: id
                }
              });
              return true
        } catch (error) {
           console.log(error)
           return false
        }
        
    }
        
    
}