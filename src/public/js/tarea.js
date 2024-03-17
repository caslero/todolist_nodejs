let guardarTarea = document.getElementById('guardarTarea');
let cerrarSesions = document.getElementById('cerrarSesions');
let menuSalirUsuario = document.getElementById("dropdownDefaultButton");
let filtrado = document.getElementById("filtrado");
let ascendente = document.getElementById("ordenando");
let anterior = document.getElementById("anterior");
let siguiente = document.getElementById("siguiente");
let alerta = document.querySelector(".alerta");
let borrarIndividual = document.querySelector(".checkear");
let borrarT = document.querySelector(".btnEliminar");
let borrarMarcados = document.querySelector(".btnEliminar");
let sinCheckear = document.querySelector(".checkear");
let editarTarea = document.querySelector(".checkear");
let confirmarModal = document.querySelector(".confirmarModal");
let barraProgreso = document.getElementById("barraProgreso");
let ocultarTarea = document.querySelector(".barraProgresos");
let cambioClave = document.getElementById('cambioClave');
let mensajeClaves = document.getElementById('mensajeClaves');
let cambiarClave = document.getElementById('cambiarClave');
let cancelarClave = document.getElementById('cancelarClave');

let limite = 3;
let pagina = 1;
let n = 0;
let id = '';
let statusTarea = '';
let claseTarea = '';
let tareaN = '';
let cuadroTarea = '';

guardarTarea.addEventListener('submit', nuevaTarea);
cerrarSesions.addEventListener('click', logOut);
anterior.addEventListener("click", retroceder);
siguiente.addEventListener("click", avanzar);
menuSalirUsuario.addEventListener("click", menuSalir);
filtrado.addEventListener("click", menuFiltradoTarea);
ascendente.addEventListener("click", ordenLista);
borrarIndividual.addEventListener("click", eliminarElementos);
borrarT.addEventListener("click", eliminarListaCompleta);
borrarMarcados.addEventListener("click", eliminarMarcados);
sinCheckear.addEventListener("click", cambiarEstadoTarea);
editarTarea.addEventListener("click", actualizarTareas);
cambiarClave.addEventListener('click', mostrarCambiarClave)
cambioClave.addEventListener('submit', claveCambiada);
cancelarClave.addEventListener('click', cancelarCambioClave)

async function mostrarCambiarClave(e) {
  e.preventDefault();
  let modalConfirmado = document.getElementById("modalConfirmar");
  let modalConfirmar1 = document.getElementById("modalConfirmar1");
  let modalConfirmar2 = document.getElementById("modalConfirmar2");
  let menufiltrado = document.getElementById("menufiltrado");
  let medio = document.getElementById("medio");
  let medio2 = document.getElementById("medio2");

  menufiltrado.classList.add("hidden");
  medio.classList.add("hidden");
  medio2.classList.remove("hidden");
  modalConfirmar1.classList.add("w-[100%]");
  modalConfirmar2.classList.add("w-[100%]");
  modalConfirmar2.classList.add("right-0");
  body.classList.add("overflow-y-hidden");


  //modalConfirmado.innerHTML = `  `;
 
}

async function cancelarCambioClave() {
  let modalConfirmar1 = document.getElementById("modalConfirmar1");
  let modalConfirmar2 = document.getElementById("modalConfirmar2");
  let medio2 = document.getElementById("medio2");

  modalConfirmar1.classList.remove("w-[100%]");
  modalConfirmar2.classList.remove("w-[100%]");
  modalConfirmar2.classList.remove("right-0");
  medio2.classList.add("hidden");
}

async function claveCambiada(e) {
  e.preventDefault()
  const claveVieja = e.target.claveVieja.value;
  const claveNueva = e.target.claveNueva.value;
  const claveNuevaConfirmar = e.target.claveNuevaConfirmar.value;

  const respuesta = await fetch('http://localhost:3000/api/cambiar-clave', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      claveVieja,
      claveNueva,
      claveNuevaConfirmar
    })
  })

  const respuestaJson = await respuesta.json();
  const respuestaClave = respuestaJson.status;
  const mensaje = respuestaJson.message;

  if (respuestaClave == 'error') {
    mostrarMensajeClave(mensaje)
  } else {
    mostrarMensajeClave(mensaje)
  }  
  document.getElementById('claveVieja').value = '';
  document.getElementById('claveNueva').value = '';
  document.getElementById('claveNuevaConfirmar').value = '';
  if (respuestaJson.redirect) {
    window.location.href = respuestaJson.redirect;
  }
}

function mostrarMensajeClave(mensaje) {
  if (mensaje == 'Clave cambiada') {
    mensajeClaves.classList.remove('hidden')
    mensajeClaves.innerHTML = 'Clave cambiada con exito'
    toggleMensajes()
    window.location = '/tareas'
  } else if (mensaje == 'Clave incorrecta') {
    mensajeClaves.classList.remove('hidden')
    mensajeClaves.innerHTML = 'Clave incorrecta'
    toggleMensajes()
  } else if (mensaje == 'Claves no coinciden') {
    mensajeClaves.classList.remove('hidden')
    mensajeClaves.innerHTML = 'Claves no coinciden'
    toggleMensajes()
  } else if (mensaje == 'Campos vacios') {
    mensajeClaves.classList.remove('hidden')
    mensajeClaves.innerHTML = 'Uno o varios campos vacios'
    toggleMensajes()
  } else if (mensaje == 'Entre 5 y 16 caracteres') {
    mensajeClaves.classList.remove('hidden')
    mensajeClaves.innerHTML = `Ingrese entre 5 y 16 caracteres`
    toggleMensajes()
  }  
}

async function toggleMensajes() {
  setTimeout(() => {
    mensajeClaves.classList.add("hidden");
  }, "3000");
}

async function nuevaTarea(e) {
  e.preventDefault();
  const tarea = e.target.tarea.value;

  const respuesta = await fetch('http://localhost:3000/api/tareas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      tarea
    })
  })

  const respuestaJson = await respuesta.json();
  const nuevaTarea = respuestaJson.status;

  if (nuevaTarea == 'ok') {
    nuevaTareaGuardada(tarea)
  }
  
  document.getElementById('tarea').value = '';

  if (respuestaJson.redirect) {
    window.location.href = respuestaJson.redirect;
  }
}

async function logOut() {
  document.location.href = "/cerrar_sesion"
}

function menuSalir() {
  let mostrarMenu = document.getElementById("dropdown");
  mostrarMenu.classList.toggle("hidden");
  setTimeout(() => {
    mostrarMenu.classList.add("hidden");
  }, 4000);
}

function menuFiltradoTarea() {
  let menufiltrado = document.getElementById("menufiltrado");
  menufiltrado.classList.toggle("hidden");
}

document.addEventListener("keyup", (e) => {
  let buscador = document.getElementById("ningunaTarea");
  let verdaderos = 0;
  let falsos = 0;
  if (e.target.matches("#buscandoTarea")) {
    document.querySelectorAll(".listare").forEach((tareas) => {
      tareas.dataset.value.toLowerCase().includes(e.target.value)
        ? tareas.classList.remove("hidden")
        : tareas.classList.add("hidden");

      let a = tareas.dataset.value.toLowerCase().includes(e.target.value);
      verdaderos++;
      if (a == false) {
        falsos++;
      }
    });
    if (verdaderos - falsos == 0) {
      buscador.classList.remove("hidden");
      buscador.classList.add("flex");
      document.getElementById("ningunaTarea").innerHTML =
        "No hay coincidencias...";
    } else {
      document.getElementById("ningunaTarea").innerHTML = "";
      buscador.classList.remove("flex");
      buscador.classList.add("hidden");
    }
  }
});

function fecha() {
  let today = new Date();
  let nDia = { weekday: "long" };
  let dia = { day: "numeric" };
  let mes = { month: "long" };
  let year = { year: "numeric" };

  let nombreDia = today.toLocaleString("es-es", nDia);
  let diaActual = today.toLocaleString("es-es", dia);
  let mesActual = today.toLocaleString("es-es", mes);
  let yearActual = today.toLocaleString("es-es", year);

  document.getElementById("nombreDia").innerHTML = nombreDia;
  document.getElementById("dia").innerHTML = diaActual;
  document.getElementById("mes").innerHTML = mesActual;
  document.getElementById("year").innerHTML = yearActual;
}

function ordenLista() {
  if (ascendente.innerHTML == "Ascendente") {
    document.getElementById("ordenando").innerHTML = "Descendente";
    nuevaTareaGuardada()
  } else {
    document.getElementById("ordenando").innerHTML = "Ascendente";
    nuevaTareaGuardada()
  }
}

async function nuevaTareaGuardada(tarea) {
  let todos = [];
  if (tarea) {    
    try {
      fetch(`http://localhost:3000/tareas/todas/ascendentes`)
        .then(response => response.json())
        .then((tareas) => {

          if (tareas.advertencia != 'sin tareas') {
            todos = tareas.tareasAscendentes;

            if (!todos) {
              location.reload();
            }
            const tareasTotales = todos.length;
            let cantidadPaginas = tareasTotales / limite;
            let x = Math.ceil(cantidadPaginas);

            document.getElementById("pagina").innerHTML = "Pagina: " + pagina + " / " + x;
            const tareasPorPaginas = (pagina - 1) * limite;
            let items = todos.slice(tareasPorPaginas, limite + tareasPorPaginas);

            items.map((doc) => {
              id = doc.id;
              statusTarea = doc.estatus;
              claseTarea = doc.clase;
              tareaN = doc.tarea;
              cuadroTarea = ``;            
            })
            document.getElementById("mostrarTareas").innerHTML = cuadroTarea;            
          }          
        })
    }catch (error) {
      console.log('Error al guardar tarea, ascendentes: ' + error);
    }
    observador()
  } else {
    try {
      fetch(`http://localhost:3000/tareas/todas/ascendentes`)
        .then(response => response.json())
        .then((tareas) => {

          if (tareas.advertencia != 'sin tareas') {
            todos = tareas.tareasAscendentes;
            if (!todos) {
              location.reload();
            }
            const tareasTotales = todos.length;
            let cantidadPaginas = tareasTotales / limite;
            let x = Math.ceil(cantidadPaginas);

            document.getElementById("pagina").innerHTML = "Pagina: " + pagina + " / " + x;
            const tareasPorPaginas = (pagina - 1) * limite;
            let items = todos.slice(tareasPorPaginas, limite + tareasPorPaginas);

            items.map((doc) => {
              id = doc.id;
              statusTarea = doc.estatus;
              claseTarea = doc.clase;
              tareaN = doc.tarea;
              cuadroTarea = ``;            
            })
            document.getElementById("mostrarTareas").innerHTML = cuadroTarea;         
          }
          observador()      
        })
    }catch (error) {
      console.log('Error al guardar tarea, descendentes: ' + error);     
    }
  }
}

async function mostrarTareas(){
  let ascendente = document.getElementById("ordenando");
  let orden = ascendente.innerHTML;
  let tTarea = '';
  let todos = [];

  if (orden == 'Ascendente') {
    try {
      fetch(`http://localhost:3000/tareas/todas/ascendentes`)
        .then(response => response.json())
        .then((tareas) => {
          
          if (tareas.advertencia == 'sin tareas') {
            document.getElementById("mostrarTareas").innerHTML = '';
            document.querySelector(".btnEliminarTodo").innerHTML = ``;
            document.querySelector(".btnMarcar").innerHTML = ``;
            document.querySelector(".sinTareas").innerHTML = ``;
          } else {
            let contadorMarcadas = 0;
            let contadorTodasTareas = 0;
            todos = tareas.tareasAscendentes;

            const tareasTotales = todos.length;
            let cantidadPaginas = tareasTotales / limite;
            let x = Math.ceil(cantidadPaginas);
            document.getElementById("pagina").innerHTML = "Pagina: " + pagina + " / " + x;
            const tareasPorPaginas = (pagina - 1) * limite;
            let items = todos.slice(tareasPorPaginas, limite + tareasPorPaginas);
            let contador = todos.length;
    
            if (contador != 0) {
              document.getElementById("btnPagina").classList.remove("hidden");
              if (pagina == 2 && pagina != x) {
                document.getElementById("btnPagina").classList.remove("hidden");
                siguiente.classList.remove("hidden");
              }
            }
            if (x > 1) {
              document.getElementById("btnSiguiente").classList.remove("hidden");
            } else {
              document.getElementById("btnSiguiente").classList.add("hidden");
            }
            if (pagina > 1 && pagina == x) {
              document.getElementById("btnSiguiente").classList.remove("hidden");
              document.getElementById("btnAnterior").classList.remove("hidden");
              anterior.classList.remove("hidden");
              siguiente.classList.add("hidden");
            } else if (pagina > 1 && pagina < x) {
              document.getElementById("btnSiguiente").classList.remove("hidden");
              document.getElementById("btnAnterior").classList.remove("hidden");
              anterior.classList.remove("hidden");
              anterior.classList.remove("hidden");
            }
            if (pagina > x) {
              retroceder();
            }

            items.map((doc) => {
              contadorTodasTareas++;
              id = doc.id;
              statusTarea = doc.estatus;
              claseTarea = doc.clase;
              tareaN = doc.tarea;
              cuadroTarea = cuadroTarea + `<li class="listare" id="${id}" data-clase="${claseTarea}" data-status="${statusTarea}" data-value="${tareaN}">
                                                  <label class="space-x-4 ps-2 input-contenedor md:basis-[80%]">
                                                    <input id="${id}" type="checkbox"  clase="sin-checkear cambiar" value="${id}" ${statusTarea === "completed" ? "checked" : null}/>                       
                                                    <input id="${id}" type="text" class="asa lista input-tarea outline-none" value="${tareaN}" readonly>                            
                                                  </label>
                                                  <div class="btn-contenedore ms-2 md:basis-[20%] space-x-2 pe-2">
                                                    <button class="js-edit   circulos cambioEditarTarea" id="${id}" title="Editar tarea">
                                                      <i class="ri-pencil-fill cambiarIcono"></i>
                                                    </button>
                                                    <button class="js-delete circulos" id="${id}">
                                                      <i class="ri-delete-bin-fill" title="Borrar tarea"></i>
                                                    </button>
                                                  </div>
                                           </li>`;  
                                           
              if (claseTarea == 'marcar') {
                contadorMarcadas++
              }
            })
            document.getElementById("mostrarTareas").innerHTML = cuadroTarea; 

            if (tTarea.length > 0) {
              document.querySelector(".btnEliminarTodo").innerHTML = `<button id="${id}" class="${claseTarea} borrado borrarTodo btn-eliminar-todo">Borrar Lista</button>`;
              document.querySelector(".sinTareas").innerHTML = `<div class="tareasActivas"><b class="me-2">${contadorTodasTareas}</b> Tareas</div>`;
            }
  
            if (contadorMarcadas >= 1) {
              document.querySelector(".btnMarcar").innerHTML = `<button id="${id}" class="${claseTarea} marcado borrarTodo btn-eliminar-todo">Borrar marcados</button>`;
            } else {
              document.querySelector(".btnMarcar").innerHTML = ``;
            }            
          }        
        })
    }catch (error) {
      console.log('Error al mostrar las tareas, ascendentes: ' + error);   
    }
  } else {
    try {
      fetch(`http://localhost:3000/tareas/todas/descendentes`)
        .then(response => response.json())
        .then((tareas) => {
          
          if (tareas.advertencia == 'sin tareas') {
            document.getElementById("mostrarTareas").innerHTML = '';
            document.querySelector(".btnEliminarTodo").innerHTML = ``;
            document.querySelector(".btnMarcar").innerHTML = ``;
            document.querySelector(".sinTareas").innerHTML = ``;
          } else {

            let contadorMarcadas = 0;
            let contadorTodasTareas = 0;

            todos = tareas.tareasDescendentes;
            let contador = todos.length;            
            const tareasTotales = contador;
            let cantidadPaginas = tareasTotales / limite;
            let x = Math.ceil(cantidadPaginas);

            document.getElementById("pagina").innerHTML = "Pagina: " + pagina + " / " + x;
            const tareasPorPaginas = (pagina - 1) * limite;
            let items = todos.slice(tareasPorPaginas, limite + tareasPorPaginas);

            if (contador != 0) {
              document.getElementById("btnPagina").classList.remove("hidden");

              if (pagina == 2 && pagina != x) {
                document.getElementById("btnPagina").classList.remove("hidden");
                siguiente.classList.remove("hidden");
              }
            }
            if (x > 1) {
              document.getElementById("btnSiguiente").classList.remove("hidden");
            } else {
              document.getElementById("btnSiguiente").classList.add("hidden");
            }
            if (pagina > 1 && pagina == x) {
              document.getElementById("btnSiguiente").classList.remove("hidden");
              document.getElementById("btnAnterior").classList.remove("hidden");
              anterior.classList.remove("hidden");
              siguiente.classList.add("hidden");
            } else if (pagina > 1 && pagina < x) {
              document.getElementById("btnSiguiente").classList.remove("hidden");
              document.getElementById("btnAnterior").classList.remove("hidden");
              anterior.classList.remove("hidden");
              anterior.classList.remove("hidden");
            }
            if (pagina > x) {
              retroceder();
            }
            
            items.forEach((doc) => {
              
              contadorTodasTareas++;
              id = doc.id;
              statusTarea = doc.estatus;
              claseTarea = doc.clase;
              tareaN = doc.tarea;
              cuadroTarea = cuadroTarea + `<li class="listare" id="${id}" data-clase="${claseTarea}" data-status="${statusTarea}" data-value="${tareaN}">
                                                  <label class="space-x-4 ps-2 input-contenedor md:basis-[80%]">
                                                    <input id="${id}" type="checkbox"  clase="sin-checkear cambiar" value="${id}" ${statusTarea === "completed" ? "checked" : null}/>                       
                                                    <input id="${id}" type="text" class="asa lista input-tarea outline-none" value="${tareaN}" readonly>                            
                                                  </label>
                                                  <div class="btn-contenedore ms-2 md:basis-[20%] space-x-2 pe-2">
                                                    <button class="js-edit   circulos cambioEditarTarea" id="${id}" title="Editar tarea">
                                                      <i class="ri-pencil-fill cambiarIcono"></i>
                                                    </button>
                                                    <button class="js-delete circulos" id="${id}">
                                                      <i class="ri-delete-bin-fill" title="Borrar tarea"></i>
                                                    </button>
                                                  </div>
                                           </li>`;  
                                           
              if (claseTarea == 'marcar') {
                contadorMarcadas++
              }
            })
            document.getElementById("mostrarTareas").innerHTML = cuadroTarea; 

            if (items.length > 0) {
              document.querySelector(".btnEliminarTodo").innerHTML = `<button id="${id}" class="${claseTarea} borrado borrarTodo btn-eliminar-todo">Borrar Lista</button>`;
              document.querySelector(".sinTareas").innerHTML = `<div class="tareasActivas"><b class="me-2">${contador}</b> Tareas</div>`;
            }
  
            if (contadorMarcadas >= 1) {
              document.querySelector(".btnMarcar").innerHTML = `<button id="${id}" class="${claseTarea} marcado borrarTodo btn-eliminar-todo">Borrar marcados</button>`;
            } else {
              document.querySelector(".btnMarcar").innerHTML = ``;
            }
          }        
      })
    }catch (error) {
      console.log('Error al mostrar las tareas, descendentes: ' + error);  
    }
  } 
}

/** La funcion retroceder es para regresar a la pagina anterior de las tareas */
async function retroceder() {
  pagina = pagina - 1;
  let todos = [];
  let ascendente = document.getElementById("ordenando");
  let orden = ascendente.innerHTML;
  if (orden == "Ascendente") {
    try {
      fetch(`http://localhost:3000/tareas/todas/ascendentes`)
        .then(response => response.json())
        .then((tareas) => {
  
            todos = tareas.tareasAscendentes;

            const tareasTotales = todos.length;
            let cantidadPaginas = tareasTotales / limite;
            let x = Math.ceil(cantidadPaginas);
            const tareasPorPaginas = (pagina - 1) * limite;
            let items = todos.slice(tareasPorPaginas, limite + tareasPorPaginas);
          
            if (pagina <= 1) {
              document.getElementById("btnPagina").classList.add("hidden");             
            }
          
            if (pagina <= 1 && pagina <= x) {
              anterior.classList.add("hidden");
              siguiente.classList.remove("hidden");              
                nuevaTareaGuardada();              
            } else if (pagina > 1 && pagina < x) {
              anterior.classList.remove("hidden");
              siguiente.classList.remove("hidden");              
                nuevaTareaGuardada();              
            } else if (pagina > 1 && pagina <= x) {
              anterior.classList.remove("hidden");
              siguiente.classList.add("hidden");              
                nuevaTareaGuardada();              
            }   
        })  
    }catch (error) {
      console.log('Error al regresar pagina: ' + error);        
    }
  } else {
    try {
      fetch(`http://localhost:3000/tareas/todas/descendentes`)
        .then(response => response.json())
        .then((tareas) => {

            todos = tareas.tareasDescendentes;
  
            const tareasTotales = todos.length;
            let cantidadPaginas = tareasTotales / limite;
            let x = Math.ceil(cantidadPaginas);
            const tareasPorPaginas = (pagina - 1) * limite;
            let items = todos.slice(tareasPorPaginas, limite + tareasPorPaginas);

            if (pagina <= 1) {
              document.getElementById("btnPagina").classList.add("hidden");
            }
          
            if (pagina <= 1 && pagina <= x) {
              anterior.classList.add("hidden");
              siguiente.classList.remove("hidden");              
                nuevaTareaGuardada();             
            } else if (pagina > 1 && pagina < x) {
              anterior.classList.remove("hidden");
              siguiente.classList.remove("hidden");             
                nuevaTareaGuardada();             
            } else if (pagina > 1 && pagina <= x) {
              anterior.classList.remove("hidden");
              siguiente.classList.add("hidden");              
                nuevaTareaGuardada();             
            }   
        })
    }catch (error) {
      console.log('Error al regresar pagina: ' + error);       
    }
  }  
}

/** La funcion avanzar es para pasar a la pagina siguiente pagina de las tareas */
async function avanzar() {
  pagina = pagina + 1;
  let todos = [];

  let ascendente = document.getElementById("ordenando");
  let orden = ascendente.innerHTML;
  if (orden == "Ascendente") {
    try {
      fetch(`http://localhost:3000/tareas/todas/ascendentes`)
        .then(response => response.json())
        .then((tareas) => {
  
            todos = tareas.tareasAscendentes;
            
            const tareasTotales = todos.length;
            let cantidadPaginas = tareasTotales / limite;
            let x = Math.ceil(cantidadPaginas);
            const tareasPorPaginas = (pagina - 1) * limite;
            let items = todos.slice(tareasPorPaginas, limite + tareasPorPaginas);
            if (pagina >= x) {
              siguiente.classList.add("hidden");
              anterior.classList.remove("hidden");             
                nuevaTareaGuardada()             
            } else if (pagina < x) {
              siguiente.classList.remove("hidden");
              anterior.classList.remove("hidden");             
                nuevaTareaGuardada()           
            }
            if (pagina >= 2 && pagina < x) {
              document.getElementById("btnAnterior").classList.remove("hidden");
              document.getElementById("btnSiguiente").classList.remove("hidden");
              siguiente.classList.remove("hidden");
              anterior.classList.remove("hidden");
            }
        })
    }catch (error) {
      console.log('Error al adelantar pagina: ' + error);       
    }
  } else {
    try {
      fetch(`http://localhost:3000/tareas/todas/descendentes`)
        .then(response => response.json())
        .then((tareas) => {
  
            todos = tareas.tareasDescendentes;
            
            const tareasTotales = todos.length;
            let cantidadPaginas = tareasTotales / limite;
            let x = Math.ceil(cantidadPaginas);
            const tareasPorPaginas = (pagina - 1) * limite;
            let items = todos.slice(tareasPorPaginas, limite + tareasPorPaginas);            

            if (pagina >= x) {
              siguiente.classList.add("hidden");
              anterior.classList.remove("hidden");             
                nuevaTareaGuardada()             
            } else if (pagina < x) {
              siguiente.classList.remove("hidden");
              anterior.classList.remove("hidden");             
                nuevaTareaGuardada()         
            }
            if (pagina >= 2 && pagina < x) {
              document.getElementById("btnAnterior").classList.remove("hidden");
              document.getElementById("btnSiguiente").classList.remove("hidden");
              siguiente.classList.remove("hidden");
              anterior.classList.remove("hidden");
            }
        })
    }catch (error) {
      console.log('Error al adelantar pagina: ' + error);  
    }
  }
}

/** La funcion eliminarElementos se encarga de eliminar una sola tarea */
async function eliminarElementos(e) {
  let modalConfirmado = document.getElementById("modalConfirmar");
  let modalConfirmar1 = document.getElementById("modalConfirmar1");
  let modalConfirmar2 = document.getElementById("modalConfirmar2");
  let menufiltrado = document.getElementById("menufiltrado");
  let medio = document.getElementById("medio");
  let medio2 = document.getElementById("medio2");

  const borrarUnaTarea = e.target.closest(".js-delete");

  if (!borrarUnaTarea) return;
  id = borrarUnaTarea.id;

  menufiltrado.classList.add("hidden");
  medio.classList.remove("subModalConfirmar");
  medio2.classList.add("hidden");
  modalConfirmar1.classList.add("w-[100%]");
  modalConfirmar2.classList.add("w-[100%]");
  modalConfirmar2.classList.add("right-0");
  body.classList.add("overflow-y-hidden");
  alerta.innerHTML = "Desea eliminar esta tarea?";

  modalConfirmado.innerHTML = `<button id="${id}" class="aceptar text-[#493b27] text-[13px] font-[500] border-[2px] w-[100px] border-[#ebd6de] h-[30px] rounded-[30px] bg-[#f8dcdb] font-semibold hover:bg-white hover:text-[#493b27] hover:border-1 hover:border-[#493b27]">Aceptar</button>
                               <button id="cancelar" class="text-[#493b27] text-[13px] font-[500] border-[2px] w-[100px] border-[#ebd6de] h-[30px] rounded-[30px] bg-[#f8dcdb] font-semibold hover:bg-white hover:text-[#493b27] hover:border-1 hover:border-[#493b27]">Cancelar</button>
                              `;
  let aceptar = document.querySelector(".aceptar");
  let cancelar = document.getElementById("cancelar");

  aceptar.addEventListener('click', async () => {
    if (aceptar.id == id) {
      const respuesta = await fetch(`http://localhost:3000/api/eliminar-individual/id`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id
        })
      })
      const respuestaJson = await respuesta.json();
      const borrarTareaIndividual = respuestaJson.status;  
  
      if (borrarTareaIndividual == 'eliminada') {
        document.getElementById("pagina").innerHTML = "";
        nuevaTareaGuardada(id)
        medio.classList.add("subModalConfirmar");
        modalConfirmar1.classList.remove("w-[100%]");
        modalConfirmar2.classList.remove("w-[100%]");
        modalConfirmar2.classList.remove("right-0");
        body.classList.remove("overflow-y-hidden");
      }
    }
  })
  
  cancelar.addEventListener("click", () => {
    medio.classList.add("subModalConfirmar");
    modalConfirmar1.classList.remove("w-[100%]");
    modalConfirmar2.classList.remove("w-[100%]");
    modalConfirmar2.classList.remove("right-0");
    body.classList.remove("overflow-y-hidden");
  });
}

async function eliminarListaCompleta(e) {
  let modalConfirmado = document.getElementById("modalConfirmar");
  let modalConfirmar1 = document.getElementById("modalConfirmar1");
  let modalConfirmar2 = document.getElementById("modalConfirmar2");
  let menufiltrado = document.getElementById("menufiltrado");
  let medio = document.getElementById("medio");
  let medio2 = document.getElementById("medio2");  
  let id = 0;
  const borrarTodasTarea = e.target.closest(".borrado");

  if (!borrarTodasTarea) return;

  menufiltrado.classList.add("hidden");
  medio.classList.remove("subModalConfirmar");
  medio2.classList.add("hidden");
  modalConfirmar1.classList.add("w-[100%]");
  modalConfirmar2.classList.add("w-[100%]");
  modalConfirmar2.classList.add("right-0");
  body.classList.add("overflow-y-hidden");
  alerta.innerHTML = "Desea eliminar todas las tareas?";
  modalConfirmado.innerHTML = `<button id="${id}" class="aceptar text-[#493b27] text-[13px] font-[500] border-[2px] w-[100px] border-[#ebd6de] h-[30px] rounded-[30px] bg-[#f8dcdb] font-semibold hover:bg-white hover:text-[#493b27] hover:border-1 hover:border-[#493b27]">Aceptar</button>
                               <button id="cancelar" class="text-[#493b27] text-[13px] font-[500] border-[2px] w-[100px] border-[#ebd6de] h-[30px] rounded-[30px] bg-[#f8dcdb] font-semibold hover:bg-white hover:text-[#493b27] hover:border-1 hover:border-[#493b27]">Cancelar</button>
                              `;

  let aceptar = document.querySelector(".aceptar");
  let cancelar = document.getElementById("cancelar");

  aceptar.addEventListener('click', async () => {    
      const respuesta = await fetch(`http://localhost:3000/api/eliminar-todas`, {
        method: 'DELETE'
      })
      const respuestaJson = await respuesta.json();
      const borrarTareaTodas = respuestaJson.status;
  
      if (borrarTareaTodas == 'eliminadas') {
        observador()
        medio.classList.add("subModalConfirmar");
        modalConfirmar1.classList.remove("w-[100%]");
        modalConfirmar2.classList.remove("w-[100%]");
        modalConfirmar2.classList.remove("right-0");
        body.classList.remove("overflow-y-hidden");
        siguiente.classList.add("hidden");
        anterior.classList.add("hidden");
        document.getElementById("pagina").innerHTML = "";
      }
  })
  
  cancelar.addEventListener("click", () => {
    medio.classList.add("subModalConfirmar");
    modalConfirmar1.classList.remove("w-[100%]");
    modalConfirmar2.classList.remove("w-[100%]");
    modalConfirmar2.classList.remove("right-0");
    body.classList.remove("overflow-y-hidden");
  });
}

/** La funcion eliminarMarcados se encarga de eliminar solo las tareas marcadas */
async function eliminarMarcados(e) {
  let modalConfirmado = document.getElementById("modalConfirmar");
  let modalConfirmar1 = document.getElementById("modalConfirmar1");
  let modalConfirmar2 = document.getElementById("modalConfirmar2");
  let menufiltrado = document.getElementById("menufiltrado");
  let medio = document.getElementById("medio");
  let medio2 = document.getElementById("medio2");  
  let id = 0;
  const borrarMarcado = e.target.closest(".marcado");

  if (!borrarMarcado) return;
  menufiltrado.classList.add("hidden");
  medio.classList.remove("subModalConfirmar");
  medio2.classList.add("hidden");
  modalConfirmar1.classList.add("w-[100%]");
  modalConfirmar2.classList.add("w-[100%]");
  modalConfirmar2.classList.add("right-0");
  body.classList.add("overflow-y-hidden");
  alerta.innerHTML = "Desea eliminar las tareas marcadas?";
  modalConfirmado.innerHTML = `<button id="${id}" class="aceptar text-[#493b27] text-[13px] font-[500] border-[2px] w-[100px] border-[#ebd6de] h-[30px] rounded-[30px] bg-[#f8dcdb] font-semibold hover:bg-white hover:text-[#493b27] hover:border-1 hover:border-[#493b27]">Aceptar</button>
                               <button id="cancelar" class="text-[#493b27] text-[13px] font-[500] border-[2px] w-[100px] border-[#ebd6de] h-[30px] rounded-[30px] bg-[#f8dcdb] font-semibold hover:bg-white hover:text-[#493b27] hover:border-1 hover:border-[#493b27]">Cancelar</button>
                              `;
  
  let aceptar = document.querySelector(".aceptar");
  let cancelar = document.getElementById("cancelar");

  aceptar.addEventListener('click', async () => {    
      const respuesta = await fetch(`http://localhost:3000/api/eliminar-marcadas`, {
        method: 'DELETE'
      })
      const respuestaJson = await respuesta.json();
      const borrarTareaMarcadas = respuestaJson.status;
  
      if (borrarTareaMarcadas == 'eliminadas') {
        document.getElementById("pagina").innerHTML = "";
        nuevaTareaGuardada(id)
        medio.classList.add("subModalConfirmar");
        modalConfirmar1.classList.remove("w-[100%]");
        modalConfirmar2.classList.remove("w-[100%]");
        modalConfirmar2.classList.remove("right-0");
        body.classList.remove("overflow-y-hidden");
      }
  })
  
  cancelar.addEventListener("click", () => {
    medio.classList.add("subModalConfirmar");
    modalConfirmar1.classList.remove("w-[100%]");
    modalConfirmar2.classList.remove("w-[100%]");
    modalConfirmar2.classList.remove("right-0");
    body.classList.remove("overflow-y-hidden");
  });
}

/** La funcion cambiarEstadoTarea se encarga de marcar las tareas ya realizadas */
async function cambiarEstadoTarea(e) {
  const statuTarea = e.target.closest('input[type="checkbox"]');
  const claseTarea = e.target.closest('input[type="checkbox"]');

  if (!statuTarea) return;
  const status = statuTarea.checked ? "completed" : "pending";
  const clase = claseTarea.checked ? "marcar" : "desmarcar";
  let id = statuTarea.id;
    const respuesta = await fetch(`http://localhost:3000/api/update-estatus-clase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        status,
        clase
      })
    })
    const respuestaJson = await respuesta.json();
    const updateTareaIndividual = respuestaJson.status;  

    if (updateTareaIndividual == 'actualizada') {
      nuevaTareaGuardada(id)
    }
}

/** La funcion actualizarTareas se encarga de que al editar la tarea se guarde con
 el nuevo nombre */
 async function actualizarTareas(e) {
  let menufiltrado = document.getElementById("menufiltrado");
  let cambiarIconoActualizarTarea = e.target.closest(".cambiarIcono");
  let tarea = "";
  const botonEditarUnaTarea = e.target.closest(".js-edit");

  if (!botonEditarUnaTarea) return;

  const id = botonEditarUnaTarea.id;
  const input = botonEditarUnaTarea.closest("li").querySelector('input[type="text"]');

  menufiltrado.classList.add("hidden");
  cambiarIconoActualizarTarea.classList.remove("ri-pencil-fill");
  botonEditarUnaTarea.classList.remove("circulos");
  cambiarIconoActualizarTarea.classList.add("ri-edit-box-fill");
  botonEditarUnaTarea.classList.add("circulosEditando");
  
  if (input.hasAttribute("readonly")) {
    input.removeAttribute("readonly");
    document.getElementById("estadoTarea").innerHTML = "Editando Tarea...";
  } else {
    document.getElementById("estadoTarea").innerHTML = "";
    input.setAttribute("readonly", "");
    
    tarea = input.value;
    const respuesta = await fetch(`http://localhost:3000/api/update-tarea`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        tarea
      })
    })

    const respuestaJson = await respuesta.json();
    const updateTarea = respuestaJson.status;  

    if (updateTarea == 'actualizada') {
      barraDeProgreso()
      nuevaTareaGuardada(id)
    }
  }
}

/** El siguiente evento se encarga de mostrar un texto parpadeante si se hace un
 click fuera de la pantalla modal */
confirmarModal.addEventListener("click", () => {
  alerta.classList.add("text-3xl");
  alerta.classList.add("parpadea", "texto");
  setTimeout(() => {
    alerta.classList.remove("parpadea", "texto");
    alerta.classList.remove("text-3xl");
  }, 3000);
});

/** La funcion barraDeProgreso se encarga de mostrar una barra miestras se procesan
 los datos */
function barraDeProgreso() {
  barraProgreso.classList.remove("ocultarTarea");
  setTimeout(() => {
    barraProgreso.classList.add("ocultarTarea");
    document.getElementById("estadoTarea").innerHTML = "";
  }, 1000);
}

/** La funcion contarCerrarSesion se encarga de contar los segundos de inactividad
 y al llegar al tope se cierra la sesion automaticamente */
 function contarCerrarSesion(e) {
  if (e.target) {
    n = 0;
    window.setInterval(function () {
      n++;
      if (n == 360000) {
        logOut();
      }
    }, 1000);
  }
}

async function observador() {
  const respuestaUsuario = await fetch(`http://localhost:3000/usuario_activo`)
  const datosUsuario = await respuestaUsuario.json();
  const usuarioActivo = datosUsuario.nombre;
  document.getElementById('nombreUsua').innerHTML = `${usuarioActivo}`;
  
  fecha();
  mostrarTareas()
}

observador()