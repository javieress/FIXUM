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
    }
)

// let assetList = [
//     {
//         'id': 'A1',
//         'name': 'Computador Lenovo',
//         'assetType': 'Electrónico',
//         'location': '40',
//         'userInCharge': 'Javier',
//         'description': 'Computador Lenovo xyz, comprado el 2020'
//     },
//     {
//         'id': 'A2',
//         'name': 'Escritorio verde',
//         'assetType': 'Mobiliario',
//         'location': 'Sala 41',
//         'userInCharge': 'Javier',
//         'description': 'Escritorio con la pata coja'
//     },
//     {
//         'id': 'A3',
//         'name': 'Don Quijote de la Mancha',
//         'assetType': 'Libro',
//         'location': 'Sala 42',
//         'userInCharge': 'Alexi',
//         'description': 'Libro fabricado el año 1900, le faltan 3 hojas'
//     }]

// let id = 4

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

        try {
            await asset.create(
                {
                id_assetType: assetType,
                id_location: location,
                id_users_in_charge: userInCharge,
                asset_name: name,
                isActive: 1,
                description: description,
            }
            );
            
        } catch (error) {
            console.log(error.message);
            
        }
        return true;

    },
    update: function (req, res) {

    },
    delete: function (req, res) {
        const name = req.body['asset-name']
        const exist = assetList.includes(name)
        if (exist) {
            assetList = assetList.filter((item) => item !== name)
        }
        return exist
    },
    last10Added: async function(){
        const last10 = await asset.findAll({order:[['updatedAt' , 'DESC']]})
        // const last10 = await sequelize.query('SELECT * FROM `ASSETS` ORDER BY `updatedAt` DESC', { type: QueryTypes.SELECT })
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
    }
}