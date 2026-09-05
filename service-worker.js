'use strict';

// Change this version whenever a published app file changes. Installing the
// new worker fills a fresh cache; activating it removes this app's old caches.
const CACHE_NAME = 'rf-attenuator-v1';
const CACHE_PREFIX = 'rf-attenuator-';
const INDEX_URL = new URL('./index.html',self.location).href;
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon.svg',
  './icons/apple-touch-icon.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install',event=>{
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache=>cache.addAll(APP_SHELL))
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys()
      .then(names=>Promise.all(
        names
          .filter(name=>name.startsWith(CACHE_PREFIX) && name!==CACHE_NAME)
          .map(name=>caches.delete(name))
      ))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET') return;

  const url=new URL(request.url);
  if(url.origin!==self.location.origin) return;

  if(request.mode==='navigate'){
    event.respondWith(
      fetch(request)
        .then(async response=>{
          if(response.ok){
            const copy=response.clone();
            const cache=await caches.open(CACHE_NAME);
            await cache.put(INDEX_URL,copy);
          }
          return response;
        })
        .catch(()=>caches.match(INDEX_URL))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached=>{
      if(cached) return cached;
      return fetch(request).then(async response=>{
        if(response.ok && response.type==='basic'){
          const copy=response.clone();
          const cache=await caches.open(CACHE_NAME);
          await cache.put(request,copy);
        }
        return response;
      });
    })
  );
});
