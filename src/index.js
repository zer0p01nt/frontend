import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

import { bootstrapFcm } from "./fcm";
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js", { scope: "/" })
    .then(async () => {
      await navigator.serviceWorker.ready;
      bootstrapFcm();
    })
    .catch((err) => console.error("[SW] register failed:", err));
} else {
  bootstrapFcm();
}
