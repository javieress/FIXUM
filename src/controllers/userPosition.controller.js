const userPosition=require('../models/UserPosition');


module.exports={
    index:function(req,res){
       // res.render('./register/location-register.ejs',{title: ' | Ubicaciones',message: ''})
    },
    list:async function(){
        return await userPosition.list()
    },
    post:function (req,res) {
             
        res.render('./register/location-register.ejs',{title: 'FIXUM',message: message})
    }
}