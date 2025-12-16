// Service Worker for Nukleo Digital
// Provides offline caching and performance improvements

const CACHE_NAME = 'nukleo-digital-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/Nukleo_blanc_RVB.svg',
  '/fonts/AktivGrotesk-Light.woff2',
  '/fonts/AktivGrotesk-Regular.woff2',
  '/fonts/AktivGrotesk-Bold.woff2',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('Failed to cache some assets:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip API requests
  if (url.pathname.startsWith('/api/')) {
    return;
  }

  // Skip admin routes
  if (url.pathname.startsWith('/admin')) {
    return;
  }

  // Cache strategy: Cache First for static assets, Network First for pages
  if (
    url.pathname.match(/\.(js|css|woff2?|png|jpg|jpeg|svg|webp|ico)$/) ||
    url.pathname.startsWith('/assets/')
  ) {
    // Static assets: Cache First
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        return cachedResponse || fetch(request).then((response) => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200) {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
          return response;
        });
      })
    );
  } else {
    // Pages: Network First, fallback to cache
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful responses
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          // Fallback to cache if network fails
          return caches.match(request).then((cachedResponse) => {
            // Fallback to index.html for SPA routing
            if (!cachedResponse && request.mode === 'navigate') {
              return caches.match('/index.html');
            }
            return cachedResponse;
          });
        })
    );
  }
});

