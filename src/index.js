import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

import { initFcm, listenForeground } from "./fcm";

(async () => {
  const token = await initFcm();
  console.log("[FCM] token", token);

  // 포그라운드 로그
  const stopForeground = listenForeground((p) => {
    console.log("[FCM foreground payload]", p);
  });
})();
