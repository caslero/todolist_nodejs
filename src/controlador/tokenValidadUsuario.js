import { LoginModelo } from "../modelo/modelo.js";
let authUsuario = await LoginModelo.validarUsuario();

export const tokenValidarUsuario = (num) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result1 = Math.random().toString(34).substring(0, num);
    let result2 = Math.random().toString(34).substring(0, num);
    const token1 = result1.split('; ').find(cookie => cookie.startsWith('0.')).slice(2);
    const token2 = result2.split('; ').find(cookie => cookie.startsWith('0.')).slice(2);
    
    return token1 + token2;
}

export let usuarioValidadoToken = (token) => {
    let authUsu = ''
    authUsuario.forEach(element => {
        authUsu = element.validarUsuario;
        return authUsu
    });
        
} 

