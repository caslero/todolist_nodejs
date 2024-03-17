import { conexion } from "../db/database.js";
import { tokenCambiarClave, tokenValido, claveCambiadaExitosa } from "../sql/TokenSentencia.js";

/** La clase TokensModelos contiene todos los resultado de las sentencias sql que
    se hacen para los tokens de los cambios de clave */
export class TokensModelos {

  /** cambiarClaveToken nos trae el idUsuario que se guardo en la tabla tokens */
  static async cambiarClaveToken(token) {
    return new Promise((resolve) => {
      conexion.query(tokenCambiarClave(token), function (error, resultado) {
        if (resultado.length != 0) {
          resolve(resultado);
        } else {
          resolve(false);
        }
      });
    });
  }

  /** ultimoToken trae todos los token que ha solicitado un usuario para cambiar la
    clave del usuario, esto con el fin de saber cual ha expirado y cual no */
  static async ultimoToken(id) {
    return new Promise((resolve) => {
      conexion.query(tokenValido(id), function (error, resultado) {
        if (resultado.length != 0) {
          resolve(resultado);
        } else {
          resolve(false);
        }
      });
    });
  }

  /** claveCambiada actualiza la clave de usuario, guandando la nueva clave */
  static async claveCambiada(claveN, id) {
    return new Promise((resolve) => {
      conexion.query(claveCambiadaExitosa(claveN, id), function (error, resultado) {
          if (resultado.length != 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      );
    });
  }
}
