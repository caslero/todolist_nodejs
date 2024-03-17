/** Esta funcion es para cerrar la ventana cuando el token haya expirado */
const salir = document.getElementById('salir');
salir.addEventListener('click', () => {
    window.close();
})