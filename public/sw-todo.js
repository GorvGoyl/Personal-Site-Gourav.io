const CACHE_NAME = 'todo-app-v1';
const TODO_PAGE_CACHE = 'todo-page-cache-v1';

// Assets to cache for the todo app
const urlsToCache = ['/todo', '/manifest-todo.json', '/todo.png'];

// Install event - cache the todo page and assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        }),
    );
    // Force the waiting service worker to become the active service worker
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME && cacheName !== TODO_PAGE_CACHE) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                }),
            );
        }),
    );
    // Take control of all pages immediately
    return self.clients.claim();
});

// Fetch event - serve from cache when offline, update cache in background
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Cache Next.js build assets (JS, CSS, images under /_next) with a cache-first strategy
    if (url.pathname.startsWith('/_next')) {
        event.respondWith(
            caches.open(CACHE_NAME).then((cache) => {
                return cache.match(request).then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }

                    return fetch(request)
                        .then((networkResponse) => {
                            if (networkResponse && networkResponse.status === 200) {
                                cache.put(request, networkResponse.clone());
                            }
                            return networkResponse;
                        })
                        .catch(() => {
                            // If the asset is not in cache and the network fails, just fail silently.
                            return caches.match('/todo');
                        });
                });
            }),
        );
        return;
    }

    // Only handle requests for the todo page and its core assets
    if (
        url.pathname.startsWith('/todo') ||
        url.pathname === '/manifest-todo.json' ||
        url.pathname.includes('android-chrome')
    ) {
        event.respondWith(
            caches.match(request).then((cachedResponse) => {
                // Return cached version if available
                if (cachedResponse) {
                    // Update cache in background
                    fetch(request)
                        .then((response) => {
                            if (response && response.status === 200) {
                                caches.open(TODO_PAGE_CACHE).then((cache) => {
                                    cache.put(request, response);
                                });
                            }
                        })
                        .catch(() => {
                            // Network request failed, but we have cache
                            console.log('Network request failed, using cache');
                        });
                    return cachedResponse;
                }

                // If not in cache, fetch from network and cache it
                return fetch(request)
                    .then((response) => {
                        // Check if valid response
                        if (!response || response.status !== 200 || response.type === 'error') {
                            return response;
                        }

                        // Clone the response
                        const responseToCache = response.clone();

                        caches.open(TODO_PAGE_CACHE).then((cache) => {
                            cache.put(request, responseToCache);
                        });

                        return response;
                    })
                    .catch(() => {
                        // Return a basic offline page or message
                        return new Response('Offline - Please check your internet connection', {
                            status: 503,
                            statusText: 'Service Unavailable',
                            headers: new Headers({
                                'Content-Type': 'text/plain',
                            }),
                        });
                    });
            }),
        );
    }
});

// Handle messages from the client
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
