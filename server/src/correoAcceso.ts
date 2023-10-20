import jwt from 'jsonwebtoken';

var email = require("emailjs/email");
console.log("hola");
module.exports = (formulario: any) => {
const token : string = jwt.sign(formulario.email, process.env.TOKEN_SECRET || 'prueba');

var server = email.server.connect(
    {
        user: "ingeneria.computacion.utm@gmail.com",
        password: "faqsfrxelnubiioe",
        host: "smtp.gmail.com",
        ssl: true,
    });
var message: any = {};
message = {
    from: "ingeneria.computacion.utm@gmail",
    to: formulario.email,
    bcc: "",
    subject: "BIBLIOTECA UNIVERSITARIA",
    attachment: [
        { data: `Hola, toca el link para hacer su cambio de contraseña:
        <a href="http://localhost:4200/recuperar/${token}" >ACEPTAR</a>
<br><br>
        `, alternative: true }
    ]
};
server.send(message, function (err: any, message: any) { console.log(err); });
}