if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('https://daylucia.github.io/dayanaragapwatp-02/sw.js').then(function(registration) {
        // Si es exitoso
        console.log('SW registrado correctamente');
      })})} else{
        console.log('fallo al registrar SW')
      };