var CACHE_NAME = 'webpub-viewer';
var urlsToCache = [
  '/webpub-manifest/examples/viewer/index.html',
  '/webpub-manifest/examples/viewer/sandbox.html',
  '/webpub-manifest/examples/viewer/viewer.js',
  '/webpub-manifest/examples/comics-viewer/index.html',
  '/webpub-manifest/examples/comics-viewer/viewer.js',
  '/webpub-manifest/fetch.js',
  '/webpub-manifest/urlsearchparams.js',
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