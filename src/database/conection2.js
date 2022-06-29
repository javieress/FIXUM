
import { Sequelize } from "sequelize";

const db= new Sequelize('Activos', 'SanFer', 'fer123', {
    host: 'localhost',
    dialect: 'mssql'
  });


export default db;
