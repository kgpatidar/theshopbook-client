let cacheData = "appV1";

this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll([
        "/",
        "/static/bundle.js",
        "/static/js/bundle.js",
        "/manifest.json",
        "/ws",
        "/favicon.ico",
        "/index.html",
        "/logo192.png",
      ]);
    })
  );
});

this.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((result) => {
        if (result) return result;
        fetch(event.request.clone());
      })
    );
  }
});

this.addEventListener("push", function (event) {
  const data = event.data.json();
  const title = data.title || "TheShopbook";
  const options = {
    body: data.body || "Hey There!",
    icon: "/logo192.png",
    vibrate: [100, 50, 10, 20, 20],
    tag: "sample",
    actions: [
      {
        action: "www.google.com",
        title: "Check",
      },
    ],
  };

  event.waitUntil(this.registration.showNotification(title, options));
});

this.addEventListener("notificationclick", function (event) {
  event.notification.close();
  this.clients.openWindow("https://www.google.com");
});
