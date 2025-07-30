const CACHE_NAME = 'mundo-musical-v1';
const urlsToCache = [
  '/',
  '/videos',
  '/admin/login',
  '/admin/dashboard',
  '/icons/dino-icon.png',
  '/images/dino&family/dino_cp.png',
  '/images/dino&family/dininho.png',
  '/images/dino&family/irmaozinhos.png',
  '/images/dino&family/Dino.png',
  '/favicon.ico',
  '/manifest.json',
  '/_next/static/css/',
  '/_next/static/js/'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Cache opened');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
