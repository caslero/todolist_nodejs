
let enviarCorreo = document.getElementById('cambioClave');
let msj = document.getElementById("mensajeClaves");

enviarCorreo.addEventListener('submit', cambiarClave);

async function cambiarClave(e) {
  e.preventDefault();
  const correo = e.target.correo.value;
  const respuesta = await fetch('http://localhost:3000/api/cambiar-clave-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      correo
    })
  })

  const respuestaJson = await respuesta.json();
  const statusError = respuestaJson.status;
  const mensaje = respuestaJson.message;  
 
  if (statusError == 'Error') {    
    mensajesValidacion(mensaje)
  } else if (statusError == 'ok') {
    mensajesValidacion(mensaje)
  }
  if (respuestaJson.redirect) {
    window.location.href = respuestaJson.redirect;
  }
}

async function mensajesValidacion(mensaje) {
  if (mensaje == 'Usuario no registrado') {
    msj.classList.remove('hidden');
    msj.innerHTML = `Usuario no existe`;
    toggleMensajes()
  } else if (mensaje == 'Revise su correo') {
    msj.classList.remove('hidden');
    msj.innerHTML = `Correo enviado`;
    toggleMensajes()
    setTimeout(() => {
      window.location = '/login'
    }, "4000");
  } else if (mensaje == 'Usuario no validado') {
    msj.classList.remove('hidden');
    msj.innerHTML = `Validar usuario antes de cambiar clave`;
    toggleMensajes();
    setTimeout(() => {
      window.location = '/login'
    }, "4000");
  }
}

async function toggleMensajes() {
  setTimeout(() => {
    msj.classList.add("hidden");
  }, "4000");
}


