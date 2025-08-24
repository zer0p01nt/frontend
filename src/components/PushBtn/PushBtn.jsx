import * as S from "./PushBtnStyle";
import { getLastToken } from "../../fcm";

const API_URL = process.env.REACT_APP_API_URL;

export default function PushBtn() {
  const handleTestPush = async () => {
    try {
      const last = getLastToken();
      if (!last) {
        alert("알림 권한 허용 후 새로고침해 주세요.");
        return;
      }

      // 테스트 푸시
      const res = await fetch(`${API_URL}/notification/fcm/test/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: "GUEST1" }),
      });
      const text = await res.text();
      console.log("서버에 푸시 테스트 요청 보냄", res.status, text);
      if (!res.ok) {
        alert(`테스트 푸시 요청 실패(${res.status}). 응답: ${text}`);
        return;
      }
      alert("테스트 알림을 보냈습니다.");
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
