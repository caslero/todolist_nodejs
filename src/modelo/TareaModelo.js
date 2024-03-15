import { conexion } from "../db/database.js";
import { idUsuario, guardarTarea, idUsuarioActivo, tareasDescendentes, tareasAscendentes, eliminarUnaTarea, eliminarTodasTareas, eliminarTareasMarcadas, cambiarEstatusClaseTarea, actualizarTarea } from "../sql/TareaSentencia.js";

export class TareaModelo {
    static async registrarNuevaTarea(tarea, usuarioActivo) {
        return new Promise (resolve => {
            let id = '';
            const pending = 'pending';
            const desmarcar = 'desmarcar';
            //let idUsuario = `SELECT id FROM usuario WHERE correo = '${usuarioActivo}'`;
            conexion.query(idUsuario(usuarioActivo), function (error, resultado) {                
                id = resultado[0].id;
                //let registrarTarea = `INSERT INTO tareas (tarea, id_usuario, estatus, clase) VALUES ('${tarea}', '${id}', 'pending', 'desmarcar')`;
                conexion.query(guardarTarea(tarea, id, pending, desmarcar), function (error, resultado) {
                    if (!error) {
                        resolve(true)
                    } else {
                        resolve(false)
                    }            
                })                
            })
        })
    }

    static async modeloTodasTareasDescendentes(correo) {
        return new Promise (resolve => {
            let id = '';
            //let idTarea = `SELECT id FROM usuario WHERE correo = '${correo}'`;
            conexion.query(idUsuarioActivo(correo), function (error, resultadoUsuario) {
                id = resultadoUsuario[0].id;
                //let iniciarSesion = `SELECT id, tarea, estatus, clase FROM tareas WHERE id_usuario = '${id}' order by tarea desc`;
                conexion.query(tareasDescendentes(id), function (error, resultado) {
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
            //let idTarea = `SELECT id FROM usuario WHERE correo = '${correo}'`;
            conexion.query(idUsuarioActivo(correo), function (error, resultadoUsuario) {
                id = resultadoUsuario[0].id;
                //let iniciarSesion = `SELECT id, tarea, estatus, clase FROM tareas WHERE id_usuario = '${id}' order by tarea asc`;
                conexion.query(tareasAscendentes(id), function (error, resultado) {
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
            //let deleteTareaIndividual = `DELETE FROM tareas WHERE id = '${id}'`
            conexion.query(eliminarUnaTarea(id), function (error, resultado) {
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
            //let deleteTareaTodas = `DELETE tareas FROM tareas JOIN usuario ON tareas.id_usuario = usuario.id WHERE usuario.correo = '${correo}'`;
            conexion.query(eliminarTodasTareas(correo), function (error, resultado) {
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
            //let deleteTareaTodas = `DELETE tareas FROM tareas JOIN usuario ON tareas.id_usuario = usuario.id WHERE usuario.correo = '${correo}' AND clase = 'marcar';`
            conexion.query(eliminarTareasMarcadas(correo), function (error, resultado) {
                if (resultado) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        })
    }

    static async modeloactualizarTareaEstatusClase(status, clase, id) {
        return new Promise (resolve => {            
            //let updateTareaIndividual = `UPDATE tareas SET estatus = '${status}', clase = '${clase}' WHERE id = '${id}'`
            conexion.query(cambiarEstatusClaseTarea(status, clase, id), function (error, resultado) {
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
            //let updateTarea = `UPDATE tareas SET tarea = '${tarea}' WHERE id = '${id}'`
            conexion.query(actualizarTarea, function (error, resultado) {
                if (resultado) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        })
    }
}