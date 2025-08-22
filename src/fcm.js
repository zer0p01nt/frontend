import {
  getMessaging,
  getToken,
  isSupported,
  onMessage,
} from "firebase/messaging";
import { fbApp } from "./firebase";

const API_URL = process.env.REACT_APP_API_URL;
const VAPID_KEY = process.env.REACT_APP_FB_VAPID_KEY;

export async function bootstrapFcm({ userId = "GUEST1", onForeground } = {}) {
  const ok = await isSupported().catch(() => false);
  if (!ok) return { token: null, unsubscribe: () => {} };

  if (Notification.permission !== "granted") {
    const p = await Notification.requestPermission();
    if (p !== "granted") return { token: null, unsubscribe: () => {} };
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

  if (token) {
    const payload = {
      user_id: userId,
      registration_token: token,
      device_type: "web",
    };
    try {
      const res = await fetch(`${API_URL}/notification/fcm/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        console.error("FCM 토큰 등록 실패", res.status, await res.text());
      }
    } catch (e) {
      console.error("FCM 토큰 등록 요청 에러", e);
    }
  }

  const unsubscribe = onMessage(messaging, (payload) => {
    console.log("[FCM foreground]", payload);
    const n = payload?.notification || {};
    const title = n.title || "알림";
    const opts = { body: n.body || "", icon: n.icon || "/logo192.png" };
    try {
      new Notification(title, opts);
    } catch {}
    onForeground?.(payload);
  });

  return { token, unsubscribe };
}
