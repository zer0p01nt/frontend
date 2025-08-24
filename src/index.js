import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

serviceWorkerRegistration.register();

import { bootstrapFcm } from "./fcm";
bootstrapFcm({
  onForeground: (p) => console.log("[FCM foreground payload]", p),
});
