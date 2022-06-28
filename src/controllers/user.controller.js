const config = require('../config/dbconfig')
const sql = require('mssql')
const user = require('../models/User')
const bodyParser = require('body-parser')

module.exports={
    index:function(req,res){
        res.render('./register/user-register.ejs',{title: ' | Usuarios',message: ''})
    },
    list:function(){
        return user.list()
    },
    post:function (req,res) {
        let message = "El usuario '"
        if(user.post(req,res)){
            message+= req.body['new-user-username'] + "' se guardó con éxito."
        }
        else{
            message+= req.body['new-user-username'] + "' ya existe."
        }
        res.render('./register/user-register.ejs',{title: 'FIXUM',message: message})
    }
}