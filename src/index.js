import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

import { initFcm } from "./fcm";

(async () => {
  const token = await initFcm();
  console.log("[FCM] token", token);
})();
