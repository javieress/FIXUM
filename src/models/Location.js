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
    inCharge: {
        type: DataTypes.STRING,
        allowNull:true,
    },

    }
)

module.exports = {

    modelsLocations:function(){
        return locations;
    },
    list: async function(){
        const ubi = await locations.findAll()
    return ubi;
        


    },
    post: async function(req,res){
        let locationName = req.body['new-location-name'].toLowerCase()
        locationName = locationName.charAt(0).toUpperCase() + locationName.slice(1)

        try {
            await locations.create(

                {
                    locations : locationName,  
                    inCharge: 'Nadie'
                }
            );
            
        } catch (error) {
            console.log(error.message);
            
        }

        
        return true;
    },
    update: async function(req,res){
        console.log(req.body)

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
    delete: function(req,res){
        const name = req.body['asset-type-name']
        const exist = locationList.includes(name)
        if(exist){
            locationList = locationList.filter((item) =>item !== name)
        }
        return exist
    },
    get: async function(req,res){
        const {id} = req.params
        console.log(id)
        const locationFound = await locations.findAll({
            where: {
                id: id
            }
        })
        console.log(locationFound)
        return locationFound
    }
}