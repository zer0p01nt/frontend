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
  console.log("FCM 토큰 서버 등록 : ", res.status, text);
  if (!res.ok) throw new Error(`register failed: ${res.status}`);
  setLS(LS_TOKEN, token); // fetch 성공하면 마지막 토큰 갱신
}

// 푸시 버튼에 토큰 보내기
export function getLastToken() {
  return getLS(LS_TOKEN);
}

// 알림 포맷 정리
function buildNotification(payload) {
  const n = (payload && payload.notification) || {};
  const d =
    (payload && payload.data) || (payload && payload.notification.data) || {};

  const title = n.title ?? d.title ?? "";
  const body = n.body ?? d.body ?? "";
  const docId = d?.document_id ?? d?.docId ?? null;
  const path = docId ? `/post/${encodeURIComponent(docId)}` : "/notification";
  const tag = docId ? `doc-${docId}` : "push";

  const options = {
    body,
    // icon: "/logo512.png",
    badge: "/logo192.png",
    tag,
    renotify: true,
    data: { ...d, document_id: docId, path },
  };

  return { title, options };
}

// new Notification으로 포그라운드 수신하는 함수
function showPageNotification(title, options) {
  const tag = options?.tag || "push";
  const prev = openNotiMap.get(tag);
  if (prev) {
    try {
      prev.close();
    } catch {}
  }

  const n = new Notification(title, options);
  n.onclick = (e) => {
    try {
      e?.preventDefault?.();
    } catch {}
    const path = options?.data?.path || "/notification";
    window.focus();
    window.location.assign(path);
    n.close();
  };
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
    }
  }

  // 포그라운드 수신
  const unsubscribe = onMessage(messaging, async (payload) => {
    console.log(payload);

    const { title, options } = buildNotification(payload);

    try {
      // const existing = await registration.getNotifications({
      //   includeTriggered: true,
      // });
      // const tag = options.tag;
      // existing.filter((n) => n.tag === tag).forEach((n) => n.close());

      if (
        document.visibilityState === "visible" &&
        "Notification" in window &&
        Notification.permission === "granted"
      ) {
        showPageNotification(title, options);
      } else {
        // sw로 폴백
        await registration.showNotification(title, options);
      }
    } catch (e) {
      console.error("showNotification 오류:", e);
    }
  });
  return { token: currentToken, unsubscribe };
}
