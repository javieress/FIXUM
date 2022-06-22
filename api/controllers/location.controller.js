const config = require('../dbconfig')
const sql = require('mssql')
const Locations = require('../models/Location')

const locationList = [new Locations('Sala 30'),new Locations('Sala 32'),new Locations('Sala 35')]

const Location = {
    list: async () =>{
        // try{
        //     const pool = await sql.connect(config)
        //     const places = await pool.request().query("SELECT * from Locations")
        //     return (await places).recordsets
        // }
        // catch(e){
        //     console.log(error)
        // }    
        return locationList
    },
    get: async (name) =>{
        // try{
        //     const pool = await sql.connect(config)
        //     const place = await pool.request()
        //     .input('input_parameter',sql.NVarChar,name)
        //     .query("SELECT * from Locations where nombre = @input_parameter")
        //     return (await place).recordsets
        // }
        // catch(e){
        //     console.log(error)
        // } 
        const location = null;
        locationList.forEach(location => {

        });   
    },
    post: async(name) =>{
        try{
            const pool = await sql.connect(config)
            const insert = await pool.request()
            .input('nombre',sql.NVarChar)
            .query("INSERT INTO Locations (nombre) VALUES (@nombre)")
            return  insert.recordsets;
        }
        catch (err) {
            console.log(err);
          }
    },
    delete: async (name) =>{
        try{
            const pool = await sql.connect(config)
            const place = await pool.request()
            .input('input_parameter',sql.NVarChar,name)
            .query("DELETE FROM Locations WHERE nombre = @input_parameter")            
            return (await place).recordsets
        }
        catch(e){
            console.log(error)
        }    
    },
}


module.exports = Location