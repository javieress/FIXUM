const assetController = require('../controllers/asset.controller')

module.exports={

    readResult:function(req,res){
        var check = false;
        const text = JSON.stringify(req.body.qrResult);
        var id = "";
        if (text.includes('localhost') || text.includes('herokuapp')){
            var lines = text.split('/');
            lines = lines[lines.length-1];
            lines = lines.split('"');
            id = lines[0];
            check = true;
        }

        if (check){ //si la busqueda es válida
            
            const url = "/details/" + id;
            res.redirect(url)
        }
        else{ //si la busqueda es inválida
            const message = "QR inválido"
            res.render('prueba_LectorQR.ejs',{title: ' | Lector QR', message: message})
        }
        
    },index:function(req,res){
        res.render('prueba_LectorQR.ejs',{title: ' | Lector QR', message: ''})
    }
}