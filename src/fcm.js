// src/fcm.js
import {
  getMessaging,
  getToken,
  isSupported,
  onMessage,
} from "firebase/messaging";
import { fbApp } from "./firebase";

const API_URL = process.env.REACT_APP_API_URL;
const VAPID_KEY = process.env.REACT_APP_FB_VAPID_KEY;

const LS_TOKEN = "fcm:lastSentToken";
const getLS = (k) => {
  try {
    return localStorage.getItem(k);
  } catch {
    return null;
  }
};
const setLS = (k, v) => {
  try {
    localStorage.setItem(k, v);
  } catch {}
};

async function sendTokenToServer(token) {
  const res = await fetch(`${API_URL}/notification/fcm/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: "GUEST1",
      registration_token: token,
      device_type: "web",
    }),
  });
  if (!res.ok) throw new Error(`register failed: ${res.status}`);
  setLS(LS_TOKEN, token);
}

export function getLastToken() {
  return getLS(LS_TOKEN);
}

// getToken 중복 호출 방지
let inFlightToken = null;

export async function initFcm() {
  const ok = await isSupported().catch(() => false);
  if (!ok) return null;

  if (Notification.permission !== "granted") {
    const p = await Notification.requestPermission();
    if (p !== "granted") return null;
  }

  if (!("serviceWorker" in navigator)) return null;

  const registration =
    (await navigator.serviceWorker.getRegistration(
      "/firebase-messaging-sw.js"
    )) || (await navigator.serviceWorker.register("/firebase-messaging-sw.js"));

  const messaging = getMessaging(fbApp);

  if (!inFlightToken) {
    inFlightToken = getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: registration,
    }).catch((e) => {
      console.error("getToken 실패", e);
      return null;
    });
  }

  const token = await inFlightToken;
  if (!token) return null;

  const last = getLS(LS_TOKEN);
  if (last !== token) {
    try {
      await sendTokenToServer(token);
    } catch (e) {
      console.error("[FCM] 토큰 서버 등록 실패", e);
    }
  } else {
    console.log("[FCM] 토큰 변경 없음");
  }

  return token;
}

export function listenForeground(onForeground) {
  const messaging = getMessaging(fbApp);
  const stop = onMessage(messaging, (payload) => {
    try {
      onForeground?.(payload);
    } catch (e) {
      console.error("[FCM] onForeground 처리 중 오류", e);
    }
  });
  return function stopForeground() {
    stop(); // onMessage unsubscribe
  };
}
