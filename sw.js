var CACHE_NAME = 'webpub-viewer';
var urlsToCache = [
  '/webpub-manifest/examples/viewer/',
  '/webpub-manifest/examples/viewer/index.html',
  '/webpub-manifest/examples/viewer/sandbox.html',
  '/webpub-manifest/examples/viewer/viewer.js',
  '/webpub-manifest/examples/comics-viewer/',
  '/webpub-manifest/examples/comics-viewer/index.html',
  '/webpub-manifest/examples/comics-viewer/viewer.js',
  '/webpub-manifest/webpub.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  clients.claim();
});

/*
Cache then network. 
If the response is found in the cache after a network response, the cache is updated
*/

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      var fetchPromise = fetch(event.request).then(function(networkResponse) {
        var cacheName = whoHasRequest(networkResponse.clone());
        if(cacheName) {
          caches.open(cacheName).then(function(cache){
            cache.put(event.request, networkResponse.clone());
          })
        }
        return networkResponse;
      })
      return response || fetchPromise;
    })
  );
});

async function whoHasRequest(request) {
  //const resp = await caches.match(request);
  //if (!resp) return null;
  for (const key of await caches.keys()) {
    const cache = await caches.open(key);
    if (await cache.match(request)) {
      return key;
    }
  }
  return null;
}