// importScripts(
//   "https://www.gstatic.com/firebasejs/12.1.0/firebase-app-compat.js"
// );
// importScripts(
//   "https://www.gstatic.com/firebasejs/12.1.0/firebase-messaging-compat.js"
// );

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (evt) => evt.waitUntil(self.clients.claim()));

// firebase.initializeApp({
//   apiKey: "AIzaSyCzMqxMRpkho-eQnFbWabwrLzxR2AyzFTw",
//   authDomain: "villit.firebaseapp.com",
//   projectId: "villit",
//   storageBucket: "villit.firebasestorage.app",
//   messagingSenderId: "211295403138",
//   appId: "1:211295403138:web:085695fc4f1c2b3f23c89b",
//   measurementId: "G-TGDQTG0CQD",
// });

// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   console.log(payload);
//   const n = payload.notification || {};
//   const d = payload.data || {};
//   const title = n.title;
//   const body = n.body;
//   const docId = d.document_id;
//   const path = docId ? `/post/${encodeURIComponent(docId)}` : "/notification";
//   self.registration.showNotification(title, {
//     body,
//     icon: "/logo512.png",
//     badge: "/logo192.png",
//     tag: docId ? `doc-${docId}` : "push",
//     renotify: false,
//     data: { ...d, document_id: docId, path },
//   });
// });

function buildNotification(payload) {
  const n = payload.notification;
  const d = payload.data;

  const title = n.title ?? d.title ?? "알림";
  const body = n.body ?? d.body ?? "";
  const docId = d?.document_id ?? d?.docId ?? null;
  const path = docId ? `/post/${encodeURIComponent(docId)}` : "/notification";
  const tag = docId ? `doc-${docId}` : "push";

  const options = {
    body,
    icon: "/logo512.png",
    badge: "/logo192.png",
    tag,
    renotify: false,
    data: { ...d, document_id: docId, path },
  };

  return { title, options };
}

async function showOnlyOneNoti(title, options) {
  const existing = await self.registration.getNotifications({
    includeTriggered: true,
  });
  for (const noti of existing) {
    if (noti.tag && options.tag && noti.tag === options.tag) noti.close();
  }
  return self.registration.showNotification(title, options);
}

self.addEventListener("push", (e) => {
  e.waitUntil(
    (async () => {
      let payload = {};
      try {
        payload = e.data
          ? e.data.json
            ? await e.data.json()
            : JSON.parse(e.data.text())
          : {};
      } catch {
        try {
          payload = JSON.parse(e.data.text());
        } catch {}
      }

      const { title, options } = buildNotification(payload);
      const clientsList = await clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      });
      // 열려 있는 창이 있으면 onMessage, 없으면 SW
      if (clientsList.length === 0) {
        await showOnlyOneNoti(title, options);
      }
    })()
  );
});

self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  const path = e.notification?.data?.path || "/notification";

  e.waitUntil(
    (async () => {
      const targetUrl = new URL(path, self.location.origin).href;
      const windowClients = await clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      });

      for (const client of windowClients) {
        try {
          const u = new URL(client.url);
          if (u.origin === self.location.origin) {
            await client.focus();
            client.navigate(targetUrl);
            return;
          }
        } catch {}
      }
      await clients.openWindow(targetUrl);
    })()
  );
});
