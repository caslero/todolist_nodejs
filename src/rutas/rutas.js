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

//Esta direccion es con el middleware   adminUsuarios.revisarCookie,
rutas.get('/tareas', adminUsuarios.revisarCookie,  (req, res) => {
  res.sendFile(__dirname + process.env.LISTA_TAREAS)
})

rutas.get('/tareas/todas/descendentes', tareasControlador.mostrarTodasTareasDescendente)
rutas.get('/tareas/todas/ascendentes', tareasControlador.mostrarTodasTareasAscendente)
rutas.get(`/usuario_activo`, tareasControlador.mostrarUsuarioActivo);

rutas.post('/api/tareas', tareasControlador.postGuardarTareas);
rutas.post('/api/registro', adminUsuarios.usuarioRepetido, UsuariosControlador.postGuardarUsuarios);
rutas.post('/api/login', LoginControlador.postLogin);
rutas.post('/api/update-estatus-clase', tareasControlador.actualizarTareaEstatusClase)
rutas.post('/api/update-tarea', tareasControlador.actualizarTarea)

rutas.delete('/api/eliminar-individual/id', tareasControlador.eliminarTareaIndividual)
rutas.delete('/api/eliminar-todas', tareasControlador.eliminarTareaTodas)
rutas.delete('/api/eliminar-marcadas', tareasControlador.eliminarTareaMarcadas)
