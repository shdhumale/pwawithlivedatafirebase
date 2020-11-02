importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js');
if (workbox) {
    console.log(`Workbox is loaded`);

    workbox.precaching.precacheAndRoute([
  {
    "url": "css/materialize.min.css",
    "revision": "ec1df3ba49973dcb9ff212f052d39483"
  },
  {
    "url": "css/styles.css",
    "revision": "696d81438f07d910ed6489d16a6591fe"
  },
  {
    "url": "index.html",
    "revision": "d7367429a5323e5f52ab70abc328f45d"
  },
  {
    "url": "js/app.js",
    "revision": "b46df07815ee76778e242a0fc89596fc"
  },
  {
    "url": "js/db.js",
    "revision": "eb1b6be46e3f626d4479b3e6bbca324b"
  },
  {
    "url": "js/materialize.min.js",
    "revision": "5dcfc8944ed380b2215dc28b3f13835f"
  },
  {
    "url": "js/ui.js",
    "revision": "51240f853f2b771f75051ac2d3ba10de"
  },
  {
    "url": "img/siddhu.jpg",
    "revision": "153f454f2a66601b8544a7d985b5ab39"
  },
  {
    "url": "img/icons/icon-128x128.png",
    "revision": "78923e6089bc468edb3090d817d737c0"
  },
  {
    "url": "img/icons/icon-144x144.png",
    "revision": "6eba231acdd307931ec8ca52dbffabe3"
  },
  {
    "url": "img/icons/icon-152x152.png",
    "revision": "191aef4be700e6a423f2405e9b6456ab"
  },
  {
    "url": "img/icons/icon-192x192.png",
    "revision": "656829d493479779af3c95e26123b6c7"
  },
  {
    "url": "img/icons/icon-384x384.png",
    "revision": "09bb67eb2f5e81950761c9dbf85a0493"
  },
  {
    "url": "img/icons/icon-512x512.png",
    "revision": "85a2cbcaa0cb319cf4f8f3af0de42e9c"
  },
  {
    "url": "img/icons/icon-72x72.png",
    "revision": "4fd5a4c024dab5c552ab175170fdc9a5"
  },
  {
    "url": "img/icons/icon-96x96.png",
    "revision": "b2ca55b8e5e7d3d9ff1f251599495800"
  },
  {
    "url": "pages/offline.html",
    "revision": "0bb22be809fd8542b7e5370298302eb0"
  },
  {
    "url": "pages/404.html",
    "revision": "980eb23ef0e2b15034075a0a48d130a3"
  },
  {
    "url": "pages/fallback.html",
    "revision": "bb087918f7c899f62e457439f7e33703"
  }
]);

    const articleHandler = workbox.strategies.networkFirst({
        cacheName: 'html-cache',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 50,
            })
        ]
    });

    workbox.routing.registerRoute(/(.*)\.html/, args => {
        return articleHandler.handle(args).then(response => {
            if (!response) {
                return caches.match('pages/offline.html');
            } else if (response.status === 404) {
                return caches.match('pages/404.html');
            }
            return response;
        });
    });


    workbox.routing.registerRoute(
        new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
        workbox.strategies.cacheFirst({
            cacheName: 'google-fonts',
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 30,
                }),
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200]
                }),
            ],
        }),
    );
    //This method will listen to the push received from the server.
    self.addEventListener("push", e => {
        const data = e.data.json();
        console.log('[Service Worker] Push Received.');
        console.log('[Service Worker] Push had this data: "${event.data.text()}"');

        const title = data.title;
        const options = {
            body: 'Notification from NodeJs server',
            icon: 'img/icons/icon-192x192.png',
            badge: 'img/icons/icon-512x512.png'
        };
        self.registration.showNotification(title, options);
    });


} else {
    console.log(`Workbox didn't load`);
}