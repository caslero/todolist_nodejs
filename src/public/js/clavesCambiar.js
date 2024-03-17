/** cambioClave recibe la nueva clave y la confirmacion de lanueva clave */
let cambioClave = document.getElementById('cambioClave');
let msj = document.getElementById('mensajeClaves');

cambioClave.addEventListener('submit', claveCambiada);

/** claveCambiada envia el token, la clave nueva y clave a confirmar */
async function claveCambiada(e) {
    e.preventDefault();
    const url = window.location.href;
    const parts = url.split('/');
    const token = parts[parts.length - 1];
    const claveNueva = e.target.claveN.value;
    const claveNuevaConfirmar = e.target.claveNConfirmar.value;

    const respuesta = await fetch('http://localhost:3000/api/claveCambiada', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token,
        claveNueva,
        claveNuevaConfirmar
      })
    })

    const respuestaJson = await respuesta.json();
    const statusError = respuestaJson.status;
    const mensaje = respuestaJson.message;
   
    if (statusError == 'Error') {    
      mensajesValidacion(mensaje)
    } else {
        mensajesValidacion(mensaje)
    }
  
    if (respuestaJson.redirect) {
      window.location.href = respuestaJson.redirect;
    }    
}

/** mensajesValidacion recibe la respuesta del cambio de clave y muestra el msj
  correspondiente a la repuesta */
async function mensajesValidacion(mensaje) {
    if (mensaje == 'Claves no coinciden') {
      msj.classList.remove('hidden');
      msj.innerHTML = `Las claves no coinciden`;
      toggleMensajes()
    } else if (mensaje == 'Entre 5 y 16 caracteres') {
      msj.classList.remove('hidden');
      msj.innerHTML = `Ingrese entre 5 y 16 caracteres`;
      toggleMensajes();
    } else {
      msj.classList.remove('hidden');
      msj.innerHTML = `Clave cambiada con exito`;
      cambiada();      
    }
}

/** toggleMensajes se encarga de ocultar el msj de la respuesta */
async function toggleMensajes() {
    setTimeout(() => {
      msj.classList.add("hidden");
    }, "5000");
}

/** cambiada se encarga de cerrar la ventana una vez guardada la nueva clave */
async function cambiada() {
    setTimeout(() => {
        window.close();
    }, "5000");
}
