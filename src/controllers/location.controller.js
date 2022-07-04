const config = require('../config/dbconfig')
const sql = require('mssql')
const location = require('../models/Location')
const bodyParser = require('body-parser')

module.exports={
    index:function(req,res){
        res.render('./register/location-register.ejs',{title: ' | Ubicaciones',message: ''})
    },
    list:function(){
        return location.list()
    },
    post:function (req,res) {
        let message = "La ubicación '"
        if(location.post(req,res)){
            message+= req.body['new-location-name'].toUpperCase() + "' se guardó con éxito."
        }
        else{
            message+= req.body['new-location-name'].toUpperCase() + "' ya existe."
        }
        res.render('./register/location-register.ejs',{title: 'FIXUM',message: message})
    }
}