if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('https://daylucia.github.io/dayanaragapwatp-02/sw.js').then(function(registration) {
        // Si es exitoso
        console.log('SW registrado correctamente');
      })})}
      else{
        console.log('fallo al registrar SW')
      };

const cacheName = 'cache-1';
self.addEventListener('install', function (e){
    console.log(e);
    const cache = caches.open('cacheName').then( cache => {
        return cache.addAll([
            'app.js',
            'index.html',
            'icons',
        ])
    })
    e.waitUntil( cache );
})
self.addEventListener( 'fetch', e =>{
    const respuestaCache = caches.match(e.request).then( res => {
        if ( res) {
            res;
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