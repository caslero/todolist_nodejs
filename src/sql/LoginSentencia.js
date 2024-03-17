/** Todas estas funciones representan las sentencias SQL que se utilizan en
    LoginModelo.js */

/** La funcion validarClave se encarga de traernos la clave de un usuario X con
    la finalidad de comparar las claves para poder iniciar sesion */
export function validarClave(correo) {
    let mostrarClave = `SELECT clave FROM usuario WHERE correo = '${correo}'`;
    return mostrarClave;
}

/** La funcion validarTokenUsuario se encarga de traernos todos los tokens que
    estan guardados en la BD */
export function validarTokenUsuario() {
    let validarTokenDelUsuario = `SELECT validarUsuario FROM usuario`;
    return validarTokenDelUsuario;
}

/** La funcion usuarioAutenticado se encarga de verificar el usuario */
export function usuarioAutenticado(token) {
    let authUsuario = `UPDATE usuario SET autenticar = 'true' WHERE validarUsuario = '${token}'`
    return authUsuario;
}

/** La funcion verificarAuthUsuario se encarga de consultar si el usuario se
    valido mediante el correo o no */
export function verificarAuthUsuario(correo) {
    let verificandoUsuario = `SELECT autenticar FROM usuario WHERE correo = '${correo}'`;
    return verificandoUsuario;
}

/** La funcion reenviarToken se encarga de consultar el token del usuario que
    que intenta hacer login, porque en caso de no estar autenticado reenviar
    ese token con la finalidad de verificarse */
export function reenviarToken(correo) {
    let renviarToken = `SELECT validarUsuario FROM usuario WHERE correo = '${correo}'`;
    return renviarToken;
}