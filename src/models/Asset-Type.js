

import { DataTypes } from "sequelize";
import db from "../database/conection2"



const assetTypes=db.define('categ_Activo', {     // el modelo asume que la tabla de la base de datos esta en pluran(termina en s)
    cod_categ:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false,
       
    }

    }
)
let assetTypeList = ['hola']

async function Categorias(){
    const cat=await assetTypes.findAll({
        attributes: ['categoria']})

    for(let i=0;i<cat.length;i++){
        console.log(cat[i].categoria)
        assetTypeList.push(cat[i].categoria)   
    }
    
}

module.exports = {
    list:function(){
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