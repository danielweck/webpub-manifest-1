/* 
Very early demo, that does two things:
- cache resources necessary for reading the publication offline
- generates a Web App Manifest (if you activate the sw-toolbox variant)
This is now done dynamically but too often, will need to figure out a way to trigger this event only once.

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
  navigator.serviceWorker.register('sw.js');

  //SW based on sw-toolbox that also generates the Web App Manifest
  //navigator.serviceWorker.register('sw-toolobox-cache.js');
  
  navigator.serviceWorker.ready.then(function() {
    console.log('SW ready');
  });

  //if (navigator.serviceWorker.controller) {
  	var manifest_url = document.querySelector("link[rel='manifest'][type='application/webpub+json']").href

    if (manifest_url) {
      
      caches.open(manifest_url).then(function(cache) {
        return cache.match(manifest_url).then(function(response){
          if (!response) {
            console.log("No cache key found");
            console.log('Caching manifest at:'+manifest_url);
            var webpub = getManifest(manifest_url)
            cacheSpine(webpub);
            cacheResources(webpub);
          } else {
            console.log("Found cache key");
          }
        })
      });
      
    } else {
      console.log('No Web Publication Manifest detected');
    }
  //};

  function getManifest(url) {
    return fetch(url).then(function(response) {
      return response.json();})
  };
  
  function cacheURL(data) {
    return caches.open(manifest_url).then(function(cache) {
      return cache.addAll(data.map(function(url) {return new URL(url, location.href);}));
    });
  };

  function cacheSpine(webpub) {
    webpub.then(function(manifest) {
      return manifest.spine.map(function(el) { return el.href});}).then(function(data) {
        data.push(manifest_url);
        return cacheURL(data);})
  };

  function cacheResources(webpub) {
    webpub.then(function(manifest) {
      return manifest.resources.map(function(el) { return el.href});}).then(function(data) {return cacheURL(data);})
  };

}());