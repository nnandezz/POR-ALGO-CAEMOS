const CACHE_NAME = "por-algo-caemos-v5";
const CACHE_PREFIX = "por-algo-caemos-";

const ARCHIVOS = [
    "./",
    "./index.html",
    "./juegos.html",
    "./tienda.html",
    "./perfil.html",
    "./style.css",
    "./script.js",
    "./perfil.js",
    "./tienda.js",
    "./manifest.json",
    "./favicon.png",
    "./SF-Pro.ttf",
    "./spiderflappy.html",
    "./spiderflappy.css",
    "./spiderflappy.js",
    "./spiderflappy-manifest.json",
    "./spider-art.png",
    "./spidercaida.png",
    "./spidermedio.png",
    "./spidersubida.png",
    "./spidermusic.mp3",
    "./elbaifo.html",
    "./elbaifo.css",
    "./elbaifo.js",
    "./elbaifo-manifest.json",
    "./elbaifo.png",
    "./elbaifo2.png",
    "./elbaifo3.png",
    "./elbaifo4.png",
    "./elbaifo_caida.png",
    "./elbaifo_salto.png",
    "./elbaiforun.png",
    "./baifomusic.mp3",
    "./canarias.png",
    "./canarias_icono.png",
    "./ciudad_dia.png",
    "./ciudad_noche.png",
    "./columbia.png",
    "./edificio_dia.png",
    "./edificio_noche.png",
    "./spiderman.png"
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
