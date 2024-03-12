
let entrarAlSistema = document.getElementById('login');
let msjUsuario = document.getElementById("registroExitosoUsuario");
let msj = document.getElementById("validar");
let divMsj = document.getElementById("validar");

entrarAlSistema.addEventListener('submit', login);

async function login(e) {
  e.preventDefault();
  const correo = e.target.correo.value;
  const clave = e.target.clave.value;
  
  const respuesta = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      correo,
      clave
    })
  })

  const respuestaJson = await respuesta.json();
  const statusError = respuestaJson.status;
  const mensaje = respuestaJson.message;  
 
  if (statusError == 'Error') {    
    mensajesValidacion(mensaje)
  }

  if (respuestaJson.redirect) {
    window.location.href = respuestaJson.redirect;
  }
}

async function mensajesValidacion(mensaje) {
  if (mensaje == 'Clave invalida') {
    toggleCuadroMensajes()
    divMsj.innerHTML = `<div class="text-[20px]">Clave Invalida</div>`;
    toggleMensajes();
  } else if (mensaje == 'Correo no existe') {
    toggleCuadroMensajes()
    divMsj.innerHTML = `<div class="text-[20px]">Correo Invalido</div>`;
    toggleMensajes();
  } else if (mensaje == 'Minimo 5 caracteres') {
    toggleCuadroMensajes()
    divMsj.innerHTML = `<div class="text-[20px]">Minimo 5 caractres en la clave</div>`;
    toggleMensajes();
  } else if (mensaje == 'Usuario no verificado') {
    toggleCuadroMensajes()
    divMsj.innerHTML = `<div class="text-[20px]">Validar Usuario, revise su correo</div>`;
    toggleMensajes();
  } else if (mensaje == 'Usuario no registrado') {
    toggleCuadroMensajes()
    divMsj.innerHTML = `<div class="text-[20px]">No existe el usuario</div>`;
    toggleMensajes();
  }  
}

async function toggleMensajes() {
  setTimeout(() => {
    msj.classList.remove("mostrarMsjValidacion");
    msj.classList.add("ocultarMsjValidacion");
    divMsj.innerHTML = '';
  }, "3000");
}

async function toggleCuadroMensajes() {
  msj.classList.remove("ocultarMsjValidacion");
  msj.classList.add("mostrarMsjValidacion");
}
