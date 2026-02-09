// msw 서비스워커 추가
importScripts("./mockServiceWorker.js");

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (evt) => evt.waitUntil(self.clients.claim()));

// 알림 포맷 정리
function buildNotification(payload) {
  const n = (payload && payload.notification) || {};
  const d = (payload && payload.data) || {};

  const title = n.title ?? d.title ?? "";
  const body = n.body ?? d.body ?? "";
  const docId = d?.document_id ?? d?.docId ?? null;
  const path = docId ? `/post/${encodeURIComponent(docId)}` : "/notification";
  const tag = docId ? `doc-${docId}` : "push";

  const options = {
    body,
    icon: "/logo512.png",
    badge: "/logo192.png",
    tag,
    renotify: true,
    data: { ...d, document_id: docId, path },
  };

  return { title, options };
}

// 중복 알림 방지
async function showOnlyOneNoti(title, options) {
  const existing = await self.registration.getNotifications({
    includeTriggered: true,
  });
  for (const noti of existing) {
    if (noti.tag && options.tag && noti.tag === options.tag) noti.close();
  }
  return self.registration.showNotification(title, options);
}

// 포그라운드/백그라운드 구분
async function anyClientVisible() {
  const list = await self.clients.matchAll({
    type: "window",
    includeUncontrolled: true,
  });
  return list.some((c) => {
    try {
      return c.visibilityState === "visible";
    } catch {
      return true;
    }
  });
}

// 푸시 알림 관리
self.addEventListener("push", (e) => {
  const payload = e.data ? e.data.json() : {};
  // console.log(payload);
  const { title, options } = buildNotification(payload);

  e.waitUntil(
    (async () => {
      const hasVisible = await anyClientVisible();
      // 보이는 탭이 있을 때만 SW가 표시
      if (hasVisible) {
        await showOnlyOneNoti(title, options);
      }
    })(),
  );
});

// 알림 클릭 로직
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
    })(),
  );
});
