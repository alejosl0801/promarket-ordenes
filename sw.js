const CACHE = 'pm-v4';
const ASSETS = ['./', './index.html', './manifest.json'];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Solo cachear recursos del mismo origen — nunca interceptar llamadas externas
  if (!e.request.url.startsWith(self.location.origin)) return;
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
