// Service Worker de ¡Suelta! — Notificaciones Nativas & Widget para Android
const CACHE_NAME = 'suelta-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.png',
  '/logo.png'
];

// Instalación
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(() => {
        // Fallback no bloqueante si algún asset no está disponible
      });
    })
  );
  self.skipWaiting();
});

// Activación y limpieza de caches antiguos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      );
    })
  );
  self.clients.claim();
});

// Mensajes desde la aplicación principal
self.addEventListener('message', (event) => {
  if (!event.data) return;

  if (event.data.type === 'SHOW_NOTIFICATION') {
    const { title, options } = event.data;
    const defaultOptions = {
      icon: '/favicon.png',
      badge: '/favicon.png',
      vibrate: [200, 100, 200, 100, 200],
      requireInteraction: false,
      tag: 'suelta-reminder',
      renotify: true,
      data: { url: '/#app', dateOfArrival: Date.now() },
      actions: [
        { action: 'open', title: '🌿 Abrir ¡Suelta!' },
        { action: 'calma', title: '🧘 Respirar' }
      ]
    };
    self.registration.showNotification(title || '🌿 ¡Suelta! Momento de Conexión', {
      ...defaultOptions,
      ...options
    });
  }
});

// Manejador de click en la notificación nativa de Android
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const action = event.action;
  let targetUrl = '/#app';

  if (action === 'calma') {
    targetUrl = '/#calma';
  } else if (action === 'reto') {
    targetUrl = '/#reto';
  } else if (event.notification.data && event.notification.data.url) {
    targetUrl = event.notification.data.url;
  }

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // Si ya hay una ventana abierta, enfocarla y navegar
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if ('focus' in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      // Si no hay ventana abierta, abrir nueva
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});

// Fetch con estrategia Stale-While-Revalidate para navegación suave
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  // No interceptar peticiones de Firebase o externas
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
