let registroUsuarios = document.getElementById("registrar");
let msjUsuario = document.getElementById("registroExitosoUsuario");
let msj = document.getElementById("validar");
let divMsj = document.getElementById("validar");

registroUsuarios.addEventListener("submit", registrar);

async function registrar(e) {
  e.preventDefault();  
  const nombre = e.target.nombre.value;
  const correo = e.target.correo.value;
  const clave = e.target.clave.value;
  const clave2 = e.target.clave2.value;

  const respuesta = await fetch('http://localhost:3000/api/registro', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nombre,
      correo,
      clave,
      clave2
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
  if (mensaje == 'Correo usado') {
    toggleCuadroMensajes()
    divMsj.innerHTML = `<div class="text-[20px]">Usuario Existente</div>`;
    toggleMensajes();
  } else if (mensaje == 'Entre 5 y 16 caracteres') {
    toggleCuadroMensajes()
    divMsj.innerHTML = `<div class="text-[20px]">Minimo 5 caractres, maximo 16 caracteres</div>`;
    toggleMensajes();
  } else if (mensaje == 'Claves diferentes') {
    toggleCuadroMensajes()
    divMsj.innerHTML = `<div class="text-[20px]">Las claves no coinciden</div>`;
    toggleMensajes();
  } else if (mensaje == 'Correo vacio') {
    toggleCuadroMensajes()
    divMsj.innerHTML = `<div class="text-[20px]">Campo de correo vacio</div>`;
    toggleMensajes();
  } else if (mensaje == 'Clave vacia') {
    toggleCuadroMensajes()
    divMsj.innerHTML = `<div class="text-[20px]">Campo de clave vacio</div>`;
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