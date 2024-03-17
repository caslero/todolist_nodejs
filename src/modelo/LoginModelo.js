import { conexion } from "../db/database.js";
import { validarClave,  validarTokenUsuario,  usuarioAutenticado,  verificarAuthUsuario,  reenviarToken } from "../sql/LoginSentencia.js";

/** La clase LoginModelo contiene todos los resultado de las sentencias sql que
    se hacen para poder iniciar sesion */
export class LoginModelo {
  /** modeloValidarClave sen encarga de traernos la clave correspondiente a un usuario
    esto con la finalidad de comparar la clave guardada y la ingresada para poder
    iniciar sesion */
  static async modeloValidarClave(correo) {
    let resultado = "";
    return new Promise((resolve) => {
      conexion.query(validarClave(correo), async function (error, resul) {
        if (resul.length != 0) {
          resultado = resul[0].clave;
          resolve(resultado);
        } else {
          resultado = "";
          resolve(resultado);
        }
      });
    });
  }

  /** validarUsuario nos trae el token guardado en la BD de un usuario X con la
    finalidad de compararlo con el enviado al correo */
  static async validarUsuario() {
    return new Promise((resolve) => {
      conexion.query(validarTokenUsuario(), async function (error, resultado) {
        if (resultado.length != 0) {
          resolve(resultado);
        } else {
          resolve(false);
        }
      });
    });
  }

  /** autorizadoLogin se encarga de cambiar el autenticar de un usuario a true, es
    decir, que valida el usuario */
  static async autorizadoLogin(token) {
    return new Promise((resolve) => {
      conexion.query(usuarioAutenticado(token), function (error, resultado) {
        if (resultado) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  /** autorizarUsuario se encarga de traer el autenticar, con el fin de saber si
    el usuario esta validado a o no */
  static async autorizarUsuario(correo) {
    let resultado = "";
    return new Promise((resolve) => {
      conexion.query(verificarAuthUsuario(correo), async function (error, resul) {
          if (resul.length >= 1) {
            resultado = resul[0].autenticar;
            resolve(resultado);
          } else {
            resolve(false);
          }
        }
      );
    });
  }

  /** reenviarTokenAutenticacion se encarga de consultar el token de un usuario
    registrado con el fin de reenviarlo para que se pueda validar */
  static async reenviarTokenAutenticacion(correo) {
    return new Promise((resolve) => {
      conexion.query(reenviarToken(correo), async function (error, resultado) {
        if (resultado.length != 0) {
          resolve(resultado);
        } else {
          resolve(false);
        }
      });
    });
  }
}
