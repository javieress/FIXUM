const config = require('../config/dbconfig')
const sql = require('mssql')
const user = require('../models/User')
const bodyParser = require('body-parser')
<<<<<<< HEAD
//const { default: users } = require('../models/User')

=======
>>>>>>> parent of 792c249 (Merge branch 'alexi2020')

module.exports={
    index:function(req,res){
        res.render('./register/user-register.ejs',{title: ' | Usuarios',message: ''})
    },
    list:function(){
        return user.list()
    },
    post:function (req,res) {
        let message = "El usuario '"
<<<<<<< HEAD
        
        
        const user_esta = await user.findOne(req,res);
        if(user_esta!=null){
            message+=req.body['new-user-username']+ "'ya existe.";
        }
        else{
            user.post(req,res)//llamo a funcion post para que cree usuario
            message+= req.body['new-user-username'] + "' se guardó con éxito."
        
=======
        if(user.post(req,res)){
            message+= req.body['new-user-username'] + "' se guardó con éxito."
        }
        else{
            message+= req.body['new-user-username'] + "' ya existe."
>>>>>>> parent of 792c249 (Merge branch 'alexi2020')
        }
        res.render('./register/user-register.ejs',{title: 'FIXUM',message: message})
    },
    get: function(username){
        user.get(username)
    }
}