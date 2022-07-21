
const { Sequelize} = require('sequelize');

//Conexión a base de datos

const db= new Sequelize('fixus-db', 'adinfinitum_SQLLogin_1', 'jync46vhxn', {
    host: 'fixus-db.mssql.somee.com',
    dialect: 'mssql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },  
  });

module.exports = db;


