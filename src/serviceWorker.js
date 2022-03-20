/**
 * @constant
 * Do not touch this file.
 */

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function getDetermineServerKey() {
  const publicKey =
    "BNU7wBDLhogecm-mqkAz5i2ThPAUT6Qy151biUa9Ql2AluokCNE8DXizo703owsTNEIbzMMoPhJKcOee4yxfjM4";
  return urlBase64ToUint8Array(publicKey);
}

function subscribeUser(subscribe, userInfo) {
  return fetch(`https://test-push-notification-1.herokuapp.com/subscribe`, {
    method: "POST",
    body: JSON.stringify(subscribe),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export default async function registerServiceWorkerAndSubscribe(userInfo) {
  navigator.serviceWorker.ready.then(function (response) {
    return response.pushManager.getSubscription().then((subscription) => {
      return response.pushManager
        .subscribe({
          userVisibleOnly: true,
          applicationServerKey: getDetermineServerKey(),
        })
        .then((newSubscribe) => {
          subscribeUser(newSubscribe, userInfo);
        });
    });
  });
}

export async function registerServieWorker() {
  if (process.env.NODE_ENV === "development") {
    return await navigator.serviceWorker.register(
      `http://localhost:3000/sw.js`
    );
  } else {
    return await navigator.serviceWorker.register(
      "https://testing-app-1.netlify.app/sw.js"
    );
  }
}
