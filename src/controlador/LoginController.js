import { UsuarioModelo } from "../modelo/UsuarioModelo.js";
import { LoginModelo } from "../modelo/LoginModelo.js";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { sendMail } from "../config/emailer.js";

/** La clase LoginController se encarga de analizar las diferentes peticiones que
  deben cumplirse para que un usuario pueda iniciar sesion correctamente */
export class LoginControlador {
  /** postLogin sen encarga de responder la petision para iniciar sesion en caso
    de cumplirse todas las condiciones */
  static async postLogin(req, res) {
      const correo = req.body.correo;
      const clave = req.body.clave;
  
      if (clave.length < 5) {
        return res.status(400).send({
          status: "Error",
          message: "Minimo 5 caracteres",
        });
      }
  
      if (!correo) {
        return res.status(400).send({
          status: "Error",
          message: "Correo vacio",
        });
      }
  
      if (!clave) {
        return res.status(400).send({
          status: "Error",
          message: "Clave vacia",
        });
      }
  
      let authUsuario = await LoginModelo.autorizarUsuario(correo);
      if (authUsuario == "true") {
        try {
          let resultado = await LoginModelo.modeloValidarClave(correo);
          let comparada = await bcryptjs.compare(clave, resultado);
  
          if (!resultado) {
            return res.status(400).send({
              status: "Error",
              message: "Correo no existe",
            });
          } else {
            if (comparada) {
              const token = jsonwebtoken.sign(
                {
                  correo: correo,
                },
                process.env.JWT_SECRET,
                {
                  expiresIn: process.env.JWT_EXPIRATION,
                }
              );
  
              const cookieOption = {
                expires: new Date(
                  Date.now() +
                    process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                ),
                path: "/",
                httpOnly: true,
              };
  
              res.cookie("jwt", token, cookieOption);
              res.send({
                status: "ok",
                message: "usuario logueado",
                redirect: "/tareas",
              });
            } else {
              return res.status(400).send({
                status: "Error",
                message: "Clave invalida",
              });
            }
          }
        } catch (error) {
          return res.status(400).send({
            status: "Error",
            message: "Mal inicio de sesion",
          });
        }
      } else {
        let reenviarToken = await LoginModelo.reenviarTokenAutenticacion(correo);
        let nombreUsuario = await UsuarioModelo.nombreUsuario(correo);
        const token = reenviarToken[0].validarUsuario;
        const nombre = nombreUsuario[0].nombre;
        sendMail(correo, nombre, token);
  
        return res.status(400).send({
          status: "Error",
          message: "Usuario no verificado",
        });
      }
  }
}