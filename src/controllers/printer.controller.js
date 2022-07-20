const { render } = require("ejs");
var QRCode = require('qrcode');
const Jimp = require('jimp');

var AdmZip = require("adm-zip");

async function crear_qr(paginas, nombres){
    for (var i = 0; i < paginas.length; i++){
        QRCode.toFile('src/public/img/img_qr/qr_'+ i +'.png', paginas[i], {
            color: {
                dark: '#000000',
                light: '#ffffff'
            }, function(err){
                if (err) throw err
                console.log("Pagina: "+ paginas[i] + " lista :)");
            }
        });
    }
}


module.exports = {create_qr_download: async function(req, res){
    console.log("hola xd");

    var datos = req.body["id"];
    var paginas = [];
    var nombres = [];

    for (var i = 0; i < datos.length; i++){
        var spliteado = datos[i].split(",");

        var id_aux = spliteado[0];

        if (spliteado.length > 2){
            var resto = spliteado.splice(0,1);
            var nombre = resto.join(",");
        }
        else{
            var nombre = spliteado[1];
        }
        var url = "https://fixum-ad-infinitum.herokuapp.com/details/"+id_aux;
        paginas.push(url);
        nombres.push(nombre);

    }
    
    console.log("---");
    console.log(paginas);
    console.log(nombres);

    var aa = await crear_qr(paginas);

    var delayInMilliseconds = 1000; //1 second

    setTimeout(function() {
        var zip = new AdmZip();

        var ruta = 'src/public/img/img_qr';
        zip.addLocalFolder(ruta);
        
        zip.writeZip('src/public/img/descargar.zip');

    }, delayInMilliseconds);

    
    
    
    res.redirect("/print");
    
}}
