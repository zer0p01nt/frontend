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
  console.log("[FCM] boot start");

  const ok = await isSupported().catch(() => false);
  console.log("[FCM] isSupported:", ok);
  if (!ok) return { token: null, unsubscribe: () => {} };

  console.log("[FCM] permission:", Notification.permission);
  if (Notification.permission !== "granted") {
    const p = await Notification.requestPermission();
    console.log("[FCM] permission requested:", p);
    if (p !== "granted") return { token: null, unsubscribe: () => {} };
  }

  if (!("serviceWorker" in navigator)) {
    console.log("[FCM] no serviceWorker in navigator");
    return { token: null, unsubscribe: () => {} };
  }

  const registration = await navigator.serviceWorker.ready;
  console.log("[FCM] SW ready:", registration?.active?.scriptURL);

  const messaging = getMessaging(fbApp);

  let token = null;
  try {
    token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: registration,
    });
    console.log("[FCM] token:", token?.slice?.(0, 12) || token);
  } catch (e) {
    console.error("getToken 실패", e);
  }

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
      const body = await res.text();
      console.log("[FCM] register resp:", res.status, body);
    } catch (e) {
      console.error("FCM 토큰 등록 요청 에러", e);
    }
  } else {
    console.log("No Token");
  }

  const unsubscribe = onMessage(messaging, (payload) => {
    console.log("[FCM onMessage fired]", payload);
    const n = payload?.notification || {};
    const title = n.title || "알림";
    const opts = { body: n.body || "", icon: n.icon || "/logo192.png" };
    try {
      new Notification(title, opts);
    } catch {
      console.error("[FCM] show Notification error:", e);
    }
    onForeground?.(payload);
  });

  return { token, unsubscribe };
}
