import { conexion } from "../db/database.js";
import { validarClave, validarTokenUsuario, usuarioAutenticado, verificarAuthUsuario, reenviarToken } from "../sql/LoginSentencia.js";

export class LoginModelo {
    static async modeloValidarClave(correo) {
        let resultado = '';
        return new Promise (resolve => {           
            //let validarClave = `SELECT clave FROM usuario WHERE correo = '${correo}'`;
            conexion.query(validarClave(correo), async function (error, resul) {                
                if (resul.length != 0) {
                    resultado = resul[0].clave;
                    resolve(resultado)
                } else {
                    resultado = '';
                    resolve(resultado)
                }
            })
        })
    }
    
    static async validarUsuario() {
        return new Promise (resolve => { 
            //let validarTokenUsuario = `SELECT validarUsuario FROM usuario`;
            conexion.query(validarTokenUsuario(), async function (error, resultado) {
                if (resultado.length != 0) {
                    resolve(resultado)
                } else {
                    resolve(false)
                }
            })
        })
    }

    static async autorizadoLogin(token) {
        return new Promise (resolve => {            
            //let updateTarea = `UPDATE usuario SET autenticar = 'true' WHERE validarUsuario = '${token}'`;
            conexion.query(usuarioAutenticado(token), function (error, resultado) {
                if (resultado) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        })
    }
    
    static async autorizarUsuario(correo) {
        let resultado = '';
        return new Promise (resolve => {           
            //let validarTokenUsuario = `SELECT autenticar FROM usuario WHERE correo = '${correo}'`;
            conexion.query(verificarAuthUsuario(correo), async function (error, resul) {                
                if (resul.length >= 1) { 
                    resultado = resul[0].autenticar;
                    resolve(resultado)
                } else {
                    resolve(false)
                }
            })
        })
    }

    static async reenviarTokenAutenticacion(correo) {
        return new Promise (resolve => {           
            //let reenviarToken = `SELECT validarUsuario FROM usuario WHERE correo = '${correo}'`;
            conexion.query(reenviarToken(correo), async function (error, resultado) {                
                if (resultado.length != 0) { 
                    resolve(resultado)
                } else {
                    resolve(false)
                }
            })
        })
    }
}