const config = require('../config/dbconfig')
const sql = require('mssql')
const user = require('../models/User')
const bodyParser = require('body-parser')
//const { default: users } = require('../models/User')


module.exports={
    index:function(req,res){
        res.render('./register/user-register.ejs',{title: ' | Usuarios',message: ''})
    },
    list:function(){
        return user.list()
    },
    post:async function (req,res) {
        let message = "El usuario '"
        
        
        const user_esta = await user.findOne(req,res);
        if(user_esta!=null){
            message+=req.body['new-user-username']+ "'ya existe.";
        }
        else{
            user.post(req,res)//llamo a funcion post para que cree usuario
            message+= req.body['new-user-username'] + "' se guardó con éxito."
        
        }
    



        res.render('./register/user-register.ejs',{title: 'FIXUM',message: message})
    },
    get: function(username){
        user.get(username)
    }
}