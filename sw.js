/*------------------------------------------CACHE E INSTALACIÓN------------------------------------------------*/

const cacheName = 'cache-2';
self.addEventListener('install', function (e){
    console.log(e);
    const cache = caches.open(cacheName).then( cache => {
        return cache.addAll([
          '/',
          'index.html',
          'app.js',
          'icons/android-icon-72x72.png',
          'css/style.css',
          // 'sw.js',
        ])
    })
    e.waitUntil( cache );
})
self.addEventListener( 'fetch', e =>{
    const respuestaCache = caches.match(e.request).then( res => {
        if ( res) {
          return  res;
        }
        else {
            return fetch ( e.request).then (respuesta =>{
                caches.open(cacheName).then (cache =>{
                    cache.put(e.request, respuesta)
                })
            })
        }
    })
    e.respondWith(respuestaCache)
})

//ACTUALIZATE VALE