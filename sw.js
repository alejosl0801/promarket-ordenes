const CACHE = 'pm-v1';
const ASSETS = ['./', './index.html', './manifest.json'];
self.addEventListener('install', e => e.waitUntil(caches.addAll(ASSETS)));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))));
