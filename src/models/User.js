import { DataTypes } from "sequelize";
import db from "../database/conection2";





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
   
    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false
    }
)




module.exports = {
    list: async function () {

        const userList=await users.findAll({attributes:['UserName','nameUser','last_name']})    
        return  userList
    },
    post: async function(req, res) {
        let username = req.body['new-user-username']  
        let rut=req.body['new-user-rut']

        let name = req.body['new-user-name'].toLowerCase()
        name = name.charAt(0).toUpperCase() + name.slice(1)

        let lastName = req.body['new-user-lastName'].toLowerCase()
        lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1)

        let position = req.body['new-user-position']

        let userType = req.body['new-user-userType']

        let password = req.body['new-user-password']


        /** modifico tipo usuario para ingreso a base de datos */
        let tipo_user=0;
        if(userType=='admin'){
            tipo_user=1;
        }
        

        /** encripto contraseña */
        const password1= await bcrypt.hash(password, saltRounds);
         


        /** inserto datos usando el modelo users  */
        try {
            await users.create(
                {   id_users : rut, 
                    UserName:username,
                    pwd: password1,
                    nameUser:name,
                    last_name:lastName,
                    id_position:position,
                    typeUser:tipo_user
                }
            );
            
        } catch (error) {
            console.log(error.message);
            
        }
        
        
        return true;
    


       
     


    },
    findOneRut:async function (req,res) {
        const user_Creado= await users.findOne({ where: { id_users:req.body['new-user-rut']}});
        return user_Creado;
    },
    findOneUserName:async function (req,res) {
        const userss= await users.findOne({ where: { UserName:req.body['new-user-username']}});
        return userss;
    },
    get: function(username) {
        const userList = user.list()
        for (let i = 0; i < userList.length; i++) {
            if (userList[i].username == username) {
                return userList[i]
            }           
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