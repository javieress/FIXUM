const sequelize = require('sequelize');
const {DataTypes,QueryTypes} = require('sequelize');
const db = require("../database/conection2")

const asset=db.define('Asset', {
    
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_assetType: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    id_location: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    id_users_in_charge: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    asset_name: {
        type: DataTypes.STRING,
        allowNull:false
    },
    isActive: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    description: {
        type: DataTypes.STRING,
        allowNull:false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull:false
    }
    }
)

module.exports = {
    list: async function () {
        const assetList = await asset.findAll()
        return assetList
    },
    post: async function (req, res) {
        const name = req.body['new-asset-name']
        const assetType = req.body['new-asset-assetType']
        const location = req.body['new-asset-location']
        const userInCharge = req.body['new-asset-userInCharge']
        const description = req.body['new-asset-description']
        const quantity = req.body['new-asset-quantity']
        const price = req.body['new-asset-price']

        try {
            await asset.create(
                {
                id_assetType: assetType,
                id_location: location,
                id_users_in_charge: userInCharge,
                asset_name: name,
                isActive: 1,
                description: description,
                quantity: quantity,
                price: price,
            }
            );
            
        } catch (error) {
            console.log(error.message);
            
        }
        return true;

    },
    delete: async function (req, res) {
        const {id} = req.params
        console.log('xxxxxx');
        try {
            await asset.destroy({
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
    last10Added: async function(){
        const last10 = await asset.findAll({
            limit: 10,
            order:[['updatedAt' , 'DESC']]})
        return last10
    },
    get: async function(req,res){
        const {id} = req.params

        const assetFound = await asset.findAll({
            where: {
                id: id
            }
        })
        console.log(assetFound);
        return assetFound
    },
    update: async function(req,res){
        console.log('aqiuuaosao')
        const name = req.body['new-asset-name']
        const assetType = req.body['new-asset-assetType']
        const location = req.body['new-asset-location']
        const userInCharge = req.body['new-asset-userInCharge']
        const description = req.body['new-asset-description']
        const quantity = req.body['new-asset-quantity']
        const price = req.body['new-asset-price']

        try{
            await asset.update(
                {
                id_assetType: assetType,
                id_location: location,
                id_users_in_charge: userInCharge,
                asset_name: name,
                isActive: 1,
                description: description,
                quantity: quantity,
                price: price,
            },{where:{
                id: req.body['new-asset-id']
            }
            }
            );
            // await asset.update({ 
            //     id_location: req.body['new-location-name'],
            //     id_users_in_charge: ,
            //     asset_name: ,
            //     isActive: ,
            //     description: ,
            //  }, {
            //     where: {
            //         id_assetType: req.body['new-location-id']
            //     }
            //   })

            return true
        }catch(err){
            console.log(err)
            return false
        }
    }
}