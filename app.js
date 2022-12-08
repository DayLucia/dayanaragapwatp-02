navigator.serviceWorker.register('/sw.js');
const btnSave = document.querySelector('#btn-save');
const textArea = document.querySelector('#text-1');
const inputTitle = document.querySelector('#text-2');
let modalInfo = document.querySelector('#modalInfo');
let container = document.querySelector('.collection');
let contador = -1;
let lista = [];

document.addEventListener('DOMContentLoaded', function() {
  let sideNav = document.querySelectorAll('.sidenav');
    let instanciaSide = M.Sidenav.init(sideNav  , {});

    let modal = document.querySelectorAll('.modal');
    let instanciaModal = M.Modal.init(modal, {});

    lista = leerNotas();
    renderizarNotas(lista);
});

/* - FUNCION 1:  Obtiene el texto del textArea y guarda en el texto en el array - */
btnSave.addEventListener('click', ()=>{
  //Obtengo el texto
  let texto = textArea.value;
  let titulo = inputTitle.value;
  console.log(texto, 'textarea texto');
  //Obtengo la fecha
  let tiempo = Date.now();
  let date = new Date(tiempo);
  let fecha = date.toLocaleDateString();
  console.log(fecha, 'fecha');

  //Creo la variable que tendrá la nota
  let nota;

  //Verifico y creo la notita
  if(texto != ""){
    contador ++;
    nota = {
      titulo : titulo,
      notita : texto,
      fecha  : fecha,
      id     : contador,
    }
    contador = contador;
    console.log(contador, 'contador antes del push');
    lista.push(nota);
    };
    
    // actualizo contador
    
    //limpio textarea
    textArea.value   = '';  
    inputTitle.value = '';  

    
    console.log(lista, 'notitas');
  // console.log(lista, 'notitas');
  guardarNotas(lista);
})

/* -------- FUNCION 2: Recibe el array y lo guarda en el localStorage ------- */
function guardarNotas(array){
  
  localStorage.setItem('nota',JSON.stringify(array));

  renderizarNotas(lista);
}

/* --------- FUNCION 3: Lee los datos del localStorage y lo retorna --------- */
function leerNotas(){
    if(localStorage.nota){
      let traerNota = localStorage.getItem('nota')  
      lista = JSON.parse(traerNota);
      console.log(lista, 'lista json')
        return lista;
  } else{
    console.log('No hay notitas disponibles.')
    return lista;
  }
}

/****************FUNCTION PARA TRAER INFO POR ID*****************/
function infoModal(id, array){
  let dato = ``;
  array.forEach(datos => {
    if(datos.id == id){
      console.log(datos.id, id)
      dato = `
        <div class="divModal">
          <h3>${datos.titulo}</h3>
          <p>${datos.notita}</p>
          <p class="fechaModal">${datos.fecha}</p>
        </div>
      `;
      modalInfo.innerHTML = dato;
      // let btnclose = document.querySelector('#btnCerrar');
      // console.log(btnclose);
      // btnclose.addEventListener('click', (e) =>{
      //   modalInfo.innerHTML = ``;
      // })
    }
  });
}

/*****************FUNCTION PARA ELIMINAR NOTA*********************/
function borrarNota(e){
  let id     = e.currentTarget.id;
  let indice = lista.indexOf(id);
  console.log(indice)
  if(indice != -1){
    lista.splice(indice, 1);
  }else{
    console.log('no se encontro la notita en el array')
  }

  JSON.parse(localStorage.getItem('nota'));
  localStorage.setItem('nota', JSON.stringify(lista))
  renderizarNotas(lista);
  // guardarNotas();
  // leerNotas()
}
/* -------- FUNCION 4: Recibe el array y lo renderiza en el container ------- */
function renderizarNotas(array){
  // console.log(modal);
  // let htmlModal = ``;
  let html= ``;
  if(array.length == 0){
    html = `<li class="noNotas">¡Ups, aun no añadiste notitas!</li>`;
    return container.innerHTML = html;
  }else{
    array.forEach(dato => {
      html += `
      <div class="cardCont modal-trigger" href="#modal2">
      <a class="cont-flex center waves-effect waves-light modal-trigger eventoModal" href="#modal2" id="${dato.id}">
          <li class="fecha">${dato.fecha}</li>
          <li class="titulo">${dato.titulo}</li>
          </a>
          <li class="btnDeleteCss material-icons small delete" id="${dato.id}" style="z-index="500">delete</li>
          </div>
          `
          container.innerHTML = html;
          
          /*****************INFO COMPLETA MODAL*******************/
          htmlModal = `
          <div class="divModal">
          <h3>${dato.titulo}</h3>
          <p>${dato.notita}</p>
          </div>
          `;
          document.querySelector('.footer-modal').innerHTML = `
          <p class="fechaModal">${dato.fecha}</p>
          <a id="btnCerrar" href="#!" class="modal-close waves-effect waves-green btn-flat modal-cerrar">Cerrar</a>
        
          `;
          modalInfo.innerHTML = htmlModal;

          /************************PROBLEMAS CON EL ID***********************/
          // console.log(modalEvent);
          
          // let modalEvent = document.querySelector('.eventoModal');
          // // console.log(modalEvent);
          // modalEvent.addEventListener('click', function(e) {
            
          //   modalInfo.innerHTML = htmlModal;
            
          // })
      // modalEvent.addEventListener('click', infoModal(dato.id, array));  
        // let contenido = infoModal(dato.id, array);
        // // console.log(e)
        // //   modalInfo.innerHTML += `
        // //     <div class="divModal">
        // //       <h3>${dato.titulo}</h3>
        // //       <p>${dato.notita}</p>
        // //       <p class="fechaModal">${dato.fecha}</p>
        // //     </div>
        // //     `;
      // })
    // });
    // }
  // modalInfo.innerHTML = htmlModal;
    })

  let btnDelete = document.querySelector('.btnDeleteCss');
  
  btnDelete.addEventListener('click', e =>{
    console.log(e.currentTarget.id, 'id Nota');
    // if(lista.length != 0){
      borrarNota(e)
  // }
  })}




/**********************CACHE************************/

//CREAMOS CACHE.

let nonitasCache = 'NonitasCache';
caches.open(nonitasCache);


//VERIFICAMOS SI EXISTE.
caches.has(nonitasCache).then(respuesta =>{
  console.log(respuesta, 'NonitasCache existe');
});

//AGREGAMOS MULTIPLES ELEMENTOS AL CACHE.

caches.open(nonitasCache).then(cache =>{
  cache.add('index.html');
  cache.add('app.js');
  cache.add('css/style.css');
  // cache.add('sw.js');
  cache.add('https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css');
  cache.add('https://fonts.googleapis.com/icon?family=Material+Icons');
  cache.add('https://fonts.googleapis.com/css2?family=Abel&family=Fredoka+One&family=Lobster&display=swap');
  cache.add('https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js');
  cache.add('icons/android-icon-72x72.png');
  cache.add('icons/android-icon-48x48.png');
  cache.add('icons/android-icon-36x36.png');
})}
