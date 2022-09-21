/**
 * @constant
 * Do not touch this file.
 */

import { notificationSubscriptionApi } from "./Apis/Auth";

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

export default async function registerServiceWorkerAndSubscribe() {
  navigator.serviceWorker.ready.then(function (response) {
    return response.pushManager.getSubscription().then((subscription) => {
      return response.pushManager
        .subscribe({
          userVisibleOnly: true,
          applicationServerKey: getDetermineServerKey(),
        })
        .then((newSubscribe) => {
          try {
            notificationSubscriptionApi(newSubscribe).then(() =>
              window.location.reload()
            );
          } catch (error) {}
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
    return await navigator.serviceWorker.register("");
  }
}
