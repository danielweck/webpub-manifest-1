/* 
Very early demo, that does two things:
- cache resources necessary for reading the publication offline
- generates a Web App Manifest
For now, everything is static, will need to extract the info from the Web Publication manifest in the future.

Check the full list of expected features at: 
https://github.com/HadrienGardeur/webpub-manifest/wiki/Web-Publication-JS
*/

(function() {
  var installingMsg = document.querySelector('.installing-msg');
  if (!navigator.serviceWorker) {
    installingMsg.textContent = "Service worker not supported";
    return;
  }
      
  navigator.serviceWorker.register('sw-toolbox-cache.js');
  navigator.serviceWorker.ready.then(function() {
    console.log('ready');
  });
}());