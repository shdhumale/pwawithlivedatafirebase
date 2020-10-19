importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js');
if (workbox) {
    console.log(`Workbox is loaded`);

    workbox.precaching.precacheAndRoute([]);

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