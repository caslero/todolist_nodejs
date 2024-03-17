import jsonwebtoken from "jsonwebtoken";
import { UsuarioModelo } from "../modelo/UsuarioModelo.js";
import { LoginModelo } from "../modelo/LoginModelo.js";
import { TokensModelos } from "../modelo/TokenModelo.js";

/** AdminUsuario son middleware que se encarga de validar cierta informacion antes
  de pasen a la sigiente peticion */
export class AdminUsuario {
  /** revisarCookie se encarga de que si un usuario no ha iniciado sesion no pueda
    entrar a la ruta de tareas */
  static async revisarCookie(req, res, next) {
    const cookie = req.headers.cookie;
    try {
      const cookieJWT = cookie.split("; ").find((cookie) => cookie.startsWith("jwt=")).slice(4);
      const decodificada = jsonwebtoken.verify(
        cookieJWT,
        process.env.JWT_SECRET
      );
      const correo = decodificada.correo;

      let resultado = await UsuarioModelo.usuarioExistente(correo);

      if (resultado) {
        return next();
      } else {
        return res.redirect("/");
      }
    } catch (error) {
      return res.redirect("/");
    }
  }

  /** usuarioRepetido se encarga de validar si el nuevo usuario a registrarse no se
    se encuentre registrado */
  static async usuarioRepetido(req, res, next) {
    const correo = req.body.correo;
    try {
      let resultado = await UsuarioModelo.usuarioExistente(correo);
      if (resultado) {
        return res.status(400).send({
          status: "Error",
          message: "Correo usado",
        });
      } else {
        return next();
      }
    } catch (error) {
      return res.status(400).send({
        status: "Error",
        message: "Revisando si el usuario se repite",
        error: error,
      });
    }
  }

  /** validarUsuarioToken es para validar el link enviado al correo para saber
    si es autentico o no */
  static async validarUsuarioToken(req, res, next) {
    const url = req.url;
    const parts = url.split("/");
    const token = parts[parts.length - 1];
    let nuevoToken = "";
    let resultado = await LoginModelo.validarUsuario();

    resultado.forEach((element) => {
      if (element.validarUsuario) {
        nuevoToken = token;
      }
    });

    if (nuevoToken) {
      let resultado = await LoginModelo.autorizadoLogin(token);
      return next();
    } else {
      return res.status(400).send({
        status: "Error",
        message: "Fallo al autenticar",
      });
    }
  }

  /** usuarioNoRegistrado se encarga de validar si el usuario existe para poder
    hacer login */
  static async usuarioNoRegistrado(req, res, next) {
    const correo = req.body.correo;
    try {
      let resultado = await UsuarioModelo.usuarioNoExistente(correo);
      if (resultado) {
        return next();
      } else {
        return res.status(400).send({
          status: "Error",
          message: "Usuario no registrado",
        });
      }
    } catch (error) {
      return res.status(400).send({
        status: "Error",
        message: "Usuario no existe",
      });
    }
  }

  /** confirmarUsuarioExistente confirma si existe el usuario y si ya se valido
    mediante el correo para poder enviar el token de cambio de clave */
  static async confirmarUsuarioExiste(req, res, next) {
    const correo = req.body.correo;
    let resultado = await UsuarioModelo.cambiarUsuarioClaveToken(correo);
    let resultado2 = await UsuarioModelo.usuarioAutenticado(correo);
    let autenticar = '';

    if (resultado) {
      autenticar = resultado2[0].autenticar;
      if (autenticar == 'true') {
        return next();
      } else {
        return res.status(400).send({
          status: "Error",
          message: "Usuario no validado",
        });
      }      
    } else {
      return res.status(400).send({
        status: "Error",
        message: "Usuario no registrado",
      });
    }
  }

  /** cambioClaveUsuario se encarga de validar el token que haya y no haya expirado
    para poder cambiar la clave */
  static async cambioClaveUsuario(req, res, next) {
    const url = req.url;
    const parts = url.split("/");
    const token = parts[parts.length - 1];
    let id = "";

    let resultado = await TokensModelos.cambiarClaveToken(token);
    id = resultado[0].id_usuario;
    let resultado2 = await TokensModelos.ultimoToken(id);

    const usuarioMayor = resultado2.reduce((previous, current) => {
      return current.id > previous.id ? current : previous;
    });

    if (usuarioMayor.token != token) {
      res.redirect("/tokenExpiro");
    } else {
      return next();
    }
  }
}
