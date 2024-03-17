import { Router } from "express";
import { UsuarioControlador } from "../controlador/UsuarioController.js";
import { LoginControlador } from "../controlador/LoginController.js";
import { TareaControlador } from "../controlador/TareaController.js";
import { AdminUsuario } from "../middleware/autorizar.js";
import { __dirname } from "../server.js";

export const rutas = Router();

rutas.get('/cerrar_sesion', (req, res) => {  
  res.clearCookie('jwt');
  res.clearCookie('jwts');
  res.redirect('/');     
});

rutas.get('/', (req, res) => {
  res.sendFile(__dirname + process.env.INDEX);
});

rutas.get('/registro', (req, res) => {
  res.sendFile(__dirname + process.env.REGISTRAR_USUARIO);
});
    
rutas.get('/login', (req, res) => {
  res.sendFile(__dirname + process.env.LOGIN_USUARIO); 
});

rutas.get('/validar/:url', AdminUsuario.validarUsuarioToken, (req, res) => {  
  res.sendFile(__dirname + process.env.VALIDAR); 
});

rutas.get('/claves', (req, res) => {
  res.sendFile(__dirname + process.env.CAMBIAR_CLAVE); 
});

rutas.get('/clavesCambiar/:url', AdminUsuario.cambioClaveUsuario, (req, res) => {
  res.sendFile(__dirname + process.env.CLAVE_CAMBIADA); 
});

rutas.get('/tokenExpiro', (req, res) => {
  res.sendFile(__dirname + process.env.TOKEN_EXPIRO); 
});

//Esta direccion es con el middleware   AdminUsuario.revisarCookie,
rutas.get('/tareas', AdminUsuario.revisarCookie,  (req, res) => {
  res.sendFile(__dirname + process.env.LISTA_TAREAS)
});

rutas.get('/tareas/todas/descendentes', AdminUsuario.revisarCookie, TareaControlador.mostrarTodasTareasDescendente)
rutas.get('/tareas/todas/ascendentes', TareaControlador.mostrarTodasTareasAscendente)
rutas.get('/usuario_activo', TareaControlador.mostrarUsuarioActivo);

rutas.post('/api/tareas', TareaControlador.postGuardarTareas);
rutas.post('/api/registro', AdminUsuario.usuarioRepetido, UsuarioControlador.postGuardarUsuarios);
rutas.post('/api/login', AdminUsuario.usuarioNoRegistrado, LoginControlador.postLogin);
rutas.post('/api/update-estatus-clase', TareaControlador.actualizarTareaEstatusClase);
rutas.post('/api/update-tarea', TareaControlador.actualizarTarea);
rutas.post('/api/cambiar-clave', UsuarioControlador.cambiarClaveUsuario);
rutas.post('/api/claveCambiada', UsuarioControlador.cambioClaveUsuario);
rutas.post('/api/cambiar-clave-token', AdminUsuario.confirmarUsuarioExiste, UsuarioControlador.enviarTokenCambiarClave);

rutas.delete('/api/eliminar-individual/id', TareaControlador.eliminarTareaIndividual);
rutas.delete('/api/eliminar-todas', TareaControlador.eliminarTareaTodas);
rutas.delete('/api/eliminar-marcadas', TareaControlador.eliminarTareaMarcadas);
