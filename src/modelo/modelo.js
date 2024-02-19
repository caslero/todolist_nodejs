import { conexion } from "../db/database.js";

export class UsuariosModelo {
    static async registrarNuevoUsuario(nombre, correo, clave) {
        return new Promise (resolve => {
           let registrarUsuario = `INSERT INTO usuario (nombre, correo, clave) VALUES ('${nombre}', '${correo}', '${clave}')`; 
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