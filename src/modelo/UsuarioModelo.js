import { conexion } from "../db/database.js";
import { guardarUsuario, existeUsuario, verClave, updateClave, obtenerIdUsuario, guardarTokenCambioClaves} from "../sql/UsuarioSentencia.js";
export class UsuarioModelo {
    static async registrarNuevoUsuario(nombre, correo, clave, validarUsuario) {
        const falso = 'false';
        return new Promise (resolve => { 
           //let registrarUsuario = `INSERT INTO usuario (nombre, correo, clave, validarUsuario, autenticar) VALUES ('${nombre}', '${correo}', '${clave}', '${validarUsuario}', 'false')`; 
           conexion.query(guardarUsuario(nombre, correo, clave, validarUsuario, falso), function (error, resultado) {
            if (!error) {
                resolve(true)
            } else {
                resolve(false)
            }            
           })
        })
    }

    static async usuarioExistente(correo){
        return new Promise (resolve => {
            let nombreUsuario = '';
            //let verUsuario = `SELECT nombre FROM usuario where correo = '${correo}'`;            
            conexion.query(existeUsuario(correo), function (error, resultado) {
                if (resultado.length >= 1) {
                    nombreUsuario = resultado[0].nombre;
                    resolve(nombreUsuario);                
                } else {
                    resolve(false)
                }                          
            })
        })
    }

    static async cambiarClaveUsuario(correo){
        return new Promise (resolve => {
            //let verClave = `SELECT clave FROM usuario where correo = '${correo}'`;            
            conexion.query(verClave(correo), function (error, resultado) {
                if (resultado.length >= 1) {
                    resolve(resultado);                
                } else {
                    resolve(false)
                }                          
            })
        })
    }

    static async claveActualizadaUsuario(clave, correo){
        return new Promise (resolve => {
            //let updateClave = `UPDATE usuario SET clave = '${clave}' WHERE correo = '${correo}'`;
            conexion.query(updateClave(clave, correo), function (error, resultado) {
                if (resultado) {
                    resolve(true);                
                } else {
                    resolve(false)
                }                          
            })
        })
    }

    static async usuarioNoExistente(correo){
        return new Promise (resolve => {
            //let verUsuario = `SELECT nombre FROM usuario where correo = '${correo}'`;            
            conexion.query(existeUsuario(correo), function (error, resultado) {
                if (resultado.length != 0) {
                    resolve(true);                
                } else {
                    resolve(false)
                }                          
            })
        })
    }

    static async cambiarUsuarioClaveToken(correo){
        return new Promise (resolve => {
            //let verUsuario = `SELECT nombre FROM usuario WHERE correo = '${correo}'`;            
            conexion.query(existeUsuario(correo), function (error, resultado) {
                if (resultado.length >= 1) {
                    resolve(true);                
                } else {
                    resolve(false)
                }                          
            })
        })
    }

    static async guardarTokenCambioClave(correo, validarUsuario) {
        return new Promise (resolve => {
            let id = '';
            //let idUsuario = `SELECT id FROM usuario WHERE correo = '${correo}'`;
            conexion.query(obtenerIdUsuario(correo), function (error, resultado) {                
                id = resultado[0].id;
                //let guardarTokenCambioClaves = `INSERT INTO tokens (id_usuario, token) VALUES ('${id}', '${validarUsuario}')`;
                conexion.query(guardarTokenCambioClaves(id, validarUsuario), function (error, resultado) {
                    if (!error) {
                        resolve(true)
                    } else {
                        resolve(false)
                    }            
                })                
            })
        })
    }

    static async nombreUsuario(correo) {
        return new Promise (resolve => {
            //let nombreUsuario = `SELECT nombre FROM usuario WHERE correo = '${correo}'`;
            conexion.query(existeUsuario(correo), function (error, resultado) {
                if (resultado.length >= 1) {
                    resolve(resultado)
                } else {
                    resolve(false)
                }  
            })
        })
    }
}