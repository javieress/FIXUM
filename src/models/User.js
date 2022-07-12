import { DataTypes } from "sequelize";
import db from "../database/conection2";


const bcrypt = require('bcrypt');
const saltRounds = 10;


const users=db.define('Usuario', {

    id_usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey:true
    },
    passwordd: {
        type: DataTypes.STRING,
        allowNull:false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull:false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull:false
    },
    cargo: {
        type: DataTypes.STRING,
        allowNull:false
    },
    tipo: {
        type: DataTypes.INTEGER,
        allowNull:false
    },

    }
)




module.exports = {
    list: function () {
        return userList
    },
    post: async function(req, res) {
        let username = req.body['new-user-username']  // poner que sea el rut

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
        }else{
            if(userType=='user'){
                tipo_user=2;
            }
        }

        /** encripto contraseña */
        const password1= await bcrypt.hash(password, saltRounds);
         


        /** inserto datos usando el modelo users  */
        try {
            await users.create(
                {   id_usuario : username, 
                    passwordd: password1,
                    nombre:name,
                    apellido:lastName,
                    cargo:position,
                    tipo:tipo_user
                }
            );
            
        } catch (error) {
            console.log(error.message);
            
        }
        
        
        return true;
    


       
     


    },
    findOne:async function (req,res) {
        const user_Creado= await users.findOne({ where: { id_usuario:req.body['new-user-username']}});
        return user_Creado;
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