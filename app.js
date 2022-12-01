navigator.serviceWorker.register('sw.js');
const btnSave = document.querySelector('#btn-save');
const textArea = document.querySelector('#text-1');
let container = document.querySelector('.collection');
let lista = [];
const cacheName = 'cache1';
// FORMATO:
//let lista = [ { nota: 'descripción de la nota', fecha: '17/11/2022'} ];

//CACHE
self.addEventListener('install', function(e){
  console.log(e, 'instalando');
  let cache = caches.open(cacheName).then(cache =>{
    return cache.addAll([
      'index.html',
      'app.js',
      'icon-72x72.png'
    ])
  })
  e.waitUntil(cache);
})

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
  console.log(texto, 'textarea texto');
  //Obtengo la fecha
  let tiempo = Date.now();
  let date = new Date(tiempo);
  let fecha = date.toLocaleDateString();
  console.log(fecha, 'fecha');

  //Creo la variable que tendrá la nota
  let nota;

  //Verifico y creo la notita
  if(texto.textLength !== 0){
    nota = {
      notita : texto,
      fecha : fecha,
    };
    // btnSave.color.blue;
    textArea = '';
    lista.push(nota);
  }
  console.log(lista, 'notitas');
  guardarNotas(lista);
})

/* -------- FUNCION 2: Recibe el array y lo guarda en el localStorage ------- */
function guardarNotas(nota){
  
  localStorage.setItem('nota',JSON.stringify(nota));

  renderizarNotas(nota);
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

/* -------- FUNCION 4: Recibe el array y lo renderiza en el container ------- */
function renderizarNotas(array){
  let html;
  if(array.length = 0){
    html = `<h1>¡Ups, aun no añadiste notitas!</h1>`;
  }else{
    array.forEach(dato => {
      html = `
              <p>${dato.fecha}</p>
              <p>${dato.notita}</p>`
    });

  }
  
}