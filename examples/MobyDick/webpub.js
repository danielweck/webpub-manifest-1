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
  
  //Basic SW
  navigator.serviceWorker.register('sw.js').then(function() {
    console.log('SW installed');
    var manifest_url = document.querySelector("link[rel='manifest'][type='application/webpub+json']").href
    if (manifest_url) {
      console.log('Manifest detected at:'+manifest_url);
      var webpub = getManifest(manifest_url)
      cacheSpine(webpub);
      cacheResources(webpub);
    }
  });
  //SW based on sw-toolbox that also generates the Web App Manifest
  //navigator.serviceWorker.register('sw-toolobox-cache.js');
  
  navigator.serviceWorker.ready.then(function() {
    console.log('SW ready');
  });

  //if (navigator.serviceWorker.controller) {
  	//var manifest_url = document.querySelector("link[rel='manifest'][type='application/webpub+json']").href
  	//if (manifest_url) {
      //console.log('Manifest detected at:'+manifest_url);
  		//cacheSpine(manifest_url);
      //cacheResources(manifest_url);
    //}
  //};

  function getManifest(url) {
    return fetch(url).then(function(response) {
      return response.json();})
  };
  
  function cacheResource(data) {
    return caches.open("Publication").then(function(cache) {
      return cache.addAll(data.map(function(url) {return new URL(url, location.href);}));
    });
  };

  function cacheSpine(webpub) {
    webpub.then(function(manifest) {
      return manifest.spine.map(function(el) { return el.href});}).then(function(data) {return cacheResource(data);})
  };

  function cacheSpine(webpub) {
    webpub.then(function(manifest) {
      return manifest.spine.map(function(el) { return el.href});}).then(function(data) {return cacheResource(data);})
  };

}());