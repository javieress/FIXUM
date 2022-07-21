const { render } = require("ejs");
var QRCode = require('qrcode');
const fs = require('fs');
var AdmZip = require("adm-zip");
const assetController = require("./asset.controller.js");


async function crear_qr(paginas, nombres){
    for (var i = 0; i < paginas.length; i++){
        var imagen = await QRCode.toFile('src/public/img/img_qr/qr_'+ nombres[i] +'.png', paginas[i], {
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

    console.log(datos.length);

    const fecha = new Date();

    var texto_fecha = fecha.getDate() + "_" + (fecha.getMonth()+1) + "_" + fecha.getFullYear() + "___" + fecha.getHours() +"-"+fecha.getMinutes();

    var ruta_zip = 'src/public/img/Codigos_QR_'+texto_fecha+'.zip';

    
    for (var i = 0; i < datos.length; i++){
        var spliteado = datos[i].split(",");

        var id_aux = spliteado[0];
        
        if (spliteado.length > 2){
            console.log("aaa");
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

    var delayInMilliseconds = 4000; 


    crear_qr(paginas,nombres);


    setTimeout(function() {

        var zip = new AdmZip();
        
        var ruta = 'src/public/img/img_qr';
        zip.addLocalFolder(ruta);
        
        zip.writeZip(ruta_zip);

    }, delayInMilliseconds);

    
    setTimeout(function() {
        res.download('./'+ ruta_zip); 

    }, delayInMilliseconds);

    setTimeout(function() {
        for (var i = 0; i < paginas.length; i++){
            fs.unlink('src/public/img/img_qr/qr_'+ nombres[i] +'.png', (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            });
        }
    }, delayInMilliseconds);

    setTimeout(function() {
        
        fs.unlink(ruta_zip, (err) => {
            if (err) {
                console.error(err)
                return
            }
        });

    }, 5000);   


}
, download_csv: async function(req, res){
    const fecha = new Date();
    var texto_fecha = fecha.getDate() + "_" + (fecha.getMonth()+1) + "_" + fecha.getFullYear() + "___" + fecha.getHours() +"-"+fecha.getMinutes();

    var encabezado = "ID, NOMBRE, TIPO, UBICACIÓN, PRECIO UNITARIO, CANTIDAD, FECHA INGRESO, FECHA ÚLTIMA MODIFICACIÓN\r\n"; //Revisar salto de linea
    var ruta_csv = "src/public/csv/Datos_activos_"+texto_fecha+".csv";
    //id, nombre, tipo, ubicacion, precio, cantidad
    const datos = await assetController.detailList();
    var contenido = encabezado;
    console.log("Total datos:"+ datos[0].length)

    for (var i = 0; i < datos[0].length; i++){
        console.log("Dato: "+ datos[0][i].id);
        var datos_fila = [datos[0][i].id, datos[0][i].asset_name, datos[0][i].assetType, datos[0][i].locations, datos[0][i].price, datos[0][i].quantity, datos[0][i].createdAt, datos[0][i].updatedAt];
        
        contenido = contenido + datos_fila.join(",")+ "\r\n";
    }

    
    fs.writeFile(ruta_csv,contenido, (err => {
        if (err) throw err;

        console.log("listo rey");
    }))

    setTimeout(function() {
        res.download(ruta_csv); 
        

    }, 5000);  

    
    setTimeout(function() {

        fs.unlink(ruta_csv, (err) => {
            if (err) {
                console.error(err)
                return
            }
        });

    }, 6000);  
    
    
}
}
