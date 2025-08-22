import { useEffect, useState } from "react";
import { ensureFcmToken, onForeground } from "../../fcm";

import * as S from "./PushBtnStyle";

const API_URL = process.env.REACT_APP_API_URL;

export default function PushBtn() {
  const [token, setToken] = useState(null);
  useEffect(() => {
    let unsub = () => {};
    (async () => {
      const t = await ensureFcmToken();
      setToken(t);
      unsub = onForeground({
        onPayload: (p) => console.log("foreground payload", p),
      });
    })();
    return () => unsub();
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
    <S.PushBtnContainer>
      <S.PushBtnText>푸시 알림을 테스트 해 보세요.</S.PushBtnText>
      <S.PushButton onClick={handleTestPush}>테스트</S.PushButton>
    </S.PushBtnContainer>
  );
}
