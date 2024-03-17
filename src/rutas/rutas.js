import { Router } from "express";
import { UsuarioControlador } from "../controlador/UsuarioController.js";
import { LoginControlador } from "../controlador/LoginController.js";
import { TareaControlador } from "../controlador/TareaController.js";
import { AdminUsuario } from "../middleware/autorizar.js";
import { __dirname } from "../server.js";

export const rutas = Router();

/** Esta ruta /cerrar_sesion se encarga del cierre de la session */
rutas.get('/cerrar_sesion', (req, res) => {  
  res.clearCookie('jwt');
  res.clearCookie('jwts');
  res.redirect('/');     
});

/** / Esta es la ruta raiz del proyecto */
rutas.get('/', (req, res) => {
  res.sendFile(__dirname + process.env.INDEX);
});

/** /registro se encarga de mostrar la vista del registro de usuario */
rutas.get('/registro', (req, res) => {
  res.sendFile(__dirname + process.env.REGISTRAR_USUARIO);
});

/** /login se encarga de mostrar la vista para hacer login */
rutas.get('/login', (req, res) => {
  res.sendFile(__dirname + process.env.LOGIN_USUARIO); 
});

/** /validar/:url se encarga de recibir la url para validar el usuario */
rutas.get('/validar/:url', AdminUsuario.validarUsuarioToken, (req, res) => {  
  res.sendFile(__dirname + process.env.VALIDAR); 
});

/** /claves se encarga de mostrar la vista donde se envia el correo para que te
  envien el token de cambio de clave */
rutas.get('/claves', (req, res) => {
  res.sendFile(__dirname + process.env.CAMBIAR_CLAVE); 
});

/** /clavesCambiar/:url se encarga de recibir la url del token para el cambio de
  clave y muestra para cambiar la clave */
rutas.get('/clavesCambiar/:url', AdminUsuario.cambioClaveUsuario, (req, res) => {
  res.sendFile(__dirname + process.env.CLAVE_CAMBIADA); 
});

/** /tokenExpiro se encarga de mostrar la vista del token expirado */
rutas.get('/tokenExpiro', (req, res) => {
  res.sendFile(__dirname + process.env.TOKEN_EXPIRO); 
});

/** /tareas muestra la vista de tareas y tiene un middleware en caso de alquien
  intente entrar a la vista tareas sin antes haber iniciado sesion */
rutas.get('/tareas', AdminUsuario.revisarCookie,  (req, res) => {
  res.sendFile(__dirname + process.env.LISTA_TAREAS)
});

/** /tareas/todas/descendentes trae las tareas del usuario loggueado en orden
  descendente */
rutas.get('/tareas/todas/descendentes', AdminUsuario.revisarCookie, TareaControlador.mostrarTodasTareasDescendente)

/** /tareas/todas/descendentes trae las tareas del usuario loggueado en orden
  ascendente */
rutas.get('/tareas/todas/ascendentes', TareaControlador.mostrarTodasTareasAscendente)

/** /usuario_activo muestra el nombre del usuario que se loggueo */
rutas.get('/usuario_activo', TareaControlador.mostrarUsuarioActivo);


/** /api/tareas se encarga de guardar las nuevas tareas */
rutas.post('/api/tareas', TareaControlador.postGuardarTareas);

/** /api/registro se encarga de guardar los nuevos usuarios */
rutas.post('/api/registro', AdminUsuario.usuarioRepetido, UsuarioControlador.postGuardarUsuarios);

/** /api/login se encarga de hacer login */
rutas.post('/api/login', AdminUsuario.usuarioNoRegistrado, LoginControlador.postLogin);

/** /api/update-estatus-clase cambia el estatus y clase de las tareas */
rutas.post('/api/update-estatus-clase', TareaControlador.actualizarTareaEstatusClase);

/** /api/update-tarea cambia el nombre de una tarea */
rutas.post('/api/update-tarea', TareaControlador.actualizarTarea);

/** /api/cambiar-clave cambia la clave si el usuario esta loggueado */
rutas.post('/api/cambiar-clave', UsuarioControlador.cambiarClaveUsuario);

/** /api/claveCambiada cambia la clave del usuario mediante un token */
rutas.post('/api/claveCambiada', UsuarioControlador.cambioClaveUsuario);

/** /api/cambiar-clave-token se encarga de validar si un usuario existe para enviar
  el token para el cambio de clave */
rutas.post('/api/cambiar-clave-token', AdminUsuario.confirmarUsuarioExiste, UsuarioControlador.enviarTokenCambiarClave);


/** /api/eliminar-individual/id se encarga de eliminar una tarea individual */
rutas.delete('/api/eliminar-individual/id', TareaControlador.eliminarTareaIndividual);

/** /api/eliminar-todas se encarga de eliminar todas las tareas */
rutas.delete('/api/eliminar-todas', TareaControlador.eliminarTareaTodas);

/** /api/eliminar-marcadas se encarga de eliminar solo las tareas marcadas */
rutas.delete('/api/eliminar-marcadas', TareaControlador.eliminarTareaMarcadas);