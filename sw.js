// Deck Build Estimator — service worker.
// Strategy: NETWORK-FIRST for page navigations (an online visit always gets the newest
// app; the cached copy is the offline fallback), CACHE-FIRST for the vendored libs and
// static assets. Bump CACHE_VERSION on any deploy that must invalidate old caches.
const CACHE_VERSION = 'deck-estimator-v1';
const THREE_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
const PRECACHE = [
  './',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE_VERSION);
    // Same-origin shell — required.
    await cache.addAll(PRECACHE);
    // three.js from the CDN — cached as an opaque no-cors response so the 3D preview
    // works offline. Non-fatal if the CDN hiccups during install (runtime-cached later).
    try { await cache.add(new Request(THREE_CDN, { mode: 'no-cors' })); } catch (err) {}
    self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== CACHE_VERSION) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Page loads: network-first, offline falls back to the cached app shell.
  if (req.mode === 'navigate' || req.destination === 'document') {
    e.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        const cache = await caches.open(CACHE_VERSION);
        cache.put('./', fresh.clone());
        return fresh;
      } catch (err) {
        return (await caches.match('./')) || (await caches.match(req)) || Response.error();
      }
    })());
    return;
  }

  // three.js CDN + same-origin assets: cache-first with runtime backfill.
  if (url.href === THREE_CDN || url.origin === self.location.origin) {
    e.respondWith((async () => {
      const hit = await caches.match(req, { ignoreSearch: url.origin === self.location.origin });
      if (hit) return hit;
      const res = await fetch(url.href === THREE_CDN ? new Request(THREE_CDN, { mode: 'no-cors' }) : req);
      if (res && (res.ok || res.type === 'opaque')) {
        const cache = await caches.open(CACHE_VERSION);
        cache.put(req, res.clone());
      }
      return res;
    })());
  }
});
