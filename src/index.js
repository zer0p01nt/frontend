import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

serviceWorkerRegistration.register();

// Firebase 세팅
import { initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  isSupported,
  onMessage,
} from "firebase/messaging";

const app = initializeApp({
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FB_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FB_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FB_APP_ID,
  measurementId: process.env.REACT_APP_FB_MEASUREMENT_ID,
});

const messaging = getMessaging(app);

(async () => {
  const supported = await isSupported().catch(() => false);
  if (!supported) return;

  if (Notification.permission !== "granted") {
    const p = await Notification.requestPermission();
    if (p !== "granted") return;
  }

  if (!("serviceWorker" in navigator)) return;

  const reg = await navigator.serviceWorker.ready;
  const token = await getToken(messaging, {
    vapidKey: process.env.REACT_APP_FB_VAPID_KEY,
    serviceWorkerRegistration: reg,
  });

  if (token) {
    const payload = {
      user_id: "GUEST1",
      registration_token: token,
      device_type: "web",
    };

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/notification/fcm/register/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) {
        // 필요 시 서버 에러 로깅
        console.error("FCM 토큰 등록 실패", res.status, await res.text());
      }
    } catch (e) {
      console.error("FCM 토큰 등록 요청 에러", e);
    }
  }

  onMessage(messaging, (payload) => {
    const n = payload?.notification || {};
    const title = n.title || "알림";
    const opts = { body: n.body || "", icon: n.icon || "/logo192.png" };
    try {
      new Notification(title, opts);
    } catch {}
  });
})();
