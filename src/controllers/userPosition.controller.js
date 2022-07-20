const config = require('../config/dbconfig')
const sql = require('mssql')
const userPosition = require('../models/UserPosition')
const bodyParser = require('body-parser');
const UserPosition = require('../models/UserPosition');



function validationUserPositionLenght(req,res){

    if(req.body['new-user-position'].length<=50 && req.body['new-user-position'].length>=1){
        return true;
    }
    return false;
}
module.exports={
    index:function(req,res){
        res.render('./register/UserPosition-register.ejs',{title: ' |Cargos',message: ''})
    },
    list: async function(){
        return await userPosition.list()
    },
    post:function (req,res) {
        let message=""
        if(validationUserPositionLenght(req,res)){
            if(userPosition.post(req,res)){
                message+= req.body['new-user-position'].toUpperCase() + "' se guardó con éxito."
            }
            else{
                message+= 'Ocurrio un error'
            }
            
        }else{
            message+="Maximo de caracteres superado"
        }
        res.render('./register/userPosition-register.ejs',{title: ' | Cargos',message: message})
    },
    update: async function (req, res) {
        if(validationLocationName(req,res)){
            const updated = await userPosition.update(req, res)
            if (updated) {
               res.redirect('/edit/UserPosition')
            }
            else {
                const positionUpdated =
                    [
                        {
                            dataValues:
                            {
                                id: req.body['new-user-position-id'],
                                position: ''
                            }
                        }]
                res.render('./register/userPosition-edit.ejs', { title: ' | Edit', userPosition: positionUpdated, message: 'Erro no se pudo hacer la modificacion' })

            }
        }
        else{
            const positionUpdated =
                    [
                        {
                            dataValues:
                            {
                                id: req.body['new-user-position-id'],
                                position: ''
                            }
                        }]
                res.render('./register/userPosition-edit.ejs', { title: ' | Edit', userPosition: positionUpdated, message: 'Se supero el maximo de caracteres' })

        }
        
    },
    delete: async function (req,res){
        const deleted = await userPosition.delete(req,res)
        if (deleted){
            res.redirect('/edit/UserPosition')
        }else{
            res.redirect('/edit/UserPosition')

        }
         
    },
    get: async function (req, res) {
        return await UserPosition.get(req, res)
    }
}