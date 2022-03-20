let cacheData = "theshopbook-app-version-v1";

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
        "/512.png",
        "/192.png",
        "/64.png",
        "/32.png",
        "https://fonts.gstatic.com/s/ubuntu/v19/4iCv6KVjbNBYlgoCjC3jsGyN.woff2",
        "https://fonts.gstatic.com/s/ubuntu/v19/4iCs6KVjbNBYlgoKfw72.woff2",
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
    icon: "/64.png",
    vibrate: [100, 50, 10, 20, 20],
    tag: "sample",
    actions: [
      {
        action: "www.google.com",
        title: "Open",
      },
    ],
  };

  event.waitUntil(this.registration.showNotification(title, options));
});

this.addEventListener("notificationclick", function (event) {
  event.notification.close();
  this.clients.openWindow("https://www.google.com");
});
