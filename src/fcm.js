import {
  getMessaging,
  getToken,
  isSupported,
  onMessage,
  // deleteToken,
} from "firebase/messaging";
import { fbApp } from "./firebase";

const API_URL = process.env.REACT_APP_API_URL;
const VAPID_KEY = process.env.REACT_APP_FB_VAPID_KEY;

// 현재 토큰 상태
let currentToken = null;

export async function bootstrapFcm({ userId = "GUEST1", onForeground } = {}) {
  console.log("[FCM] boot start");

  const ok = await isSupported().catch(() => false);
  console.log("[FCM] isSupported:", ok);
  if (!ok) return { token: null, unsubscribe: () => {} };

  console.log("[FCM] permission:", Notification.permission);
  if (Notification.permission !== "granted") {
    const p = await Notification.requestPermission();
    console.log("[FCM] permission requested:", p);
    if (p !== "granted") {
      alert("알림 권한이 필요합니다.");
      return { token: null, unsubscribe: () => {} };
    }
  }

  if (!("serviceWorker" in navigator)) {
    console.log("[FCM] no serviceWorker in navigator");
    return { token: null, unsubscribe: () => {} };
  }
  const registration = await navigator.serviceWorker.ready;
  console.log("[FCM] SW ready:", registration?.active?.scriptURL);

  // 토큰 발급
  const messaging = getMessaging(fbApp);
  try {
    currentToken = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: registration,
    });
    console.log("[FCM] token:", currentToken);
  } catch (e) {
    console.error("getToken 실패", e);
  }

  // 서버 등록
  if (currentToken) {
    try {
      const res = await fetch(`${API_URL}/notification/fcm/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          registration_token: currentToken,
          device_type: "web",
        }),
      });
      const body = await res.text();
      console.log("[FCM] register resp:", res.status, body);
    } catch (e) {
      console.error("FCM 토큰 등록 요청 에러", e);
    }
  } else {
    console.log("No Token");
  }

  // 포그라운드 수신
  const unsubscribe = onMessage(messaging, async (payload) => {
    console.log("[FCM onMessage fired]", payload);

    const n = payload.notification || {};
    const d = payload.data || {};

    const title = n.title || "알림";
    const body = n.body || "";

    const docId = d.document_id;
    const path = docId ? `/post/${encodeURIComponent(docId)}` : "/notification";

    try {
      // 권한 재확인
      if (Notification.permission !== "granted") {
        const p = await Notification.requestPermission();
        if (p !== "granted") throw new Error("permission not granted");
      }

      // new Notification으로 시도
      if ("Notification" in window) {
        const notif = new Notification(title, {
          body,
          icon: "/logo512.png",
          badge: "/logo192.png",
          tag: Date.now(),
          renotify: true,
          data: { ...d, docId, path },
        });

        // 클릭 시 현재 탭 포커스 + 이동
        notif.onclick = () => {
          try {
            window.focus();
          } catch {}
          window.location.href = path;
          notif.close();
        };
      } else {
        // 폴백: SW를 통해 표시
        const reg =
          (await navigator.serviceWorker.getRegistration()) ||
          (await navigator.serviceWorker.ready);
        await reg?.showNotification(title, {
          body,
          icon: "/logo512.png",
          badge: "/logo192.png",
          tag: Date.now(),
          renotify: true,
          data: { ...d, docId, path },
        });
      }
    } catch (e) {
      console.error("[FCM] foreground notify error:", e);
      // 최종 폴백으로 SW 알림 시도
      try {
        const reg =
          (await navigator.serviceWorker.getRegistration()) ||
          (await navigator.serviceWorker.ready);
        await reg?.showNotification(title, {
          body,
          icon: "/logo512.png",
          badge: "/logo192.png",
          tag: Date.now(),
          renotify: true,
          data: { ...d, docId, path },
        });
      } catch (e2) {
        console.error("[FCM] fallback showNotification error:", e2);
      }
    }

    onForeground?.(payload);
  });

  return { token: currentToken, unsubscribe };
}
