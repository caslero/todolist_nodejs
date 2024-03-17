/** registroUsuarios recibe los datos del formulario para hacer guardar un nuevo usuario */
let registroUsuarios = document.getElementById("registrar");
/** msj muestra los msj de advertencia al intentar hacer login */
let msj = document.getElementById("validar");
/** divMsj imprime los msj */
let divMsj = document.getElementById("validar");

registroUsuarios.addEventListener("submit", registrar);

/** registrar se encarga de enviar los datos para guardar un nuevo usuario y recibe
  la respuesta de lo que sucede */
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

/** mensajesValidacion recibe la respuesta del guardado del nuevo usuario y muestra
  el msj correspondiente a la repuesta */
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

/** toggleMensajes oculta los mensajes de validacion */
async function toggleMensajes() {
  setTimeout(() => {
    msj.classList.remove("mostrarMsjValidacion");
    msj.classList.add("ocultarMsjValidacion");
    divMsj.innerHTML = '';
  }, "3000");
}

/** toggleMensajes oculta o muestra el cuadro de validacion */
async function toggleCuadroMensajes() {
  msj.classList.remove("ocultarMsjValidacion");
  msj.classList.add("mostrarMsjValidacion");
}