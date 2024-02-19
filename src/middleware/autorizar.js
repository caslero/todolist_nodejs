import jsonwebtoken from 'jsonwebtoken'
import { UsuariosModelo } from "../modelo/modelo.js"; 

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
}
