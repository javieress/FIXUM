// import { DataTypes } from "sequelize";
// import db from "../database/conection2";

const {DataTypes} = require('sequelize');
const db = require("../database/conection2")

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
        let position=req.body['new-user-position']
        

        try {
            await userPosition.create(

                {
                    position : position  
                    
                }
            );
            
        } catch (error) {
            console.log(error.message);
            
        }

        return true;


    },
   
    get:async function(req,res) {
        const {id} = req.params
        const UserPositionFound = await userPosition.findAll({
            where: {
                id: id
            }
        })
        
        return UserPositionFound
                
    },
    update: async function (req, res) {

        try{
            await userPosition.update({ position: req.body['new-user-position'] }, {
                where: {
                  id: req.body['new-user-position-id']
                }
              })

            return true
        }catch(err){
            console.log(err)
            return false
        }

    },
    delete: async function (req, res) {

        const {id} = req.params
        try {
            await userPosition.destroy({
                where: {
                  id: id
                }
              });
              return true
        } catch (error) {
           console.log(error)
           return false
        }
      
    }
    
}

