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
  if(manifest) {var manifest_url = manifest.href};
  var appmanifest = document.querySelector("link[rel='manifest'][type='application/manifest+json']");
  if(appmanifest) {var appmanifest_url = appmanifest.href};

  if (manifest_url) {
    verifyAndCacheManifest(manifest_url);
  } if (appmanifest_url) {
    getManifestFromAppManifest(appmanifest_url).then(function(manifest_url){verifyAndCacheManifest(manifest_url)});
  }
  else {
    console.log('No manifest detected');
  };

  function getManifest(url) {
    return fetch(url).then(function(response) {
      return response.json();})
  };

  function getManifestFromAppManifest(url) {
    return fetch(appmanifest_url).then(function(response) {
      return response.json();}).then(function(document){
        if (document.publication) {
          var manifest_url = new URL(document.publication, appmanifest_url).href;
          console.log("Detected publication in Web App Manifest at: "+manifest_url);
          return manifest_url;
      }})
  }

  function verifyAndCacheManifest(url) {
    return caches.open(url).then(function(cache) {
      return cache.match(url).then(function(response){
        if (!response) {
          console.log("No cache key found");
          console.log('Caching manifest at:'+url);
          return cacheManifest(url);
        } else {
          console.log("Found cache key");
        }
      })
    });
  };
  
  function cacheURL(data) {
    return caches.open(manifest_url).then(function(cache) {
      return cache.addAll(data.map(function(url) {
        console.log("Caching "+url+" with base URI set to "+manifest_url);
        return new URL(url, manifest_url);
      }));
    });
  };

  function cacheManifest(url) {
    var manifestJSON = getManifest(url);
    return Promise.all([cacheSpine(manifestJSON), cacheResources(manifestJSON)])
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