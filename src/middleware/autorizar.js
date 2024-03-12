import jsonwebtoken from 'jsonwebtoken'
import { UsuariosModelo } from "../modelo/modelo.js";
import { LoginModelo, TokensModelos } from '../modelo/modelo.js';


export class adminUsuarios {    
    static async revisarCookie(req, res, next) {
        try {
            const cookieJWT = req.headers.cookie.split('; ').find(cookie => cookie.startsWith('jwt=')).slice(4);
            const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET)
            const correo = decodificada.correo;

            let resultado = await UsuariosModelo.usuarioExistente(correo);

            if (resultado) {              
                return next();               
            } else {
                return res.redirect("/") 
            }
        } catch (error) {
            return res.redirect("/") 
        }
    }

    static async usuarioRepetido(req, res, next) {
        const correo = req.body.correo;
        try {
            let resultado = await UsuariosModelo.usuarioExistente(correo);
            if (resultado) {
                return res.status(400).send({
                    status: "Error",
                    message: "Correo usado"
                })                              
            } else {
                return next(); 
            }
        } catch (error) {
            return res.status(400).send({
                status: "Error",
                message: "Revisando si el usuario se repite",
                error: error
            }) 
        }
    }

    //Este metodo es para validar el link enviado al correo
    static async validarUsuarioToken(req, res, next) {
        const url = req.url
        const parts = url.split('/');
        const token = parts[parts.length - 1];
        let nuevoToken = '';
        let resultado = await LoginModelo.validarUsuario();

        resultado.forEach(element => {
            if(element.validarUsuario) {
                nuevoToken = token 
            }
        });

        if (nuevoToken) {
            let resultado = await LoginModelo.autorizadoLogin(token);
            console.log('Cambiando a true: ' + resultado);
            return next()
        } else {
            return res.status(400).send({
                status: "Error",
                message: "Fallo al autenticar"
            }) 
        }
    }

    static async usuarioNoRegistrado(req, res, next) {
        const correo = req.body.correo;
        try {
            let resultado = await UsuariosModelo.usuarioNoExistente(correo);
            if (resultado) {
                return next();                                             
            } else {
                return res.status(400).send({
                    status: "Error",
                    message: "Usuario no registrado"
                }) 
            }
        } catch (error) {
            return res.status(400).send({
                status: "Error",
                message: "Usuario no existe"
            }) 
        }
    }

    static async confirmarUsuarioExiste(req, res, next) {
        const correo = req.body.correo;        
        let resultado = await UsuariosModelo.cambiarUsuarioClaveToken(correo);

        if (resultado) {
            return next();
        } else {
            return res.status(400).send({
                status: "Error",
                message: "Usuario no registrado"
            })
        }
    }

    static async cambioClaveUsuario(req, res, next) {
        const url = req.url
        const parts = url.split('/');
        const token = parts[parts.length - 1];
        let id = '';

        let resultado = await TokensModelos.cambiarClaveToken(token);
        id = resultado[0].id_usuario;
        let resultado2 = await TokensModelos.ultimoToken(id)
        
        const usuarioMayor = resultado2.reduce((previous, current) => {
            return current.id > previous.id ? current : previous;
        });

        console.log(usuarioMayor.id);

        if (usuarioMayor.token != token) {
            res.redirect('/tokenExpiro')
        } else {
            return next();
        }
    }
}
