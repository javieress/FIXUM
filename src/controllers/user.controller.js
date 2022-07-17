const config = require('../config/dbconfig')
const sql = require('mssql')
const user = require('../models/User')
const bodyParser = require('body-parser')

const userPositionList = require('./userPosition.controller')

const Fn = {
	// Valida el rut con su cadena completa "XXXXXXXX-X"
	validaRut : function (rutCompleto) {
		if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
			return false;
		let tmp 	= rutCompleto.split('-');
		let digv	= tmp[1]; 
		let rut 	= tmp[0];
		if ( digv == 'K' ) digv = 'k' ;
		return (Fn.dv(rut) == digv );
	},
	dv : function(T){
		let M=0,S=1;
		for(;T;T=Math.floor(T/10))
			S=(S+T%10*(9-M++%6))%11;
		return S?S-1:'k';
	}
}






module.exports={
    index: async function(req,res){
        res.render('./register/user-register.ejs',{title: ' | Usuarios',message: '',userPosition: await userPositionList.list()})
    },
    list: async function(){
        return await user.list()
    },
    post:async function (req,res) {
        let message = "El usuario '"

        if(Fn.validaRut(req.body['new-user-rut']) && (req.body['new-user-username'].length==10 || req.body['new-user-username'].length==9)){

            const user_esta = await user.findOneRut(req,res) || await user.findOneUserName(req,res);
            console.log(user_esta)
            if(user_esta!=null){
                message+=req.body['new-user-username']+ "'ya existe.";
            }
            else{
                user.post(req,res)//llamo a funcion post para que cree usuario
                message+= req.body['new-user-username'] + "' se guardó con éxito."
            
            }
        }else{
            message+=req.body['new-user-username']+ "'no es valido";
            
        }

        res.render('./register/user-register.ejs',{title: 'FIXUM',message: message,userPosition: await userPositionList.list()})
    },
    get: async function(req,res){
        console.log(await user.get(req,res));
        return await user.get(req,res)
    },
    update: async function (req, res) {
        // const exist = await user.get(req,res)
        // console.log(exist);
        const updated = await user.update(req, res)
        if (updated) {
            // const userUpdated =
            //     [
            //         {
            //             dataValues:
            //             {
            //                 id: req.body['new-location-id'],
            //                 locations: ''
            //             }
            //         }]
            // res.render('./register/location-edit.ejs', { title: ' | Edit', location: locationUpdated, message: 'Editado con éxito' })
            res.redirect('/')
        }
        else {
            // const userUpdated =
            //     [
            //         {
            //             dataValues:
            //             {
            //                 id: req.body['new-location-id'],
            //                 locations: ''
            //             }
            //         }]
            // res.render('./register/location-edit.ejs', { title: ' | Edit', location: locationUpdated, message: 'No se puedo editar' })
            res.redirect('/')
        }
        
    }

}