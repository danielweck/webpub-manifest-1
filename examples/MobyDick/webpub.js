/* 
Very early demo, that does two things:
- cache resources necessary for reading the publication offline
- generates a Web App Manifest (if you activate the sw-toolbox variant)

This script checks if the manifest file is stored in the cache, and only precaches resources if it isn't.

Check the full list of expected features at: 
https://github.com/HadrienGardeur/webpub-manifest/wiki/Web-Publication-JS
*/

(function() {

  if (navigator.serviceWorker) {
    //Basic SW
    navigator.serviceWorker.register('sw.js');

    //SW based on sw-toolbox that also generates the Web App Manifest
    //navigator.serviceWorker.register('sw-toolobox-cache.js');
  
    navigator.serviceWorker.ready.then(function() {
      console.log('SW ready');
    }); 
  };

  var manifest = document.querySelector("link[rel='manifest'][type='application/webpub+json']");
  if(manifest){ var manifest_url = manifest.href};
  var appmanifest = document.querySelector("link[rel='manifest'][type='application/manifest+json']").href;

  if (appmanifest_url && !manifest_url) {
    fetch(appmanifest_url).then(function(response) {
      return response.json();}).then(function(document){
        if (document.publication) {
          manifest_url = new URL(document.publication, appmanifest_url).href;
          return manifest_url.href;
        }})
  };

  if (manifest_url) {
      
    caches.open(manifest_url).then(function(cache) {
      return cache.match(manifest_url).then(function(response){
        if (!response) {
          console.log("No cache key found");
          console.log('Caching manifest at:'+manifest_url);
          return cacheManifest(manifest_url);
        } else {
          console.log("Found cache key");
        }
      })
    });
      
  } else {
    console.log('No Web Publication Manifest detected');
  };

  function getManifest(url) {
    return fetch(url).then(function(response) {
      return response.json();})
  };
  
  function cacheURL(data) {
    return caches.open(manifest_url).then(function(cache) {
      return cache.addAll(data.map(function(url) {return new URL(url, manifest_url);}));
    });
  };

  function cacheManifest(url) {
    return Promise.all([cacheSpine(getManifest(url)), cacheResources(getManifest(url))])
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