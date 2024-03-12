import { Router } from "express";
import { LoginControlador, UsuariosControlador, tareasControlador } from "../controlador/controler.js";
import { adminUsuarios } from "../middleware/autorizar.js";
import { __dirname } from "../server.js";

export const rutas = Router();

rutas.get('/cerrar_sesion', (req, res) => {  
  res.clearCookie('jwt');
  res.clearCookie('jwts');
  res.redirect('/');     
});

rutas.get('/', (req, res) => {
  res.sendFile(__dirname + process.env.INDEX);
})

rutas.get('/registro', (req, res) => {
  res.sendFile(__dirname + process.env.REGISTRAR_USUARIO);
});
    
rutas.get('/login', (req, res) => {
  res.sendFile(__dirname + process.env.LOGIN_USUARIO); 
});

rutas.get('/validar/:url', adminUsuarios.validarUsuarioToken, (req, res) => {  
  res.sendFile(__dirname + process.env.VALIDAR); 
});




rutas.get('/claves', (req, res) => {
  res.sendFile(__dirname + process.env.CAMBIAR_CLAVE); 
});

rutas.get('/clavesCambiar/:url', adminUsuarios.cambioClaveUsuario, (req, res) => {
  res.sendFile(__dirname + process.env.CLAVE_CAMBIADA); 
});


rutas.get('/tokenExpiro', (req, res) => {
  res.sendFile(__dirname + process.env.TOKEN_EXPIRO); 
});


rutas.post('/api/claveCambiada', UsuariosControlador.cambioClaveUsuario)



//Esta direccion es con el middleware   adminUsuarios.revisarCookie,
rutas.get('/tareas', adminUsuarios.revisarCookie,  (req, res) => {
  res.sendFile(__dirname + process.env.LISTA_TAREAS)
})

rutas.get('/tareas/todas/descendentes', tareasControlador.mostrarTodasTareasDescendente)
rutas.get('/tareas/todas/ascendentes', tareasControlador.mostrarTodasTareasAscendente)
rutas.get('/usuario_activo', tareasControlador.mostrarUsuarioActivo);

rutas.post('/api/tareas', tareasControlador.postGuardarTareas);
rutas.post('/api/registro', adminUsuarios.usuarioRepetido, UsuariosControlador.postGuardarUsuarios);
rutas.post('/api/login', adminUsuarios.usuarioNoRegistrado, LoginControlador.postLogin);
rutas.post('/api/update-estatus-clase', tareasControlador.actualizarTareaEstatusClase)
rutas.post('/api/update-tarea', tareasControlador.actualizarTarea)
rutas.post('/api/cambiar-clave', UsuariosControlador.cambiarClaveUsuario)




rutas.post('/api/cambiar-clave-token', adminUsuarios.confirmarUsuarioExiste, UsuariosControlador.enviarTokenCambiarClave)




rutas.delete('/api/eliminar-individual/id', tareasControlador.eliminarTareaIndividual)
rutas.delete('/api/eliminar-todas', tareasControlador.eliminarTareaTodas)
rutas.delete('/api/eliminar-marcadas', tareasControlador.eliminarTareaMarcadas)
