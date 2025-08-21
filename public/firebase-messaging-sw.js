importScripts(
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FB_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FB_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FB_APP_ID,
  measurementId: process.env.REACT_APP_FB_MEASUREMENT_ID,
});

const messaging = firebase.messaging();

function buildNotice(payload) {
  const n = payload?.notification ?? {};
  const d = payload?.data ?? {};
  const title = String(n.title ?? d.title ?? "알림");
  const body = String(n.body ?? d.body ?? "");
  const icon = n.icon ?? "/logo192.png";
  const image = n.image ?? d.image;
  const opts = { body, icon, data: d };
  if (image) opts.image = image;
  return { title, opts };
}

messaging.onBackgroundMessage((payload) => {
  if (payload?.notification) {
    console.log(
      "[SW] notification payload (auto shown by browser)",
      payload.notification
    );
    return;
  }

  const { title, opts } = buildNotice(payload);
  console.log("[SW] data-only payload", payload);
  self.registration.showNotification(title, opts);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url =
    event.notification?.data?.link || event.notification?.data?.route || "/";
  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientsArr) => {
        // 열려있는 탭이 있으면 포커스, 없으면 새 창
        for (const client of clientsArr) {
          // 같은 오리진 탭이 있으면 우선 포커스
          if ("focus" in client) return client.focus();
        }
        if (self.clients.openWindow) return self.clients.openWindow(url);
      })
  );
});
