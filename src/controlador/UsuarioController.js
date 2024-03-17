import { UsuarioModelo } from "../modelo/UsuarioModelo.js";
import { TokensModelos } from "../modelo/TokenModelo.js";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { sendMail, sendMailCambiarClave } from "../config/emailer.js";
import { tokenValidarUsuario } from "../config/emailer.js";

/** validarUsuario recibe el resultado de la funcion tokenValidarUsuario que en
  este caso lo que hace es generar un token que se guarda en la BD con la finalidad
  de validar el usuario recien registrado */
export const validarUsuario = tokenValidarUsuario(10);

/** La clase UsuarioControlador se encarga de los procesos que hace el usuario */
export class UsuarioControlador {
  /** postGuardarUsuarios se encarga de guardar un nuevo usuario en caso de
    cumplirse todas las condiciones */
  static async postGuardarUsuarios(req, res) {
    const nombre = req.body.nombre;
    const correo = req.body.correo;
    const clave = req.body.clave;
    const clave2 = req.body.clave2;
    const encriptado = await bcryptjs.genSalt(5);
    const claveEncriptada = await bcryptjs.hash(clave, encriptado);

    if (clave != clave2) {
      return res.status(400).send({
        status: "Error",
        message: "Claves diferentes",
      });
    }

    if (clave.length < 5 || clave.length > 16) {
      return res.status(400).send({
        status: "Error",
        message: "Entre 5 y 16 caracteres",
      });
    }

    let resultado = await UsuarioModelo.registrarNuevoUsuario(
      nombre,
      correo,
      claveEncriptada,
      validarUsuario
    );
    if (resultado) {
      sendMail(correo, nombre, validarUsuario);
      return res.status(201).send({
        status: "ok",
        message: `Usuario ${nombre} registrado `,
        redirect: "/login",
      });
    } else {
      return res.status(400).send({
        status: "Error",
        message: "Registro Fallido",
      });
    }
  }

  /** cambiarClaveUsuario cambia la clave desde una clave existente, esto lo hace
    al estar logueado */
  static async cambiarClaveUsuario(req, res) {
    const cookieJWT = req.headers.cookie.split("; ").find((cookie) => cookie.startsWith("jwt=")).slice(4);
    const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);
    const correo = decodificada.correo;
    const claveVieja = req.body.claveVieja;
    const claveNueva = req.body.claveNueva;
    const claveNuevaConfirmar = req.body.claveNuevaConfirmar;
    const encriptado = await bcryptjs.genSalt(5);
    let claveEncontrada = "";

    if (claveVieja || claveNueva || claveNuevaConfirmar) {
      if (
        claveNueva.length < 5 ||
        (claveNueva.length > 16 && claveNuevaConfirmar.length < 5) ||
        claveNuevaConfirmar.length > 16
      ) {
        return res.status(400).send({
          status: "Error",
          message: "Entre 5 y 16 caracteres",
        });
      }

      if (claveNueva === claveNuevaConfirmar) {
        const claveEncriptada = await bcryptjs.hash(claveNueva, encriptado);
        let resultadoVerClave = await UsuarioModelo.cambiarClaveUsuario(correo);
        claveEncontrada = resultadoVerClave[0].clave;

        let comparada = await bcryptjs.compare(claveVieja, claveEncontrada);
        if (comparada) {
          let resultadoCambiarClave =
            await UsuarioModelo.claveActualizadaUsuario(
              claveEncriptada,
              correo
            );
          if (resultadoCambiarClave) {
            return res.status(200).send({
              status: "Ok",
              message: "Clave cambiada",
            });
          }
        } else {
          return res.status(400).send({
            status: "Error",
            message: "Clave incorrecta",
          });
        }
      } else {
        return res.status(400).send({
          status: "Error",
          message: "Claves no coinciden",
        });
      }
    }
  }

  /** enviarTokenCambiarClave se encarga de enviar un token para cambiar la clave
    mediante unlink de correo electronico */
  static async enviarTokenCambiarClave(req, res) {
    const correo = req.body.correo;
    let resultado = await UsuarioModelo.guardarTokenCambioClave(correo, validarUsuario);
    let nomUsuario = await UsuarioModelo.nombreUsuario(correo);

    if (resultado) {
      sendMailCambiarClave(correo, nomUsuario[0].nombre, validarUsuario);
      return res.status(201).send({
        status: "ok",
        message: "Revise su correo",
      });
    } else {
      return res.status(400).send({
        status: "error",
        message: "Token no enviado",
      });
    }
  }

  /** cambioClaveUsuario se encarga ya de guardar en la BD la nueva clave */
  static async cambioClaveUsuario(req, res) {
    const token = req.body.token;
    const claveN = req.body.claveNueva;
    const claveNConfirmar = req.body.claveNuevaConfirmar;
    let id = "";

    if (claveN.length < 5 || claveN.length > 16 && claveNConfirmar.length < 5 || claveNConfirmar.length > 16) {
      return res.status(400).send({
        status: "Error",
        message: "Entre 5 y 16 caracteres",
      });
    }

    if (!claveN.length || !claveNConfirmar) {
      return res.status(400).send({
        status: "Error",
        message: "Uno o varios campos vacios",
      });
    }

    if (claveN === claveNConfirmar) {
      let resultado = await TokensModelos.cambiarClaveToken(token);
      id = resultado[0].id_usuario;
      const encriptado = await bcryptjs.genSalt(5);
      const claveEncriptada = await bcryptjs.hash(claveN, encriptado);
      let resultado2 = await TokensModelos.claveCambiada(id, claveEncriptada);

      if (resultado2) {
        return res.status(201).send({
          status: "Ok",
          message: "Clave cambiada",
        });
      }
    } else {
      return res.status(400).send({
        status: "error",
        message: `Claves no coinciden`,
      });
    }
  }
}
