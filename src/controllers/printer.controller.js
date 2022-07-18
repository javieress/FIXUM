const { render } = require("ejs");


module.exports = {create_qr_download:function(req, res){
    console.log("hola xd");

    var spawn = require("child_process").spawn;

    var pythonProcess = spawn('python',["generador_hojas_impresion.py"]);

    pythonProcess();



    //res.render("./select_qr_to_print.ejs",{title: ' | Seleccionar Items para Imprimir'})
}}