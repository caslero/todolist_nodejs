/** Todas estas funciones representan las sentencias SQL que se utilizan en
    TareaModelo.js */

/** La funcion idUsuario se encarga de traernos el id del usuario que ha iniciado
    sesion */
export function idUsuario(usuarioActivo) {
    let id_usuario = `SELECT id FROM usuario WHERE correo = '${usuarioActivo}'`;
    return id_usuario;
}

/** La funcion guardarTarea se encarga de guardar una nueva tarea */
export function guardarTarea(tarea, id, pending, desmarcar) {    
    let registrarTarea = `INSERT INTO tareas (tarea, id_usuario, estatus, clase) VALUES ('${tarea}', '${id}', '${pending}', '${desmarcar}')`;
    return registrarTarea;
}

/** La funcion idUsuarioActivo se encarga de traernos el id del usuario */
export function idUsuarioActivo(correo) {
    let id_usuario = `SELECT id FROM usuario WHERE correo = '${correo}'`;
    return id_usuario;
}

/** La funcion tareasDescendentes se encarga de traernos todas las tareas de
    un determinado usuario en orden descendente */
export function tareasDescendentes(id) {
    let tareaDescendente = `SELECT id, tarea, estatus, clase FROM tareas WHERE id_usuario = '${id}' order by tarea desc`;
    return tareaDescendente;
}

/** La funcion tareasAscendentes se encarga de traernos todas las tareas de
    un determinado usuario en orden descendente */
export function tareasAscendentes(id) {
    let tareaAscendente = `SELECT id, tarea, estatus, clase FROM tareas WHERE id_usuario = '${id}' order by tarea asc`;
    return tareaAscendente;
}

/** La funcion eliminarUnaTarea se encarga de eliminar una sola tarea seleccionada
    por el usuario que esta activo en ese momento */
export function eliminarUnaTarea(id) {
    let deleteTareaIndividual = `DELETE FROM tareas WHERE id = '${id}'`;
    return deleteTareaIndividual;
}

/** La funcion eliminarTodasTareas se encarga de eliminar todas las tareas del
    usuario que esta activo en ese momento */
export function eliminarTodasTareas(correo) {
    let deleteTareaTodas = `DELETE tareas FROM tareas JOIN usuario ON tareas.id_usuario = usuario.id WHERE usuario.correo = '${correo}'`;
    return deleteTareaTodas;
}

/** La funcion eliminarTareasMarcadas se encarga de eliminar todas las tareas que
    esten marcadas en ese momento */
export function eliminarTareasMarcadas(correo) {
    let deleteTareasMarcadas = `DELETE tareas FROM tareas JOIN usuario ON tareas.id_usuario = usuario.id WHERE usuario.correo = '${correo}' AND clase = 'marcar'`
    return deleteTareasMarcadas;
}

/** La funcion cambiarEstatusClaseTarea se encarga de cambiar el status y clase
    de una tarea determinada */
export function cambiarEstatusClaseTarea(status, clase, id) {
    let updateEstatusClaseTarea = `UPDATE tareas SET estatus = '${status}', clase = '${clase}' WHERE id = '${id}'`;
    return updateEstatusClaseTarea;
}

/** La funcion actualizarTarea se encarga de cambiar el nombre de la tarea */
export function actualizarTarea(tarea, id) {
    let updateTarea = `UPDATE tareas SET tarea = '${tarea}' WHERE id = '${id}'`;
    return updateTarea;
}
