const { render } = require("ejs");
const { connected } = require("process");


module.exports = {create_qr_download:function(req, res){
    console.log("hola xd");

    const { spawn } = require('child_process');

    const child = spawn('python', ['-h']);

    child.stdout.on('data', (data) => {
        console.log(`stdout:+ ${data}`);
    })

    child.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`)
    })

    child.on('error', (error) => console.log('error: ${error.message}'))

    child.on('exit', (code, signal) => {
        if (code) console.log("Proceso termino con el codigo: ${code}")
        if (signal) console.log("Proceso matado con la señal: ${signal}")
        console.log("Done :)");
    })



    //res.render("./select_qr_to_print.ejs",{title: ' | Seleccionar Items para Imprimir'})
}}