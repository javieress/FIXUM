 //Requerimos el paquete
 const nodemailer = require('nodemailer');

 //Creamos el objeto de transporte
 let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'pitsasafras2@gmail.com', // generated ethereal user
    pass: 'fqmgslczplfifknb', // generated ethereal password
  },
});

module.exports={
  post:function (req,res) {

    var formSubject = req.body["contact-name"] + ", " + req.body["contact-email"];
    var formMessage = req.body["contact-message"];
 
    var mailOptions = {
      from: '"Soporte Fixum" <pitsasafras2@gmail.com>', // sender address
      to: "nicolas.hernandez@alumnos.ucn.cl", // list of receivers cristhian.rabi@alumnos.ucn.cl javier.rojas04@alumnos.ucn.cl nicolas.hernandez@alumnos.ucn.cl
      subject: formSubject, // Subject line
      text: formMessage, // plain text body
    };
     
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email enviado: ' + info.response);
      }
    });
      res.redirect("/contact");
  }
}