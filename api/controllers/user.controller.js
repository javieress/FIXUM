// const Users = require('./User')

// const usuario1 = new Users()

// const User = {
//     get: async (req,res) => {
//         const {id} = req.params
//         const user = await Users.findOne({_id: id})
//         res.status(200).send(user)
//     },
//     list: async (req,res) => {
//         const users = await Users.find()
//         res.status(200).send(users)
//     },
//     create: async (req,res) => {
//         const user = new Users(req.body)
//         const savedUser = await user.save()
//         res.status(201).send(savedUser._id)
//     },
//     update: async (req,res) => {
//         const {id} = req.params
//         const user = await Users.findOne({_id: id})
//         Object.assign(user,req.body)
//         user.save()
//         res.sendStatus(204)
//     },
//     delete: async (req,res) => {
//         const {id} = req.params
//         const user = await Users.findOne({_id: id})
//         if (user){
//             user.remove()
//         }
//         res.sendStatus(204)
//     },
// }
// module.exports = User

const config = require('../dbconfig')
const sql = require('mssql')
const { use } = require('bcrypt/promises')


const User = {
    list: async () =>{
        try{
            const pool = await sql.connect(config)
            const users = await pool.request().query("SELECT * from Users")
            return (await users).recordsets
        }
        catch(e){
            console.log(error)
        }    
    },
    get: async (name) =>{
        try{
            const pool = await sql.connect(config)
            const user = await pool.request()
            .input('input_parameter',sql.NVarChar,name)
            .query("SELECT * from Users where userNombre = @input_parameter")
            return (await place).recordsets
        }
        catch(e){
            console.log(error)
        }    
    },
    post: async(userName, name, lastName, password, position, userType) =>{
        try{
            const pool = await sql.connect(config)
            const insert = await pool.request()
            .input('usuario',sql.NVarChar,userName)
            .input('nombre',sql.NVarChar,name)
            .input('apellido',sql.NVarChar,lastName)
            .input('contrasena',sql.NVarChar,password)
            .input('cargo',sql.NVarChar,position)
            .input('tipoUsuario',sql.NVarChar,userType)
            .query("INSERT INTO Users (usuario,nombre,apellido,contrasena,cargo,tipoUsuario) VALUES (@nombre,@nombre,@apellido,@contrasena,@cargo,@tipoUsuario)")
            return  insert.recordsets;
        }
        catch (err) {
            console.log(err);
          }
    },
    delete: async (name) =>{
        try{
            const pool = await sql.connect(config)
            const user = await pool.request()
            .input('input_parameter',sql.NVarChar,name)
            .query("DELETE FROM Users WHERE nombre = @input_parameter")            
            return (await user).recordsets
        }
        catch(e){
            console.log(error)
        }    
    },
}


module.exports = Location