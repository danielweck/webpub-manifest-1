(global => {
  'use strict';

  // Load the sw-toolbox library.
  importScripts('bower_components/sw-toolbox/sw-toolbox.js');
  
  // Debug mode
  global.toolbox.options.debug = true;

  toolbox.precache([
      'index.html',
      'html/toc.html',
      'html/copyright.html',
      'html/introduction.html',
      'html/epigraph.html',
      'html/c001.html',
      'html/c002.html',
      'html/c003.html',
      'html/c004.html',
      'html/c005.html',
      'html/c006.html',
      'css/mobydick.css',
      'fonts/STIXGeneral.otf',
      'fonts/STIXGeneralBol.otf',
      'fonts/STIXGeneralBolIta.otf',
      'fonts/STIXGeneralItalic.otf'
    ]);

  toolbox.router.get('manifest.app', function(request) {
    return new Response('{"name": "Moby Dick"}');
  });

  global.toolbox.router.default = global.toolbox.fastest;

  // Ensure that our service worker takes control of the page as soon as possible.
  global.addEventListener('install', event => event.waitUntil(global.skipWaiting()));
  global.addEventListener('activate', event => event.waitUntil(global.clients.claim()));
})(self);