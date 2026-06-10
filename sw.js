const CACHE = 'pm-v27';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  // Borra TODA caché vieja para no servir versiones antiguas
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  // Nunca interceptar llamadas externas (Gemini, fuentes, etc.)
  if (!e.request.url.startsWith(self.location.origin)) return;
  // NETWORK-FIRST: siempre trae lo último si hay internet; cae a caché solo offline.
  // Así nunca se queda servida una versión vieja del HTML.
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
