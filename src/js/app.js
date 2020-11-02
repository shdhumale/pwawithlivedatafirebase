const publicVapidKey = "PublicKey";

if ('serviceWorker' in navigator) {
  /* navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('service worker registered'))
    .catch(err => console.log('service worker not registered', err)); */
  send().catch(err => console.log('service worker not registered', err));
}

// Register Push, Send Push
async function send() {
  try {
    // Register Service Worker
    console.log("Registering service worker...");
    const register = await navigator.serviceWorker.register("/sw.js", {
      scope: "/"
    });
    console.log("Service Worker Registered...");

    // Register Push:- Here client register/subscribe itself for getting push notification from the server.
    console.log("Registering Push or Client Subscribe from client to server started ...");
    //During registration of the push from the client we use the subscribe object  of  pushManager method of register as shown below
    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
    console.log("Push or Client Subscribe from client to server Registered Completed...");

    // Send Push Notification:- Send subscribe notification to the server.
    console.log("Sending Push or Client Subscribe to server started...");
    await fetch("/subscribe", {
      method: "POST",
      body: JSON.stringify(subscription),
      headers: {
        "content-type": "application/json"
      }
    });
  } catch (e) {
    console.log('SW registration failed');
  }
  console.log("Push or Client Subscribe to server Sent...");
}

//When ever you send the publickey always use urlBase64ToUint8Array you can copy this function from https://github.com/web-push-libs/web-push
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}