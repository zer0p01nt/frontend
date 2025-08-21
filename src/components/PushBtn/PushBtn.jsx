import { useEffect, useState } from "react";
import { ButtonCircle } from "../../styles/ButtonCircle";
import { ensureFcmToken, onForeground } from "../../fcm";

const API_URL = process.env.REACT_APP_API_URL;

export default function PushBtn() {
  const [token, setToken] = useState(null);
  useEffect(() => {
    (async () => {
      const t = await ensureFcmToken();
      setToken(t);
      const unsub = onForeground({
        onPayload: (p) => console.log("foreground payload", p),
      });
      return () => unsub();
    })();
  }, []);

  const handleTestPush = async () => {
    if (!token) {
      alert("알림 권한을 허용해주세요.");
      return;
    }

    try {
      await fetch(`${API_URL}/notification/fcm/test/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: "GUEST1" }),
      });
      console.log("서버에 푸시 테스트 요청 보냄");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <ButtonCircle $isVisible={true} onClick={handleTestPush}>
      알림 테스트
    </ButtonCircle>
  );
}
