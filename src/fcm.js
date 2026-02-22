import {
  getMessaging,
  getToken,
  isSupported,
  onMessage,
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

// 토큰을 서버에 등록
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
  // console.log("FCM 토큰 서버 등록 : ", res.status, text);
  if (!res.ok) throw new Error(`register failed: ${res.status}`);
  setLS(LS_TOKEN, token); // fetch 성공하면 마지막 토큰 갱신
}

// 푸시 버튼에 토큰 보내기
export function getLastToken() {
  return getLS(LS_TOKEN);
}

// 토큰 및 알림 처리
export async function bootstrapFcm() {
  const ok = await isSupported().catch(() => false);
  if (!ok) return { token: null, unsubscribe: () => {} };

  if (Notification.permission !== "granted") {
    const p = await Notification.requestPermission();
    if (p !== "granted") {
      alert("알림 권한을 허용해 주세요.");
      return { token: null, unsubscribe: () => {} };
    }
  }

  if (!("serviceWorker" in navigator)) {
    return { token: null, unsubscribe: () => {} };
  }
  const registration = await navigator.serviceWorker.ready;

  const messaging = getMessaging(fbApp);

  // 토큰 발급 (같은 토큰이면 그대로 반환)
  try {
    currentToken = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: registration,
    });
    // console.log("FCM token:", currentToken);
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
        // console.error("FCM 토큰 등록 요청 에러", e);
      }
    }
  }

  // 포그라운드 수신 => SW에 일임
  // const unsubscribe = onMessage(messaging, async (payload) => {
  //   console.log("[메세지 도착]", payload);

  // const { title, options } = buildNotification(payload);

  // try {
  // const existing = await registration.getNotifications({
  //   includeTriggered: true,
  // });
  // const tag = options.tag;
  // existing.filter((n) => n.tag === tag).forEach((n) => n.close());
  //   await registration.showNotification(title, options);
  // } catch (e) {
  //   console.error("showNotification 오류:", e);
  // }
  // });
  return { token: currentToken };
}
