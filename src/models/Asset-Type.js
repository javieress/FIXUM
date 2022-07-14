

import { DataTypes } from "sequelize";
import db from "../database/conection2"



const assetTypes=db.define('AssetTypes', {     // el modelo asume que la tabla de la base de datos esta en pluran(termina en s)
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    assetType: {
        type: DataTypes.STRING,
        allowNull: false,
       
    }

    }
)




module.exports = {
    list:async function(){

        const assetTypeList=await assetTypes.findAll({attributes:['assetType']})

        return assetTypeList;
        
    },
    post: async function(req,res){
        let categori = req.body['new-asset-type-name'].toLowerCase()
        categori = categori.charAt(0).toUpperCase() + categori.slice(1)

       
        try {
             await assetTypes.create(

                {
                    categoria: categori
                    
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
        const exist = assetTypeList.includes(name)
        if(exist){
            assetTypeList = assetTypeList.filter((item) =>item !== name)
        }
        return exist
    }
}