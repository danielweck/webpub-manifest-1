/* Very early demo, only supports offline viewing with a Service Worker.
Check the full list of expected features at: 
https://github.com/HadrienGardeur/webpub-manifest/wiki/Web-Publication-JS
*/

(function() {
  var installingMsg = document.querySelector('.installing-msg');
  if (!navigator.serviceWorker) {
    installingMsg.textContent = "Service worker not supported";
    return;
  }
      
  navigator.serviceWorker.register('cache.js');
  navigator.serviceWorker.ready.then(function() {
    console.log('ready');
  });
}());