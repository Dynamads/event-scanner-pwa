const CACHE_NAME = 'event-scanner-cache-v1';
const urlsToCache = [
  '/',
  '/?view=scanner',
  '/manifest.json',
  'https://unpkg.com/html5-qrcode',  // external library
  // Add any other assets you want cached here
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});