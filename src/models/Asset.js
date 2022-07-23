const { DataTypes, QueryTypes, Sequelize } = require('sequelize');
const db = require("../database/conection2");

const asset = db.define('Asset', {

    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_assetType: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_location: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_users_in_charge: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    asset_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}
)

module.exports = {
    list: async function () {
        const assetList = await asset.findAll()

        return assetList;

    },
    detailList: async function () {
        const assetDetail = await db.query('SELECT Assets.id,Assets.quantity,Assets.price,Assets.id_assetType,Assets.id_location,Assets.createdAt,Assets.updatedAt,Assets.id_users_in_charge,Assets.asset_name,Assets.description,AssetTypes.assetType,Locations.locations FROM Assets inner join AssetTypes on Assets.id_assetType=AssetTypes.id inner join Locations on Assets.id_location=Locations.id')
        return assetDetail

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
            const assetCreated = await asset.create(
                {
                    id_assetType: assetType,
                    id_location: location,
                    id_users_in_charge: userInCharge,
                    asset_name: name,
                    description: description,
                    quantity: quantity,
                    price: price,
                }
            );
            if (assetCreated != undefined) {
                return true;
            }
            else {
                return false
            }

        } catch (error) {
            console.log(error.message);
            return false
        }
    },
    delete: async function (req, res) {
        const { id } = req.params
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
    last10Added: async function () {
        const last10 = await db.query('SELECT TOP 10 Assets.id,Assets.asset_name,AssetTypes.assetType,Users.UserName,Users.nameUser,Users.last_name,Assets.quantity,Locations.locations FROM Assets inner join Users on Users.id_users=Assets.id_users_in_charge inner join AssetTypes ON AssetTypes.id=Assets.id_assetType inner join Locations on Locations.id=Assets.id_location order by Assets.updatedAt desc')

        return last10
    },
    AssetsPrices: async function () {
        const assetsPrices = await db.query('select Assets.id,AssetTypes.assetType,Assets.asset_name,Assets.quantity,Assets.price,(Assets.quantity*Assets.price)as Valor from Assets inner join AssetTypes on AssetTypes.id=Assets.id_assetType order by Valor Desc')

        return assetsPrices



    },
    TotalAssetsByLocation: async function () {
        const totalAssetsByLocation = await db.query('Select Locations.locations,sum(Assets.quantity)as Cantidad,(sum(Assets.price*Assets.quantity))as Total from Assets right join Locations on Locations.id=Assets.id_location group by Locations.locations')
        for (let i in totalAssetsByLocation[0]) {
            if (totalAssetsByLocation[0][i].Cantidad == null) {
                totalAssetsByLocation[0][i].Cantidad = '0'
                totalAssetsByLocation[0][i].Total = '0'
            }
        }

        return totalAssetsByLocation
    },
    get: async function (req, res) {
        let { id } = req.params
        if (!id) {
            id = req.query['id']
            if (!id) {
                id = req.body['new-asset-id']
            }
        }
        const assetFound = await asset.findAll({
            where: {
                id: id
            }
        })

        const locationName = await db.query("select Locations.locations from Assets inner join Locations on Assets.id_location=Locations.id where Assets.id_location=" + assetFound[0].dataValues.id_location)
        assetFound[0].dataValues.location = locationName[0][0].locations

        const assetTypeName = await db.query("select AssetTypes.assetType  from Assets inner join AssetTypes on Assets.id_assetType=AssetTypes.id where Assets.id_assetType=" + assetFound[0].dataValues.id_assetType)
        assetFound[0].dataValues.assetTypeName = assetTypeName[0][0].assetType

        const userName = await db.query("select Users.nameUser,Users.last_name,Users.UserName  from Assets inner join Users on Assets.id_users_in_charge=Users.id_users where  Assets.id_users_in_charge='" + assetFound[0].dataValues.id_users_in_charge + "'")
        assetFound[0].dataValues.nameUser = userName[0][0].nameUser
        assetFound[0].dataValues.lastName = userName[0][0].last_name
        assetFound[0].dataValues.UserName = userName[0][0].UserName

        return assetFound
    },
    update: async function (req, res) {

        const name = req.body['new-asset-name']
        const assetType = req.body['new-asset-assetType']
        const location = req.body['new-asset-location']
        const userInCharge = req.body['new-asset-userInCharge']
        const description = req.body['new-asset-description']
        const quantity = req.body['new-asset-quantity']
        const price = req.body['new-asset-price']

        try {
            await asset.update(
                {
                    id_assetType: assetType,
                    id_location: location,
                    id_users_in_charge: userInCharge,
                    asset_name: name,
                    description: description,
                    quantity: quantity,
                    price: price,
                }, {
                    where: {
                        id: req.body['new-asset-id']
                    }
            }
            );

            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }
}