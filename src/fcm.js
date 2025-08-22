import {
  getMessaging,
  getToken,
  isSupported,
  onMessage,
} from "firebase/messaging";
import { fbApp } from "./firebase";

const VAPID_KEY = process.env.REACT_APP_FB_VAPID_KEY;

export async function ensureFcmToken() {
  const supported = await isSupported().catch(() => false);
  if (!supported) {
    console.warn("FCM 미지원 브라우저입니다.");
    return null;
  }

  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    console.warn("알림 권한 거부됨");
    return null;
  }

  const registration = await navigator.serviceWorker.ready;

  const messaging = getMessaging(fbApp);
  const token = await getToken(messaging, {
    vapidKey: VAPID_KEY,
    serviceWorkerRegistration: registration,
  }).catch((e) => {
    console.error("getToken 실패", e);
    return null;
  });

  return token;
}

export function onForeground({ onPayload = () => {} } = {}) {
  const messaging = getMessaging(fbApp);
  const unsub = onMessage(messaging, async (payload) => {
    try {
      if (Notification.permission === "granted") {
        const n = payload?.notification ?? {};
        const d = payload?.data ?? {};
        const title = String(n.title ?? d.title ?? "알림");
        const opts = {
          body: String(n.body ?? d.body ?? "알림"),
          icon: n.icon ?? "/logo192.png",
          data: d,
        };
        new Notification(title, opts);
      }
    } catch (e) {
      console.error("실패", e);
    }

    onPayload?.(payload);
  });

  return unsub;
}
