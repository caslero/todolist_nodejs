/** Esta funcion lo que hace es cerrar la ventada de usuario validado */
const salir = document.getElementById('salir');
console.log(salir);
salir.addEventListener('click', () => {
    window.close();
})