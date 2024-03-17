import { conexion } from "../db/database.js";
import { idUsuario, guardarTarea, tareasDescendentes, tareasAscendentes, eliminarUnaTarea, eliminarTodasTareas, eliminarTareasMarcadas, cambiarEstatusClaseTarea, actualizarTarea } from "../sql/TareaSentencia.js";

/** La clase TareaModelo contiene todos los resultado de las sentencias sql que
    se hacen para las tareas */
export class TareaModelo {
  /** registrarNuevaTarea se encarga de guardar una tarea para un usuario que
    haya iniciado sesion */
  static async registrarNuevaTarea(tarea, usuarioActivo) {
    return new Promise((resolve) => {
      let id = "";
      const pending = "pending";
      const desmarcar = "desmarcar";
      conexion.query(idUsuario(usuarioActivo), function (error, resultado) {
        id = resultado[0].id;
        conexion.query(
          guardarTarea(tarea, id, pending, desmarcar),
          function (error, resultado) {
            if (!error) {
              resolve(true);
            } else {
              resolve(false);
            }
          }
        );
      });
    });
  }

  /** modeloIdUsuarioActivo trae el id del usuario que esta guardado en las tareas */
  static async modeloIdUsuarioActivo(correo) {
    return new Promise((resolve) => {
      conexion.query(idUsuario(correo), function (error, resultado) {
        if (resultado.length != 0) {
          resolve(resultado);
        } else {
          resolve(false);
        }
      });
    });
  }

  /** modeloTodasTareasDescendentes consulta todas las tareas del usuario activo
    y las trae en orden descendente */
  static async modeloTodasTareasDescendentes(id) {
    return new Promise((resolve) => {
      conexion.query(tareasDescendentes(id), function (error, resultado) {
        if (resultado.length != 0) {
          resolve(resultado);
        } else {
          resolve(false);
        }
      });
    });
  }

  /** modeloTodasTareasAscendentes consulta todas las tareas del usuario activo
    y las trae en orden ascendente */
  static async modeloTodasTareasAscendentes(id) {
    return new Promise((resolve) => {
      conexion.query(tareasAscendentes(id), function (error, resultado) {
        if (resultado.length != 0) {
          resolve(resultado);
        } else {
          resolve(false);
        }
      });
    });
  }

  /** modeloEliminarTareaIndividual se encarga de eliminar una tarea que el usuario
    logueado seleccione */
  static async modeloEliminarTareaIndividual(id) {
    return new Promise((resolve) => {
      conexion.query(eliminarUnaTarea(id), function (error, resultado) {
        if (resultado) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  /** modeloEliminarTareaTodas se encarga de eliminar todas las tareas que el usuario
    logueado tenga */
  static async modeloEliminarTareaTodas(correo) {
    return new Promise((resolve) => {
        conexion.query(eliminarTodasTareas(correo), function (error, resultado) {
            if (resultado) {
            resolve(true);
            } else {
            resolve(false);
            }
        });
    });
  }

  /** modeloEliminarTareaMarcadas se encarga de eliminar todas las tareas que esten
    marcadas por el usuario logueado */
  static async modeloEliminarTareaMarcadas(correo) {
    return new Promise((resolve) => {
        conexion.query(eliminarTareasMarcadas(correo), function (error, resultado) {
            if (resultado) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
  }

  /** modeloactualizarTareaEstatusClase se encarga de cambiarle es estatus y clase
    a las tareas que el usuario logueado seleccione */
  static async modeloactualizarTareaEstatusClase(id, status, clase) {
    return new Promise((resolve) => {
        conexion.query(cambiarEstatusClaseTarea(id, status, clase), function (error, resultado) {
          if (resultado.length != 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }

  /** modeloactualizarTareaEstatusClase se encarga de cambiarle es estatus y clase
    a las tareas que el usuario logueado seleccione */
  static async modeloactualizarTarea(id, tarea) {
    return new Promise((resolve) => {
      conexion.query(actualizarTarea(id, tarea), function (error, resultado) {
        if (resultado) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
}
