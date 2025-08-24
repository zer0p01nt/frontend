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

// 마지막으로 서버에 보낸 토큰
const LS_TOKEN = "fcm:lastSentToken";

// 현재 토큰 상태
let currentToken = null;

function getLS(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function setLS(key, value) {
  try {
    return localStorage.setItem(key, value);
  } catch {}
}

async function sendToken(token) {
  const res = await fetch(`${API_URL}/notification/fcm/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: "GUEST1",
      registration_token: token,
      device_type: "web",
    }),
  });
  const text = await res.text();
  console.log("register resp:", res.status, text);
  if (!res.ok) throw new Error(`register failed: ${res.status}`);
  setLS(LS_TOKEN, token); // fetch 성공하면 마지막 토큰 갱신
}

export async function bootstrapFcm({ onForeground } = {}) {
  const ok = await isSupported().catch(() => false);
  if (!ok) return { token: null, unsubscribe: () => {} };

  if (Notification.permission !== "granted") {
    const p = await Notification.requestPermission();
    if (p !== "granted") {
      alert("알림 권한이 필요합니다.");
      return { token: null, unsubscribe: () => {} };
    }
  }

  if (!("serviceWorker" in navigator)) {
    console.log("no serviceWorker in navigator");
    return { token: null, unsubscribe: () => {} };
  }
  const registration = await navigator.serviceWorker.ready;
  console.log("SW ready:", registration?.active?.scriptURL);

  const messaging = getMessaging(fbApp);

  // 포그라운드 수신
  const unsubscribe = onMessage(messaging, async (payload) => {
    console.log("[FCM onMessage fired]", payload);

    const n = payload.notification || {};
    const d = payload.data || {};

    const title = n.title || d.title || "알림";
    const body = n.body || d.body || "";

    const docId = d.document_id;
    const path = docId ? `/post/${encodeURIComponent(docId)}` : "/notification";

    try {
      const reg =
        (await navigator.serviceWorker.getRegistration()) ||
        (await navigator.serviceWorker.ready);
      await reg?.showNotification(title, {
        body,
        icon: "/logo512.png",
        badge: "/logo192.png",
        tag: docId ? `doc-${docId}` : "push-foreground",
        renotify: true,
        data: { ...d, document_id: docId, path },
      });
    } catch (e) {
      console.error("showNotification error:", e);
    }
    onForeground?.(payload);
  });

  // 토큰 발급 (같은 토큰이면 그대로 반환)
  try {
    currentToken = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: registration,
    });
    console.log("FCM token:", currentToken);
  } catch (e) {
    console.error("getToken 실패", e);
  }

  // 서버 전송 (토큰이 바뀐 경우에만)
  if (currentToken) {
    const lastSent = getLS(LS_TOKEN);
    if (lastSent !== currentToken) {
      try {
        await sendToken(currentToken);
      } catch (e) {
        console.error("FCM 토큰 등록 요청 에러", e);
      }
    } else {
      console.log("토큰 변경 없음");
    }
  }
  return { token: currentToken, unsubscribe };
}
