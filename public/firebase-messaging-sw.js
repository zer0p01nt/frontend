importScripts(
  "https://www.gstatic.com/firebasejs/12.1.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/12.1.0/firebase-messaging-compat.js"
);

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (evt) => evt.waitUntil(self.clients.claim()));

firebase.initializeApp({
  apiKey: "AIzaSyCzMqxMRpkho-eQnFbWabwrLzxR2AyzFTw",
  authDomain: "villit.firebaseapp.com",
  projectId: "villit",
  storageBucket: "villit.firebasestorage.app",
  messagingSenderId: "211295403138",
  appId: "1:211295403138:web:085695fc4f1c2b3f23c89b",
  measurementId: "G-TGDQTG0CQD",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(payload);
  const title = payload.notification?.title || "알림";
  const body = payload.notification?.body || "";
  self.registration.showNotification(title, {
    body,
    icon: "/logo512.png",
    badge: "/logo192.png",
  });
});
