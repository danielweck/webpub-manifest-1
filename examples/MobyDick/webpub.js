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

  if (navigator.serviceWorker.controller) {
  	var manifest_url = document.querySelector("link[rel='manifest'][type='application/webpub+json']").href
  	if (manifest_url) {
  		cacheSpine(manifest_url);
    }
  };

  function cacheSpine(url) {
    fetch(url).then(function(response) {
      return response.json();}).then(function(manifest) {
        return manifest.spine.map(function(el) { return el.href});}).then(function(data) {
          console.log(data);
          return caches.open("Publication").then(function(cache) {
            return cache.addAll(data.map(function(url) {return new URL(url, "https://hadriengardeur.github.io/webpub-manifest/examples/MobyDick/");}));
          });
        })
  };

}());