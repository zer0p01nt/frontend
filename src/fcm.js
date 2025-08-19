import { fbApp } from "./firebase";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const VAPID_KEY = process.env.REACT_APP_FB_VAPID_KEY;
const API_URL = process.env.REACT_APP_API_URL;
const SW_URL = "/firebase-messaging-sw.js";
const LS_KEY = "fcm_web_token";

export async function ensureSw() {
  if (!("serviceWorker" in navigator)) throw new Error("SW 미지원");

  const existed = await navigator.serviceWorker.getRegistration(SW_URL);
  if (existed) return existed;

  return navigator.serviceWorker.register(SW_URL);
}

export async function getFcmToken() {
  const permission = await Notification.requestPermission();
  if (permission !== "granted") return null;

  const reg = await ensureSw();
  const messaging = getMessaging(fbApp);

  const token = await getToken(messaging, {
    vapidKey: VAPID_KEY,
    serviceWorkerRegistration: reg,
  });

  return token || null;
}

export function onForegroundMessage(handler) {
  const messaging = getMessaging(fbApp);
  return onMessage(messaging, handler);
}

// FCM 토큰 등록 API 연결
export async function registerFcmToken(token) {
  if (!token) return null;

  const payload = {
    user_id: "GUEST1",
    registration_token: token,
    device_type: "web",
  };

  const res = await fetch(`${API_URL}/notification/fcm/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`FCM 등록 실패: ${res.status}`);
  }

  const data = await res.json();
  // 로컬에 저장해 중복 등록 방지
  localStorage.setItem(LS_KEY, token);

  return data?.data;
}

export async function triggerTestPush() {
  const token = await getFcmToken();
  if (!token) throw new Error("토큰 발급 실패 또는 권한 거부");

  // 기존 토큰과 달라졌다면 등록 호출
  const prev = localStorage.getItem(LS_KEY);
  if (prev !== token) {
    await registerFcmToken(token);
  }

  // 푸시 알림 테스트 API 연결
  const res = await fetch(`${API_URL}/notification/fcm/test/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: "GUEST1" }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`테스트 발송 실패: ${res.status} ${text}`);
  }

  return await res.json();
}
