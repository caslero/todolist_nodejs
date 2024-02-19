import { tareasModelo, UsuariosModelo, LoginModelo } from "../modelo/modelo.js";
import jsonwebtoken from 'jsonwebtoken';
import bcryptjs from "bcryptjs";

export class UsuariosControlador {
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
                message: "Claves diferentes"
            })
        }

        if (clave.length < 5) {
            return res.status(400).send({
                status: "Error",
                message: "Minimo 5 caracteres"
            })
        }        
       
        let resultado = await UsuariosModelo.registrarNuevoUsuario(nombre, correo, claveEncriptada);        
        
        if (resultado) {
            return res.status(201).send({
                status: 'ok',
                message: `Usuario ${nombre} registrado `, redirect: "/login"
            })
        } else {
            return res.status(400).send({
                status: 'Error',
                message: "Registro Fallido"
            })
        }
    }
}

export class LoginControlador {
    static async postLogin(req, res) {
        const correo = req.body.correo;
        const clave = req.body.clave;

        if (clave.length < 5) {
            return res.status(400).send({
                status: "Error",
                message: "Minimo 5 caracteres"
            })
        }

        if (!correo) {
            return res.status(400).send({
                status: "Error",
                message: "Correo vacio"
            })
        }

        if (!clave) {
            return res.status(400).send({
                status: "Error",
                message: "Clave vacia"
            })
        }

        try {
            let resultado = await LoginModelo.modeloValidarClave(correo);
            let comparada = await bcryptjs.compare(clave, resultado);

            if (!resultado) {
                return res.status(400).send({
                    status: "Error",
                    message: "Correo no existe"
                })
            } else {
                if (comparada) {
                    const token = jsonwebtoken.sign({ correo:correo },
                        process.env.JWT_SECRET, {
                        expiresIn: process.env.JWT_EXPIRATION
                    })
                        
                    const cookieOption = {
                        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                        path: "/",
                        httpOnly: true
                    }
        
                    res.cookie("jwt", token, cookieOption);
                    res.send({
                        status: "ok",
                        message: "usuario logueado",
                        redirect: "/tareas" 
                    })            
                } else {
                    return res.status(400).send({
                        status: "Error",
                        message: "Clave invalida"
                    })
                }
            }
        } catch (error) {
            return res.status(400).send({
                status: "Error",
                message: "Mal inicio de sesion"
            })
        }




    }
}

export class tareasControlador {
    static async mostrarUsuarioActivo(req, res) {
        try {
            const cookieJWT = req.headers.cookie.split('; ').find(cookie => cookie.startsWith('jwt=')).slice(4);
            const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET)
            const correo = decodificada.correo;
            
            let resultado = await UsuariosModelo.usuarioExistente(correo);

            if (resultado) {
                return res.json({
                    status: 'Ok',
                    nombre: resultado
                })
            }
        } catch (error) {
            return res.redirect("/") 
        }
    }

    static async postGuardarTareas(req, res) {
        const cookie = req.headers.cookie;
        const cookieJWT = cookie.split('; ').find(cookie => cookie.startsWith('jwt=')).slice(4);
        const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET)    
        const idUsuario = decodificada.correo;        
        const tarea = req.body.tarea;

        let resultado = await tareasModelo.registrarNuevaTarea(tarea, idUsuario);        
        if (resultado) {
            console.log('Tarea Guardada');
            return res.status(201).send({
                status: 'ok'
            })
        } else {
            return res.status(201).send({
                status: 'Error',
                message: 'Tarea no guardada'
            })
        }
    }

    static async mostrarTodasTareasDescendente(req, res) {
        const cookieJWT = req.headers.cookie.split('; ').find(cookie => cookie.startsWith('jwt=')).slice(4);
        const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET)
        const correo = decodificada.correo;

        let resultado = await tareasModelo.modeloTodasTareasDescendentes(correo);
        if (resultado) {
            return res.json({
                tareasDescendentes: resultado
            })
        } else {
            return res.json({
                advertencia: 'sin tareas'
            })
        }
    }

    static async mostrarTodasTareasAscendente(req, res) {
        const cookieJWT = req.headers.cookie.split('; ').find(cookie => cookie.startsWith('jwt=')).slice(4);
        const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET)
        const correo = decodificada.correo;

        let resultado = await tareasModelo.modeloTodasTareasAscendentes(correo);
        if (resultado) {
            return res.json({
                tareasAscendentes: resultado
            })
        } else {
            return res.json({
                advertencia: 'sin tareas'
            })
        }       
    }

    static async eliminarTareaIndividual(req, res) {
        const id = req.body.id;
        let resultado = await tareasModelo.modeloEliminarTareaIndividual(id);
        if (resultado) {
            return res.json({
                status: 'eliminada'
            })
        }
    }

    static async eliminarTareaTodas(req, res) {
        const cookieJWT = req.headers.cookie.split('; ').find(cookie => cookie.startsWith('jwt=')).slice(4);
        const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET)        
        const correo = decodificada.correo;

        let resultado = await tareasModelo.modeloEliminarTareaTodas(correo);

        if (resultado) {
            return res.json({
                status: 'eliminadas'
            })
        }
    }

    static async eliminarTareaMarcadas(req, res) {
        const cookieJWT = req.headers.cookie.split('; ').find(cookie => cookie.startsWith('jwt=')).slice(4);
        const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET)        
        const correo = decodificada.correo;

        let resultado = await tareasModelo.modeloEliminarTareaMarcadas(correo);

        if (resultado) {
            return res.json({
                status: 'eliminadas'
            })
        }
    }

    static async actualizarTareaEstatusClase(req, res) {
        const id = req.body.id;
        const status = req.body.status;
        const clase = req.body.clase;

        let resultado = await tareasModelo.modeloactualizarTareaEstatusClase(id, status, clase);

        if (resultado) {
            return res.json({
                status: 'actualizada'
            })
        }
    }

    static async actualizarTarea(req, res) {
        const id = req.body.id;
        const tarea = req.body.tarea;

        let resultado = await tareasModelo.modeloactualizarTarea(id, tarea);

        if (resultado) {
            return res.json({
                status: 'actualizada'
            })
        }
    }
}

