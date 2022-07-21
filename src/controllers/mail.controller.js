//Requerimos el paquete
const nodemailer = require('nodemailer');

//Credenciales del correo
const user = 'fixumsoftware@gmail.com'
const pass = 'xphdvtmdereqkpcd'

//Creamos el objeto de transporte
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: user, // generated ethereal user
    pass: pass, // generated ethereal password
  },
});

module.exports = {
  contact: function (req, res) {

    var formSubject = req.body["contact-name"] + ", " + req.body["contact-email"];
    var formMessage = req.body["contact-message"];

    var mailOptions = {
      from: '"Soporte Fixum" <' + user + '>', // sender address
      to: user, // list of receivers cristhian.rabi@alumnos.ucn.cl javier.rojas04@alumnos.ucn.cl nicolas.hernandez@alumnos.ucn.cl pablo.rios@alumnos.ucn.cl
      subject: formSubject, // Subject line
      text: formMessage, // plain text body
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email enviado: ' + info.response);
      }
    });
    res.redirect("/contact");
  },
  adminNotification: function (req, res) {

    var formSubject = req.body["subject"];
    var formMessage = req.body["message"];
    var formDestination = req.body["email"];

    var mailOptions = {
      from: '"Soporte Fixum" <' + user + '>', // sender address
      to: formDestination,// list of receivers
      subject: formSubject, // Subject line
      text: formMessage, // plain text body
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email enviado: ' + info.response + "\nDestinatarios: " + formDestination);
      }
    });
    res.redirect("/notifications");
  }
}