self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    /*
    This should be handled dynamically by finding the manifest on the page
    and then caching all items listed in spine & resources. 
    This is a temp version where all resources are specified in the SW.*/
    
    caches.open('Publication-assets').then(c => c.addAll([
      'css/mobydick.css',
      'fonts/STIXGeneral.otf',
      'fonts/STIXGeneralBol.otf',
      'fonts/STIXGeneralBolIta.otf',
      'fonts/STIXGeneralItalic.otf',
      'manifest.json'
    ]))
  );
});

self.addEventListener('activate', event => {
  clients.claim();
});

/*
For a publication, it seems better to do network then cache than the opposite.
Could be problematic when the network is very slow, but has the benefit of being fresh.
*/

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );

});
