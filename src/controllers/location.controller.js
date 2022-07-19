const config = require('../config/dbconfig')
const sql = require('mssql')
const location = require('../models/Location')
const bodyParser = require('body-parser')



function validationLocationName(req,res){
    if(req.body['new-location-name'].length<=50 &&req.body['new-location-name'].length>=0){
        return true
    }
    return false
}


module.exports={
    index:function(req,res){
        res.render('./register/location-register.ejs',{title: ' | Ubicaciones',message: ''})
    },
    list: async function(){
        return await location.list()
    },
    post:function (req,res) {
        let message = ""
        if(validationLocationName(req,res)){
            if(location.post(req,res)){
                message+= req.body['new-location-name'].toUpperCase() + "' se guardó con éxito."
            }
            else{
                message+= 'Ocurrio un error'
            }
            
        }else{
            message+="Maximo de caracteres superado"
        }
        res.render('./register/location-register.ejs',{title: ' | Ubicaciones',message: message})
    },
    update: async function (req, res) {

        if(validationLocationName(req,res)){
            const updated = await location.update(req, res)
            if (updated) {
               res.redirect('/edit/location')
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
                res.render('./register/location-edit.ejs', { title: ' | Edit', location: locationUpdated, message: 'Erro no se pudo hacer la modificacion' })

            }
        }
        else{
            const locationUpdated =[{dataValues:{
                                id: req.body['new-location-id'],
                                locations: ''
                                }}]
            res.render('./register/location-edit.ejs', { title: ' | Edit', location: locationUpdated, message: 'Texto ingresado supera el máximo de caracteres' })
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