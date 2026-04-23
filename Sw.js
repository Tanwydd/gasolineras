const CACHE_NAME = 'carburantes-v1';
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap'
];

// ── INSTALL: cachear assets estáticos ─────────────────
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// ── ACTIVATE: limpiar caches viejas ───────────────────
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE_NAME; })
            .map(function(k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

// ── FETCH: estrategia según tipo de recurso ───────────
self.addEventListener('fetch', function(e) {
  var url = new URL(e.request.url);

  // API del Ministerio → Network first, fallback a cache
  if (url.hostname === 'sedeaplicaciones.minetur.gob.es') {
    e.respondWith(
      fetch(e.request)
        .then(function(res) {
          // Guardar copia fresca en cache
          var clone = res.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(e.request, clone);
          });
          return res;
        })
        .catch(function() {
          // Sin red → servir desde cache (datos de última consulta)
          return caches.match(e.request).then(function(cached) {
            if (cached) return cached;
            // Si no hay cache de la API, devolver respuesta vacía graceful
            return new Response(
              JSON.stringify({ ListaEESSPrecio: [], Fecha: 'Sin conexión - datos en caché no disponibles' }),
              { headers: { 'Content-Type': 'application/json' } }
            );
          });
        })
    );
    return;
  }

  // Google Fonts → Cache first
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(
      caches.match(e.request).then(function(cached) {
        return cached || fetch(e.request).then(function(res) {
          var clone = res.clone();
          caches.open(CACHE_NAME).then(function(cache) { cache.put(e.request, clone); });
          return res;
        });
      })
    );
    return;
  }

  // Todo lo demás (HTML, JS, iconos) → Cache first, fallback network
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      return cached || fetch(e.request).then(function(res) {
        var clone = res.clone();
        caches.open(CACHE_NAME).then(function(cache) { cache.put(e.request, clone); });
        return res;
      });
    })
  );
});
