import * as S from "./PushBtnStyle";
import { getMessaging, getToken } from "firebase/messaging";
import { fbApp } from "../../firebase";

const API_URL = process.env.REACT_APP_API_URL;
const VAPID_KEY = process.env.REACT_APP_FB_VAPID_KEY;

export default function PushBtn() {
  const handleTestPush = async () => {
    try {
      // 최신 토큰 재발급
      const reg = await navigator.serviceWorker.ready;
      const t = await getToken(getMessaging(fbApp), {
        vapidKey: VAPID_KEY,
        serviceWorkerRegistration: reg,
      });

      // 바로 서버에 재등록
      if (t) {
        await fetch(`${API_URL}/notification/fcm/register/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: "GUEST1",
            registration_token: t,
            device_type: "web",
          }),
        });
      }

      // 테스트 푸시
      const res = await fetch(`${API_URL}/notification/fcm/test/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: "GUEST1" }),
      });
      const text = await res.text();
      console.log("서버에 푸시 테스트 요청 보냄", res.status, text);
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
