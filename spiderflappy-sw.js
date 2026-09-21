const CACHE_NAME = "spider-flappy-v3";
const CACHE_PREFIX = "spider-flappy-";

const ARCHIVOS = [
    "./spiderflappy.html",
    "./spiderflappy.css",
    "./spiderflappy.js",
    "./spiderflappy-manifest.json",
    "./spider-art.png",
    "./SF-Pro.ttf"
];

self.addEventListener("install", event => {
    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ARCHIVOS))
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys
                .filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
                .map(key => caches.delete(key))
        ))
    );

    self.clients.claim();
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
