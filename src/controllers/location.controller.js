const config = require('../config/dbconfig')
const sql = require('mssql')
const location = require('../models/Location')
const bodyParser = require('body-parser')


module.exports={
    index:function(req,res){
        res.render('./register/location-register.ejs',{title: ' | Ubicaciones',message: ''})
    },
    list: async function(){
        return await location.list()
    },
    post:function (req,res) {
        let message = "La ubicación '"
        if(location.post(req,res)){
            message+= req.body['new-location-name'].toUpperCase() + "' se guardó con éxito."
        }
        else{
            message+= req.body['new-location-name'].toUpperCase() + "' ya existe."
        }
        res.render('./register/location-register.ejs',{title: ' | Ubicaciones',message: message})
    },
    update: async function (req, res) {
        const updated = await location.update(req, res)
        if (updated) {
            const locationUpdated =
                [
                    {
                        dataValues:
                        {
                            id: req.body['new-location-id'],
                            locations: ''
                        }
                    }]
            res.render('./register/location-edit.ejs', { title: ' | Edit', location: locationUpdated, message: 'Editado con éxito' })
        }
        else {
            const locationUpdated =
                [
                    {
                        dataValues:
                        {
                            id: req.body['new-location-id'],
                            locations: ''
                        }
                    }]
            res.render('./register/location-edit.ejs', { title: ' | Edit', location: locationUpdated, message: 'No se puedo editar' })

        }
        
    },
    delete: async function (req,res){
        const deleted = await location.delete(req,res)
        if (deleted){
            res.redirect('/edit/location')
        }else{
            res.redirect('/edit/location')

        }
         
    },
    get: async function (req, res) {
        return await location.get(req, res)
    }
}