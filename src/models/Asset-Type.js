
const { DataTypes } = require('sequelize');
const db = require("../database/conection2")

const assetTypes = db.define('assetType', {     // el modelo asume que la tabla de la base de datos esta en pluran(termina en s)
    id: {
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
async function Categorias() {
    const cat = await assetTypes.findAll({
        attributes: ['assetType']
    })

    for (let i = 0; i < cat.length; i++) {
        assetTypeList.push(cat[i].categoria)
    }

}

module.exports = {
    list: async function () {
        const assetTypeList = await assetTypes.findAll()

        return assetTypeList;

    },
    post: async function (req, res) {
        let assetTypeName = req.body['new-asset-type-name'].toLowerCase()
        assetTypeName = assetTypeName.charAt(0).toUpperCase() + assetTypeName.slice(1)

        try {
            await assetTypes.create(
                {
                    assetType: assetTypeName
                }
            );

        } catch (error) {
            console.log(error.message);
        }
        return true;
    },
    update: async function (req, res) {


        try {
            await assetTypes.update({ assetType: req.body['new-asset-type-name'] }, {
                where: {
                    id: req.body['new-asset-type-id']
                }
            })
            return true
        } catch (err) {
            console.log(err)
            return false
        }

    },
    delete: async function (req, res) {
        const { id } = req.params
        try {
            await assetTypes.destroy({
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
    TotalByAssetsTypes: async function () {
        const totalAssetTypes = await db.query('select AssetTypes.assetType,sum(Assets.quantity)as Cantidad,(sum(Assets.price*Assets.quantity))as Total from  Assets right join AssetTypes on AssetTypes.id=Assets.id_assetType group by AssetTypes.assetType')
        for (let i in totalAssetTypes[0]) {
            if (totalAssetTypes[0][i].Cantidad == null) {
                totalAssetTypes[0][i].Cantidad = '0'
                totalAssetTypes[0][i].Total = '0'
            }
        }
        return totalAssetTypes
    },
    get: async function (req, res) {
        let { id } = req.params
        if (!id) {
            id = req.body['new-asset-type-id']
        }
        const assetTypeFound = await assetTypes.findAll({
            where: {
                id: id
            }
        })

        return assetTypeFound
    }
}