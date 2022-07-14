import { DataTypes } from "sequelize";
import db from "../database/conection2";



const userPosition=db.define('UserPosition', {

    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey:true,
        autoIncrement:true
        
    },
    position: {
        type: DataTypes.STRING,
        allowNull:false
    }
    
    }
)

module.exports={
    list: async function () {

        const UsersPositionList=await userPosition.findAll()    
        return  UsersPositionList;
    },
    post: async function(req, res) {
        return true;
    

    },
   
    get: function(username) {
                
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

