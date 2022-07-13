const config = require('../config/dbconfig')
const sql = require('mssql')
const location = require('../models/Location')
const bodyParser = require('body-parser')


module.exports={
    index:function(req,res){
        res.render('./register/location-register.ejs',{title: ' | Ubicaciones',message: ''})
    },
    list: async function(){
        // console.log(await location.list())
        return await location.list()
    },
    post:function (req,res) {
        let message = "La ubicación '"

        if(req.body['new-location-in-charge']!=null){
            console.log('paso null')
            location.post(req,res)
            message+= req.body['new-location-name'].toUpperCase() + "' se guardó con éxito."
        }
             
        res.render('./register/location-register.ejs',{title: 'FIXUM',message: message})
    }
}