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
    update: function(req,res){

    },
    delete: function(req,res){
        const name = req.body['asset-type-name']
        const exist = locationList.includes(name)
        if(exist){
            locationList = locationList.filter((item) =>item !== name)
        }
        return exist
    }
}