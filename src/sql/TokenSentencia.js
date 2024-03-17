/** Todas estas funciones representan las sentencias SQL que se utilizan en
    TokenModelo.js */

/** La funcion tokenCambiarClave se encarga de traernos el id del usuario que
    solicito el token para cambiar la clave */
export function tokenCambiarClave(token) {
    let tokenCambioClave = `SELECT id_usuario FROM tokens WHERE token = '${token}'`;
    return tokenCambioClave;
}

/** La funcion tokenValido se encarga de mostrarnos el token valido */
export function tokenValido(id) {
    let ultimoToken = `SELECT * FROM tokens WHERE id_usuario = '${id}'`;
    return ultimoToken;
}

/** La funcion claveCambiada se encarga de cambiar la clave del usuario */
export function claveCambiadaExitosa(claveN, id) {
    let updateClave = `UPDATE usuario SET clave = '${claveN}' WHERE id = '${id}'`;
    return updateClave;
}