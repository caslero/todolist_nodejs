import { TareaModelo } from "../modelo/TareaModelo.js";
import { UsuarioModelo } from "../modelo/UsuarioModelo.js";
import jsonwebtoken from "jsonwebtoken";

export class TareaControlador {
    static async mostrarUsuarioActivo(req, res) {
      try {
        const cookieJWT = req.headers.cookie.split("; ").find((cookie) => cookie.startsWith("jwt=")).slice(4);
        const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);
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
  
    static async mostrarTodasTareasDescendente(req, res) {
      const cookieJWT = req.headers.cookie.split("; ").find((cookie) => cookie.startsWith("jwt=")).slice(4);
      const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);
      const correo = decodificada.correo;
  
      let resultado = await TareaModelo.modeloTodasTareasDescendentes(correo);
      if (resultado) {
        return res.json({
          tareasDescendentes: resultado,
        });
      } else {
        return res.json({
          advertencia: "sin tareas"
        });
      }
    }
  
    static async mostrarTodasTareasAscendente(req, res) {
      const cookieJWT = req.headers.cookie.split("; ").find((cookie) => cookie.startsWith("jwt=")).slice(4);
      const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);
      const correo = decodificada.correo;
  
      let resultado = await TareaModelo.modeloTodasTareasAscendentes(correo);
      if (resultado) {
        return res.json({
          tareasAscendentes: resultado
        });
      } else {
        return res.json({
          advertencia: "sin tareas"
        });
      }
    }
  
    static async eliminarTareaIndividual(req, res) {
      const id = req.body.id;
      let resultado = await TareaModelo.modeloEliminarTareaIndividual(id);
      if (resultado) {
        return res.json({
          status: "eliminada"
        });
      }
    }
  
    static async eliminarTareaTodas(req, res) {
      const cookieJWT = req.headers.cookie.split("; ").find((cookie) => cookie.startsWith("jwt=")).slice(4);
      const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);
      const correo = decodificada.correo;
  
      let resultado = await TareaModelo.modeloEliminarTareaTodas(correo);
      if (resultado) {
        return res.json({
          status: "eliminadas"
        });
      }
    }
  
    static async eliminarTareaMarcadas(req, res) {
      const cookieJWT = req.headers.cookie.split("; ").find((cookie) => cookie.startsWith("jwt=")).slice(4);
      const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);
      const correo = decodificada.correo;
  
      let resultado = await TareaModelo.modeloEliminarTareaMarcadas(correo);
      if (resultado) {
        return res.json({
          status: "eliminadas"
        });
      }
    }
  
    static async actualizarTareaEstatusClase(req, res) {
      const id = req.body.id;
      const status = req.body.status;
      const clase = req.body.clase;
  
      let resultado = await TareaModelo.modeloactualizarTareaEstatusClase(id, status, clase);
      if (resultado) {
        return res.json({
          status: "actualizada"
        });
      }
    }
  
    static async actualizarTarea(req, res) {
      const id = req.body.id;
      const tarea = req.body.tarea;
  
      let resultado = await TareaModelo.modeloactualizarTarea(id, tarea);
      if (resultado) {
        return res.json({
          status: "actualizada"
        });
      }
    }
}