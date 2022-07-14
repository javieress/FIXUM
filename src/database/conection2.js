
// import { Sequelize } from "sequelize";
const { Sequelize} = require('sequelize');


const db= new Sequelize('fixus-db', 'adinfinitum_SQLLogin_1', 'jync46vhxn', {
    host: 'fixus-db.mssql.somee.com',
    dialect: 'mssql'
  });




module.exports = db;


