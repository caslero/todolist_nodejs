import { TareaModelo } from "../modelo/TareaModelo.js";
import { UsuarioModelo } from "../modelo/UsuarioModelo.js";
import jsonwebtoken from "jsonwebtoken";

/** TareaControlador se encarga de manejar todos los procesos referentes a la
  lista de tareas */
export class TareaControlador {
  /** mostrarUsuarioActivo se encarga de enviar al front-end el nombre del usuario
    que esta activo en ese momento  */
  static async mostrarUsuarioActivo(req, res) {
    try {
      const cookieJWT = req.headers.cookie.split("; ").find((cookie) => cookie.startsWith("jwt=")).slice(4);
      const decodificada = jsonwebtoken.verify(
        cookieJWT,
        process.env.JWT_SECRET
      );

      const correo = decodificada.correo;
      let resultado = await UsuarioModelo.usuarioExistente(correo);

      if (resultado) {
        return res.json({
          status: "Ok",
          nombre: resultado,
        });
      }
    } catch (error) {
      return res.redirect("/");
    }
  }

  /** postGuardarTareas se encarga de guardar en la BD una nueva tarea */
  static async postGuardarTareas(req, res) {
    const cookie = req.headers.cookie;
    const cookieJWT = cookie.split("; ").find((cookie) => cookie.startsWith("jwt=")).slice(4);
    const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);
    const idUsuario = decodificada.correo;
    const tarea = req.body.tarea;

    let resultado = await TareaModelo.registrarNuevaTarea(tarea, idUsuario);

    if (resultado) {
      return res.status(201).send({
        status: "ok",
      });
    } else {
      return res.status(201).send({
        status: "Error",
        message: "Tarea no guardada",
      });
    }
  }

  /** mostrarTodasTareasDescendente envia al front-end todas las tareas de un 
    determinado usuario en orden descendente */
  static async mostrarTodasTareasDescendente(req, res) {
    const cookie = req.headers.cookie;
    if (!cookie) {
      return res.status(400).send({
        status: 'error',
        message: 'cookie vacia'
      })
    }
    const cookieJWT = cookie.split("; ").find((cookie) => cookie.startsWith("jwt=")).slice(4);
    const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);
    const correo = decodificada.correo;

    let resultado2 = await TareaModelo.modeloIdUsuarioActivo(correo);
    let id = resultado2[0].id

    let resultado = await TareaModelo.modeloTodasTareasDescendentes(id);
    if (resultado) {
      return res.json({
        tareasDescendentes: resultado,
      });
    } else {
      return res.json({
        advertencia: "sin tareas",
      });
    }
  }

   /** mostrarTodasTareasAscendente envia al front-end todas las tareas de un 
    determinado usuario en orden ascendente */
  static async mostrarTodasTareasAscendente(req, res) {
    const cookie = req.headers.cookie;
    if (!cookie) {
      return res.status(400).send({
        status: 'error',
        message: 'cookie vacia'
      })
    }
    const cookieJWT = cookie.split("; ").find((cookie) => cookie.startsWith("jwt=")).slice(4);
    const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);
    const correo = decodificada.correo;

    let resultado2 = await TareaModelo.modeloIdUsuarioActivo(correo);
    let id = resultado2[0].id

    let resultado = await TareaModelo.modeloTodasTareasAscendentes(id);
    if (resultado) {
      return res.json({
        tareasAscendentes: resultado,
      });
    } else {
      return res.json({
        advertencia: "sin tareas",
      });
    }
  }

  /** eliminarTareaIndividual elimina una tarea del usuario que este activo */
  static async eliminarTareaIndividual(req, res) {
    const id = req.body.id;
    let resultado = await TareaModelo.modeloEliminarTareaIndividual(id);
    if (resultado) {
      return res.json({
        status: "eliminada",
      });
    }
  }

  /** eliminarTareaTodas elimina todas las tareas del usuario que este activo */
  static async eliminarTareaTodas(req, res) {
    const cookieJWT = req.headers.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("jwt="))
      .slice(4);
    const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);
    const correo = decodificada.correo;

    let resultado = await TareaModelo.modeloEliminarTareaTodas(correo);
    if (resultado) {
      return res.json({
        status: "eliminadas",
      });
    }
  }

  /** eliminarTareaMarcadas elimina todas las tareas marcadas del usuario que
   este activo */
  static async eliminarTareaMarcadas(req, res) {
    const cookieJWT = req.headers.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("jwt="))
      .slice(4);
    const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);
    const correo = decodificada.correo;

    let resultado = await TareaModelo.modeloEliminarTareaMarcadas(correo);
    if (resultado) {
      return res.json({
        status: "eliminadas",
      });
    }
  }

  /** actualizarTareaEstatusClase cambia el estatus y clase de una tarea */
  static async actualizarTareaEstatusClase(req, res) {
    const id = req.body.id;
    const status = req.body.status;
    const clase = req.body.clase;

    let resultado = await TareaModelo.modeloactualizarTareaEstatusClase(id, status, clase);
    if (resultado) {
      return res.json({
        status: "actualizada",
      });
    }
  }

  /** actualizarTarea cambia el nombre de una tarea */
  static async actualizarTarea(req, res) {
    const id = req.body.id;
    const tarea = req.body.tarea;
    let resultado = await TareaModelo.modeloactualizarTarea(id, tarea);
    if (resultado) {
      return res.json({
        status: "actualizada",
      });
    }
  }
}
