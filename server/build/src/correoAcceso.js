"use strict";
var email = require("emailjs/email");
console.log("hola");
//module.exports = (formulario: any) => {
var server = email.server.connect({
    user: "cristiancitorod@gmail.com",
    password: "yopajncyugwkitzy",
    host: "smtp.gmail.com",
    ssl: true,
});
var message = {};
message = {
    from: "cristiancitorod@gmail.com",
    to: "rogc020807@gs.utm.mx",
    bcc: "",
    subject: "Probando ando",
    attachment: [
        { data: `¡¡Te damos la más cordial bienvenida !!`, alternative: true }
    ]
};
server.send(message, function (err, message) { console.log(err); });
//}
