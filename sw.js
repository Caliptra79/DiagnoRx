/* DiagnoRx PWA service worker */
"use strict";
const CACHE_NAME = "diagnorx-shell-v5";
const APP_SHELL = [
  "./",
  "./index.html",
  "./js/clinical-safety.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/favicon-32.png",
  "./icons/apple-touch-icon.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => { /* Wait for explicit user consent before activating an update. */ })
  );
});

self.addEventListener("message", event => { if(event.data && event.data.type === "SKIP_WAITING") self.skipWaiting(); });

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key.startsWith("diagnorx-shell-") && key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) return;

  // Keep the active clinical app snapshot stable until update consent.
  // An installing worker pre-caches the next snapshot but will not activate itself.
  if (request.mode === "navigate") {
    event.respondWith(
      caches.open(CACHE_NAME)
        .then(cache => cache.match("./index.html"))
        .then(cached => cached || fetch(request))
        .catch(() => Response.error())
    );
    return;
  }

  // App shell assets: cache first, then update from network.
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
