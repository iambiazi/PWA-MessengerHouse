importScripts("precache-manifest.732cbb119854df384bf140ac577f11e4.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

//***THESE NOTES WERE MADE BECAUSE I GAVE A PRESENTATION ON SERVICE WORKERS***

//sets name of the cache, can be useful if using Workbox for multiple projects that use the same
// localhost for each project
workbox.core.setCacheNameDetails({ prefix: 'next-ss' });

//update and control the webpage as soon as possible
workbox.skipWaiting();

//used to claim other tabs immediately
workbox.clientsClaim();

//skips logging warnings if any precached assets are entered without a revision property
workbox.precaching.suppressWarnings();

//ignore the non-important files added as a result of webpack public path (for now)
//adds entries to the precache list and adds a route to respond to fetch events
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

//only keep the manifest entries that we want
workbox.precaching.precacheAndRoute(
  self.__precacheManifest.filter(
    m => !m.url.startsWith('bundles/')
			&& !m.url.startsWith('static/commons')
			&& m.url !== 'build-manifest.json',
  ),
  {},
);

/*
dictate how the sw will respond to 'GET' requests for these endpoints
only caches responses that would have a 0 or 200 status

if there is a request and that asset is in the cache, then the network will not be used at all
for the cacheFirst strategy
    (can set a max age, max entries, etc in options)
*/
workbox.routing.registerRoute(
  /[.](png|jpg|css)/,
  workbox.strategies.cacheFirst({
    cacheName: 'assets-cache',
    cacheableResponse: {
      statuses: [0, 200],
    },
  }),
  'GET',
);

//save responses from 'GET' for material design lite in 'lib-cache'
workbox.routing.registerRoute(
  /^https:\/\/code\.getmdl\.io.*/,
  workbox.strategies.cacheFirst({
    cacheName: 'lib-cache',
  }),
  'GET',
);

/*
makes two requests, one to the network and one to the cache
  responds with cached version if available
  otherwise waits for network response

cache is updated with the network response with each successful request

caches responses with 200 status as a default as well as cross-origin requests where
the response doesn't support CORS
*/
workbox.routing.registerRoute(
  '/',
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'root',
  }),
  'GET',
);

// browser portion currently not hosted

// workbox.routing.registerRoute(
//   '/browser',
//   workbox.strategies.staleWhileRevalidate({
//     cacheName: 'browser',
//   }),
//   'GET',
// );

workbox.routing.registerRoute(
  '/messenger',
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'messenger',
  }),
  'GET',
);

workbox.routing.registerRoute(
  /^http.*/,
  workbox.strategies.networkFirst({
    cacheName: 'http-cache',
  }),
  'GET',
);

/*
  Push API and Notifications API

  Work together to offer a way to engage the user
    alert user of important event
    display icon and small piece of text that user can click to open your site
    can integrate action buttons so user can interact with site without needing to revisit the
     webpage

  Push messages destined to become notifications are sent from a server directly to the push
   service with the information necessary to send to the right client and wake up the correct
    service worker (Push API)

  Notifications API let's us display notifications to the user
    same mechanisms as a native app, same look and feel
    Made of:
      Invocation API
        Controls how notifications appears (styling, vibration)
      Interaction API
        Controls what happens when user engages with the notification
 */



self.addEventListener('notificationclick', event => {
  const notification = event.notification;
  const primaryKey = notification.data.primaryKey;
  const action = event.action;

  if (action === 'close') {
    notification.close();
  } else {
    event.waitUntil(
      clients.matchAll().then(clis => {
        const client = clis.find(c => {
          return c.visibilityState === 'visible';
        });
        if (client !== undefined) {
          client.focus();
        } else {
          clients.openWindow('/messenger');
          notification.close();
        }
      })
    );
  }

  self.registration.getNotifications().then(notifications => {
    notifications.forEach(notification => {
      notification.close();
    });
  });
});
















