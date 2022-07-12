import { DataTypes } from "sequelize";
import db from "../database/conection2";

const ubic=db.define('Ubicacion', {

    cod_ubi: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey:true
    },
    ubicacion: {
        type: DataTypes.STRING,
        allowNull:false
    },
    encargado: {
        type: DataTypes.STRING,
        allowNull:false
    }

    }
)

export default ubic;