import { conexion } from "../db/database.js";
import { tokenCambiarClave, tokenValido } from "../sql/TokenSentencia.js";

export class TokensModelos {
    static async cambiarClaveToken(token) {
        return new Promise (resolve => {            
            //let tokenCambiarClave = `SELECT id_usuario FROM tokens WHERE token = '${token}'`
            conexion.query(tokenCambiarClave(token), function (error, resultado) {
                if (resultado.length != 0) {
                    resolve(resultado)
                } else {
                    resolve(false)
                }
            })
        })
    }

    static async claveCambiar(token) {
        return new Promise (resolve => {            
            //let claveCambiadas = `SELECT id_usuario FROM tokens WHERE token = '${token}'`
            conexion.query(tokenCambiarClave(token), function (error, resultado) {
                if (resultado.length != 0) {
                    resolve(resultado)
                } else {
                    resolve(false)
                }
            })
        })
    }

    static async ultimoToken(id) {
        return new Promise (resolve => {            
            //let ultimoTokens = `SELECT * FROM tokens WHERE id_usuario = '${id}'`;
            conexion.query(tokenValido(id), function (error, resultado) {
                if (resultado.length != 0) {
                    resolve(resultado)
                } else {
                    resolve(false)
                }
            })
        })
    }

    static async claveCambiada(claveN, id) {
        return new Promise (resolve => {            
            //let updateClave = `UPDATE usuario SET clave = '${claveN}' WHERE id = '${id}'`;
            conexion.query(this.claveCambiada(claveN, id), function (error, resultado) {
                if (resultado) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        })
    }
}