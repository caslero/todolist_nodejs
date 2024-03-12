import nodemailer  from 'nodemailer';
import { htmlEmail, htmlEmailCambiarClave } from '../plantillas/emailValidar.js';
//import { validarUsuario } from '../controlador/controler.js';
//import { validarUsuario } from '../controlador/controler.js';


const transporte = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "920a77ec1cde7e",
      pass: "5f6d46a4147dfa"
    }
});



export const sendMail = async (correo, nombre, validarUsuario) => {
    const info = await transporte.sendMail({
        from: '"Caslero" <caslero@caslero.com>',
        to: `${correo}`,
        subject: `Hola ${nombre}, bienvenido a tu comunidad...`,
        html: `${htmlEmail(validarUsuario)}`
    })
    return info;
}

export const sendMailCambiarClave = async (correo, nombre, validarUsuario) => {
    const info = await transporte.sendMail({
        from: '"Caslero" <caslero@caslero.com>',
        to: `${correo}`,
        subject: `Hola ${nombre}, bienvenido a tu comunidad...`,
        html: `${htmlEmailCambiarClave(validarUsuario)}`
    })
    return info;
}