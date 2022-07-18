const { DataTypes, QueryTypes, Sequelize } = require('sequelize');
const db = require("../database/conection2");

const Role = db.define('Role',{
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    }
})

module.exports = {
    create: async function (role) {
        try {
            return await Role.create(
                {
                    name: role.name
                }
            );

        } catch (error) {
            console.log(error.message);
        }
    },
    getRoles: async function () {
        const roleList = await Role.findAll()
        return roleList
    },
    getRoleByName: async function (name) {
        const roleFound = await Role.findAll({
            where: {
                name: name
            }
        })
        return roleFound
    },
    updateRoleByName: async function (role) {
        try {
            const roleUpdated = await Role.update({
                name: role.newName
            }, {
                where: {
                    name: role.oldName
                }
            })
            return roleUpdated
        }
        catch (err) {
            console.log(err)
        }
        
    },
    deleteRoleByName: async function (name) {
        await Role.destroy({
            where: {
                name: name
            }
        })
    }
}