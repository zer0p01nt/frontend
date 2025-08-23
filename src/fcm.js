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

// 현재 토큰 상태 선언
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

    const n = payload.notification;
    const d = payload?.data;

    const title = n.title;
    const body = n.body;
    const docId = d.document_id;
    const path = docId ? `/post/${encodeURIComponent(docId)}` : "/notification";
    const tag = docId ? `doc-${docId}` : "push-foreground";

    try {
      const reg = await navigator.serviceWorker.ready;
      await reg.showNotification(title, {
        body,
        data: { ...d, docId, path },
        tag,
        renotify: false,
      });
    } catch (e) {
      console.error("[FCM] show Notification error:", e);
    }
    onForeground?.(payload);
  });

  // 백그라운드 수신 못하도록 방지 (주석처리)
  // const onHide = async () => {
  //   if (document.visibilityState === "hidden") {
  //     try {
  //       if (currentToken) {
  //         await deleteToken(messaging);
  //         currentToken = null;
  //       }
  //     } catch (e) {
  //       console.warn("deleteToken 실패", e);
  //     }
  //   }
  // };
  // document.addEventListener("visibilitychange", onHide);

  // 앱 재접속하면 토큰 재등록
  // const onShow = async () => {
  //   if (document.visibilityState === "visible" && !currentToken) {
  //     try {
  //       const t = await getToken(messaging, {
  //         vapidKey: VAPID_KEY,
  //         serviceWorkerRegistration: await navigator.serviceWorker.ready,
  //       });
  //       if (t) {
  //         currentToken = t;
  //         await fetch(`${API_URL}/notification/fcm/register/`, {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({
  //             user_id: userId,
  //             registration_token: t,
  //             device_type: "web",
  //           }),
  //         });
  //       }
  //     } catch (e) {
  //       console.error("재발급 실패", e);
  //     }
  //   }
  // };
  // document.addEventListener("visibilitychange", onShow);

  return { token: currentToken, unsubscribe };
}
