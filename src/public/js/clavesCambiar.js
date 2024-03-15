
let cambioClave = document.getElementById('cambioClave');
let msj = document.getElementById('mensajeClaves');

cambioClave.addEventListener('submit', claveCambiada);

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
  
async function toggleMensajes() {
    setTimeout(() => {
      msj.classList.add("hidden");
    }, "5000");
}

async function cambiada() {
    setTimeout(() => {
        window.close();
    }, "5000");
}
