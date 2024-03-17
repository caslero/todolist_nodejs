/** Todas estas funciones representan las sentencias SQL que se utilizan en
    UsuarioModelo.js
 */

/** La funcion guardarUsuario se encarga de registrar un usuario */
export function guardarUsuario(nombre, correo, clave, validarUsuario, falso) {
    let registrarUsuario = `INSERT INTO usuario(nombre, correo, clave, validarUsuario, autenticar) VALUES ('${nombre}', '${correo}', '${clave}', '${validarUsuario}', '${falso}')`; 
    return registrarUsuario;
}

/** La funcion existeUsuario se encarga de traernos el nombre de usuario en caso
    de que el usuario exista */
export function existeUsuario(correo) {
    let existeElUsuario = `SELECT nombre FROM usuario WHERE correo = '${correo}'`;   
    return existeElUsuario;
}

/** La funcion usuarioEstaValidado se encarga de traernos el autenticar de
    usuario en caso de que el usuario exista */
export function usuarioEstaValidado(correo) {
    let usuarioValidado = `SELECT autenticar FROM usuario WHERE correo = '${correo}'`;   
    return usuarioValidado;
}

/** La funcion verClave consulta la BD, extrae la clave del usuario, esto con
    la finalidad de cambiar la clave desde una clave ya existente */
export function verClave(correo) {
    let mostrarClave = `SELECT clave FROM usuario WHERE correo = '${correo}'`;  
    return mostrarClave;
}

/** La funcion updateClave se encarga de cambiar la clave */
export function updateClave(clave, correo) {
    let actualizarClave = `UPDATE usuario SET clave = '${clave}' WHERE correo = '${correo}'`;
    return actualizarClave;
}

/** La funcion obtenerIdUsuario se encarga de traenos un id de un usuario X */
export function obtenerIdUsuario(correo) {
    let idUsuario = `SELECT id FROM usuario WHERE correo = '${correo}'`;
    return idUsuario;
}

/** La funcion guardarTokenCambioClaves se encarga de guardar un token para cambiar
    la clave mediante un link, en la tabla se guarda un id, id_usuario y el token */
export function guardarTokenCambioClaves(id, validarUsuario) {
    let guardarTokenCambioClave = `INSERT INTO tokens (id_usuario, token) VALUES ('${id}', '${validarUsuario}')`;
    return guardarTokenCambioClave;
}

