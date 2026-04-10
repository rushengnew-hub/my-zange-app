// 執事の名前（バージョン管理用）
const CACHE_NAME = 'zange-cache-v1';

// 執事が保存しておくリスト（オフラインでも動くようにするため）
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './sw.js'
];

// インストールされた時に実行される
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// ページを開くたびに実行される（保存したデータがあればそれを、なければネットから持ってくる）
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});