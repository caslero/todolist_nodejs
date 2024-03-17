/** nodemailer es el modulo para conectar con mailtrap 
    htmlEmail es la estructura del correo para validar el usuario y
    htmlEmailCambiarClave es la estructura del correo para cambiar la
    clave del usuario
 */
import nodemailer from "nodemailer";
import { htmlEmail, htmlEmailCambiarClave } from "../plantillas/emailValidar.js";

/** La const transporte es la encargada de hacer la conexion con mailtrap, la
    cual es un simulador para enviar correos */
let transporte = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "e71d5aa8088a92",
    pass: "3a1f59c9aee1ef"
  }
});

/** La function senMail es la encargada de enviar el token para validar el usuario
    recien registrado */
export const sendMail = async (correo, nombre, validarUsuario) => {
  const info = await transporte.sendMail({
    from: '"Caslero" <caslero@caslero.com>',
    to: `${correo}`,
    subject: `Hola ${nombre}, bienvenido a tu comunidad...`,
    html: `${htmlEmail(validarUsuario)}`,
  });
  return info;
}; 

/** La function senMailCambiarClave es la encargada de enviar el token para cambiar
    la clave del usuario */
export const sendMailCambiarClave = async (correo, nombre, validarUsuario) => {
  const info = await transporte.sendMail({
    from: '"Caslero" <caslero@caslero.com>',
    to: `${correo}`,
    subject: `Hola ${nombre}, bienvenido a tu comunidad...`,
    html: `${htmlEmailCambiarClave(validarUsuario)}`,
  });
  return info;
};

/** tokenValidarUsuario es la encargada de generar el token para validar el
  usuario que se acaba de registrar */
export const tokenValidarUsuario = (num) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result1 = Math.random().toString(34).substring(0, num);
  let result2 = Math.random().toString(34).substring(0, num);
  const token1 = result1.split("; ").find((cookie) => cookie.startsWith("0.")).slice(2);
  const token2 = result2.split("; ").find((cookie) => cookie.startsWith("0.")).slice(2);

  return token1 + token2;
};
