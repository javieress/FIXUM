const { render } = require("ejs");
const { connected } = require("process");




module.exports = {create_qr_download:function(req, res){
    console.log("hola xd");

    

    res.render("./select_qr_to_print.ejs",{title: ' | Seleccionar Items para Imprimir'})
}}