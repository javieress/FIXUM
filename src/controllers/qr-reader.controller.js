

module.exports={

    readResult:function(req,res){
        const asset = {name:"prueba",id:30,assetType:"Electronico",location:"Sala 3",userInCharge:"Pedro Cuadra",description:"Una Weaita"}
        if (req.body["qr-result"] == "hola"){ //si la busqueda es válida
            message = "QR inválido"
            res.render('details/asset-details.ejs',{title: ' | Registro de Activo', asset:asset})
        }
        if (req.body["qr-result"] != "hola"){ //si la busqueda es inválida
            message = "QR inválido"
            res.render('prueba_LectorQR.ejs',{title: ' | Registro de Activo', message: message})
        }
        
    },index:function(req,res){
        res.render('prueba_LectorQR.ejs',{title: ' | Lector QR', message: ''})
    }
}