import { conexion } from "../db/database.js";

export class UsuariosModelo {
    static async registrarNuevoUsuario(nombre, correo, clave, validarUsuario) {
        return new Promise (resolve => {
           let registrarUsuario = `INSERT INTO usuario (nombre, correo, clave, validarUsuario, autenticar) VALUES ('${nombre}', '${correo}', '${clave}', '${validarUsuario}', 'false')`; 
           conexion.query(registrarUsuario, function (error, resultado) {
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
            let verUsuario = `SELECT nombre FROM usuario where correo = '${correo}'`;            
            conexion.query(verUsuario, function (error, resultado) {
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
            let verClave = `SELECT clave FROM usuario where correo = '${correo}'`;            
            conexion.query(verClave, function (error, resultado) {
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
            let updateClave = `UPDATE usuario SET clave = '${clave}' WHERE correo = '${correo}'`            
            conexion.query(updateClave, function (error, resultado) {
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
            let verUsuario = `SELECT nombre FROM usuario where correo = '${correo}'`;            
            conexion.query(verUsuario, function (error, resultado) {
                if (resultado.length >= 1) {
                    resolve(true);                
                } else {
                    resolve(false)
                }                          
            })
        })
    }

    static async cambiarUsuarioClaveToken(correo){
        return new Promise (resolve => {
            let verUsuario = `SELECT nombre FROM usuario WHERE correo = '${correo}'`;            
            conexion.query(verUsuario, function (error, resultado) {
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
            let idUsuario = `SELECT id FROM usuario WHERE correo = '${correo}'`;
            conexion.query(idUsuario, function (error, resultado) {
                resultado.forEach(element => {
                    id = element.id;
                    let guardarTokenCambioClaves = `INSERT INTO tokens (id_usuario, token) VALUES ('${id}', '${validarUsuario}')`;
                    conexion.query(guardarTokenCambioClaves, function (error, resultado) {
                        if (!error) {
                            resolve(true)
                        } else {
                            resolve(false)
                        }            
                    })
                });
            })
        })
    }

    static async nombreUsuario(correo) {
        return new Promise (resolve => {
            let nombreUsuario = `SELECT nombre FROM usuario WHERE correo = '${correo}'`;
            conexion.query(nombreUsuario, function (error, resultado) {
                if (resultado.length >= 1) {
                    resolve(resultado)
                } else {
                    resolve(false)
                }  
            })
        })
    }
}

export class LoginModelo {
    static async modeloValidarClave(correo) {
        let resultado = '';
        return new Promise (resolve => {           
            let validarClave = `SELECT clave FROM usuario WHERE correo = '${correo}'`;
            conexion.query(validarClave, async function (error, resul) {                
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
            let validarTokenUsuario = `SELECT validarUsuario FROM usuario`;
            conexion.query(validarTokenUsuario, async function (error, resultado) {
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
            let updateTarea = `UPDATE usuario SET autenticar = 'true' WHERE validarUsuario = '${token}'`
            conexion.query(updateTarea, function (error, resultado) {
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
            let validarTokenUsuario = `SELECT autenticar FROM usuario WHERE correo = '${correo}'`;
            conexion.query(validarTokenUsuario, async function (error, resul) {                
                if (resul.length >= 1) { 
                    resultado = resul[0].autenticar;
                    resolve(resultado)
                } else {
                    resolve(false)
                }
            })
        })
    }    
}

export class tareasModelo {
    static async registrarNuevaTarea(tarea, usuarioActivo) {
        return new Promise (resolve => {
            let id = '';
            let idUsuario = `SELECT id FROM usuario WHERE correo = '${usuarioActivo}'`;
            conexion.query(idUsuario, function (error, resultado) {
                resultado.forEach(element => {
                    id = element.id;
                    let registrarTarea = `INSERT INTO tareas (tarea, id_usuario, estatus, clase) VALUES ('${tarea}', '${id}', 'pending', 'desmarcar')`;
                    conexion.query(registrarTarea, function (error, resultado) {
                        if (!error) {
                            resolve(true)
                        } else {
                            resolve(false)
                        }            
                    })
                });
            })
        })
    }

    static async modeloTodasTareasDescendentes(correo) {
        return new Promise (resolve => {
            let id = '';
            let idTarea = `SELECT id FROM usuario WHERE correo = '${correo}'`;
            conexion.query(idTarea, function (error, resultadoUsuario) {
                id = resultadoUsuario[0].id;
                let iniciarSesion = `SELECT id, tarea, estatus, clase FROM tareas WHERE id_usuario = '${id}' order by tarea desc`;
                conexion.query(iniciarSesion, function (error, resultado) {
                    if (resultado.length != 0) {
                        resolve(resultado)                    
                    } else {
                        resolve(false)
                    }
                })
            })
        })
    }

    static async modeloTodasTareasAscendentes(correo) {
        return new Promise (resolve => {
            let id = '';
            let idTarea = `SELECT id FROM usuario WHERE correo = '${correo}'`;
            conexion.query(idTarea, function (error, resultadoUsuario) {
                id = resultadoUsuario[0].id;
                let iniciarSesion = `SELECT id, tarea, estatus, clase FROM tareas WHERE id_usuario = '${id}' order by tarea asc`;
                conexion.query(iniciarSesion, function (error, resultado) {
                    if (resultado.length != 0) {
                        resolve(resultado)                    
                    } else {
                        resolve(false)
                    }
                })
            })
        })
    }

    static async modeloEliminarTareaIndividual(id) {
        return new Promise (resolve => {
            let deleteTareaIndividual = `DELETE FROM tareas WHERE id = '${id}'`
            conexion.query(deleteTareaIndividual, function (error, resultado) {
                if (resultado) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        })
    }

    static async modeloEliminarTareaTodas(correo) {
        return new Promise (resolve => {
            let deleteTareaTodas = `DELETE tareas FROM tareas JOIN usuario ON tareas.id_usuario = usuario.id WHERE usuario.correo = '${correo}'`;
            conexion.query(deleteTareaTodas, function (error, resultado) {
                if (resultado) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        })
    }

    static async modeloEliminarTareaMarcadas(correo) {
        return new Promise (resolve => {
            let deleteTareaTodas = `DELETE tareas FROM tareas JOIN usuario ON tareas.id_usuario = usuario.id WHERE usuario.correo = '${correo}' AND clase = 'marcar';`
            conexion.query(deleteTareaTodas, function (error, resultado) {
                if (resultado) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        })
    }

    static async modeloactualizarTareaEstatusClase(id, status, clase) {
        return new Promise (resolve => {            
            let updateTareaIndividual = `UPDATE tareas SET estatus = '${status}', clase = '${clase}' WHERE id = '${id}'`
            conexion.query(updateTareaIndividual, function (error, resultado) {
                if (resultado) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        })
    }

    static async modeloactualizarTarea(id, tarea) {
        return new Promise (resolve => {            
            let updateTarea = `UPDATE tareas SET tarea = '${tarea}' WHERE id = '${id}'`
            conexion.query(updateTarea, function (error, resultado) {
                if (resultado) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        })
    }
}


export class TokensModelos {
    static async cambiarClaveToken(token) {
        return new Promise (resolve => {            
            let tokenCambiarClave = `SELECT id_usuario FROM tokens WHERE token = '${token}'`
            conexion.query(tokenCambiarClave, function (error, resultado) {
                if (resultado.length >= 1) {
                    resolve(resultado)
                } else {
                    resolve(false)
                }
            })
        })
    }

    static async claveCambiar(token) {
        return new Promise (resolve => {            
            let claveCambiadas = `SELECT id_usuario FROM tokens WHERE token = '${token}'`
            conexion.query(claveCambiadas, function (error, resultado) {
                if (resultado.length >= 1) {
                    resolve(resultado)
                } else {
                    resolve(false)
                }
            })
        })
    }






    static async ultimoToken(id) {
        return new Promise (resolve => {            
            let ultimoTokens = `SELECT * FROM tokens WHERE id_usuario = '${id}'`
            conexion.query(ultimoTokens, function (error, resultado) {
                if (resultado.length != 0) {
                    resolve(resultado)
                } else {
                    resolve(false)
                }
            })
        })
    }



    static async claveCambiada(id, claveN) {
        return new Promise (resolve => {            
            let updateClave = `UPDATE usuario SET clave = '${claveN}' WHERE id = '${id}'`
            conexion.query(updateClave, function (error, resultado) {
                if (resultado) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        })
    }
}