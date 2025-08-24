import * as S from "./PushBtnStyle";
import { initFcm, getLastToken } from "../../fcm";
import { useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

export default function PushBtn() {
  const [loading, setLoading] = useState(false);

  const handleTestPush = async () => {
    if (loading) return;
    setLoading(true);
    try {
      let token = getLastToken();
      if (!token && Notification.permission === "granted") {
        token = await initFcm(); // 없을 때만 1회 시도
      }

      if (!token) {
        alert(
          "알림 토큰이 아직 없습니다. 알림 권한 허용 후 새로고침해 주세요."
        );
        return;
      }

      const res = await fetch(`${API_URL}/notification/fcm/test/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: "GUEST1" }),
      });
      const text = await res.text();
      console.log("[Test Push] resp:", res.status, text);

      if (!res.ok) {
        alert(`테스트 푸시 실패(${res.status}). 응답: ${text}`);
        return;
      }
      alert("테스트 알림을 보냈습니다.");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <S.PushBtnContainer>
      <S.PushBtnText>푸시 알림을 테스트 해 보세요.</S.PushBtnText>
      <S.PushButton onClick={handleTestPush}>테스트</S.PushButton>
    </S.PushBtnContainer>
  );
}
