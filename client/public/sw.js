// Service Worker for Nukleo Digital
// Provides offline caching and performance improvements

const CACHE_NAME = 'nukleo-digital-v2';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/Nukleo_blanc_RVB.svg',
  '/nukleo-arrow.svg',
  '/fonts/AktivGrotesk-Light.woff2',
  '/fonts/AktivGrotesk-Regular.woff2',
  '/fonts/AktivGrotesk-Bold.woff2',
  '/favicon.ico',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/icon-192x192.png',
  '/manifest.json',
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

  // Cache strategy: Stale-While-Revalidate for better performance
  if (
    url.pathname.match(/\.(js|css|woff2?|png|jpg|jpeg|svg|webp|ico)$/) ||
    url.pathname.startsWith('/assets/')
  ) {
    // Static assets: Stale-While-Revalidate (serve from cache immediately, update in background)
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          // Start fetching fresh version in background
          const fetchPromise = fetch(request).then((networkResponse) => {
            // Don't cache non-successful responses
            if (networkResponse && networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => {
            // Ignore network errors, we'll use cached version
            return null;
          });
          
          // Return cached version immediately if available, otherwise wait for network
          return cachedResponse || fetchPromise;
        });
      })
    );
  } else {
    // Pages: Stale-While-Revalidate (serve cached version immediately, update in background)
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          // Start fetching fresh version in background
          const fetchPromise = fetch(request).then((networkResponse) => {
            // Cache successful responses
            if (networkResponse && networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => {
            // If network fails and we have cached version, use it
            return cachedResponse || null;
          });
          
          // Return cached version immediately if available, otherwise wait for network
          if (cachedResponse) {
            // Update cache in background without blocking
            fetchPromise.catch(() => {});
            return cachedResponse;
          }
          
          // If no cache, wait for network
          return fetchPromise.then((networkResponse) => {
            // Fallback to index.html for SPA routing if network fails
            if (!networkResponse && request.mode === 'navigate') {
              return cache.match('/index.html');
            }
            return networkResponse;
          });
        });
      })
    );
  }
});

