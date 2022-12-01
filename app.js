// navigator.serviceWorker.register('/sw.js');
const btnSave = document.querySelector('#btn-save');
const textArea = document.querySelector('#text-1');
let container = document.querySelector('.collection');
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
    nota = {
      notita : texto,
      fecha : fecha,
    }
    lista.push(nota);
    };
    //push
    
    // btnSave.color.blue;

    //limpio textarea
    textArea.value = '';  

    
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

/* -------- FUNCION 4: Recibe el array y lo renderiza en el container ------- */
function renderizarNotas(array){
  let html= ``;
  if(array.length == 0){
    html = `<h1>¡Ups, aun no añadiste notitas!</h1>`;
  }else{
    array.forEach(dato => {
      html += `
              <li>${dato.fecha}</li>
              <li>${dato.notita}</li>`
            });
          }
          container.innerHTML = html;
  
}

/**********************CACHE************************/

//CREAMOS CACHE.

let nonitasCache = 'nonitasCache';
caches.open(nonitasCache);


//VERIFICAMOS SI EXISTE.
caches.has(nonitasCache).then(respuesta =>{
  console.log(respuesta, 'nonitasCache existe');
});

//AGREGAMOS MULTIPLES ELEMENTOS AL CACHE.

caches.open(nonitasCache).then(cache =>{
  cache.add('https://daylucia.github.io/dayanaragapwatp-02/index.html');
  cache.add('https://daylucia.github.io/dayanaragapwatp-02/app.js');
  cache.add('https://daylucia.github.io/dayanaragapwatp-02/css/style.css');
  cache.add('https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css');
  cache.add('https://daylucia.github.io/dayanaragapwatp-02/icons/android-icon-72x72.png');
  cache.add('https://daylucia.github.io/dayanaragapwatp-02/icons/android-icon-48x48.png');
  cache.add('https://daylucia.github.io/dayanaragapwatp-02/icons/android-icon-36x36.png');
});
// 'https://daylucia.github.io/dayanaragapwatp-02/index.html',
// 'https://daylucia.github.io/dayanaragapwatp-02/app.js',
// 'https://daylucia.github.io/dayanaragapwatp-02/css/style.css',
// 'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css',
// 'https://daylucia.github.io/dayanaragapwatp-02/icons/android-icon-72x72.png',
// 'https://daylucia.github.io/dayanaragapwatp-02/icons/android-icon-48x48.png',
// 'https://daylucia.github.io/dayanaragapwatp-02/icons/android-icon-36x36.png',