import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { bootstrapFcm } from "./fcm";

const root = ReactDOM.createRoot(document.getElementById("root"));

// MSW & FCM 초기화
async function prepareApp() {
  // MSW 설정 및 시작
  const { worker } = require("./mocks/browser");
  await worker.start({
    onUnhandledRequest: "bypass",
    serviceWorker: {
      url: "/firebase-messaging-sw.js",
    },
  });

  // 서비스 워커 등록 확인 및 FCM 부트스트랩
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js",
      );
      console.log("[SW] Registered with scope:", registration.scope);
      await navigator.serviceWorker.ready;
      bootstrapFcm();
    } catch (err) {
      console.error("[SW] Registration failed:", err);
      bootstrapFcm();
    }
  } else {
    bootstrapFcm();
  }
}

// 앱 실행
prepareApp().then(() => {
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
});
