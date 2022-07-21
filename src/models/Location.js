// import { DataTypes } from "sequelize";
// import db from "../database/conection2";

const {DataTypes} = require('sequelize');
const db = require('../database/conection2')

const locations=db.define('Location', {     // el modelo asume que la tabla de la base de datos esta en pluran(termina en s)
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    locations: {
        type: DataTypes.STRING,
        allowNull: false,
       
    },

    }
)

module.exports = {

    modelsLocations:function(){
        return locations;
    },
    list: async function(){
        const ubicationList = await locations.findAll()
    return ubicationList;
        


    },
    post: async function(req,res){
        let locationName = req.body['new-location-name'].toLowerCase()
        locationName = locationName.charAt(0).toUpperCase() + locationName.slice(1)

        try {
            await locations.create(

                {
                    locations : locationName,  
                }
            );
            
        } catch (error) {
            console.log(error.message);
            
        }

        
        return true;
    },
    update: async function(req,res){

        try{
            await locations.update({ locations: req.body['new-location-name'] }, {
                where: {
                  id: req.body['new-location-id']
                }
              })

            return true
        }catch(err){
            console.log(err)
            return false
        }
    },
    delete: async function(req,res){
        let {id} = req.params
       
        try {
            await locations.destroy({
                where: {
                  id: id
                }
              });
              return true
        } catch (error) {
           console.log(error)
           return false
        }
       
    },
    get: async function(req,res){
        let {id} = req.params
        if(!id){
            id = req.body['new-location-id']
        }
        const locationFound = await locations.findAll({
            where: {
                id: id
            }
        })
        return locationFound
    }
}