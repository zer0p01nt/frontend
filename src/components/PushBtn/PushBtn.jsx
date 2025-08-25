import * as S from "./PushBtnStyle";
import { getLastToken } from "../../fcm";
import { useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

export default function PushBtn({ setToastShow }) {
  const [loading, setLoading] = useState(false);

  // iOS 감지
  const isIOS = () => {
    if (typeof navigator === "undefined") return false;
    const ua = navigator.userAgent || "";
    const isiOSUA = /iPad|iPhone|iPod/.test(ua);
    const isIPadOS13Plus = ua.includes("Mac") && navigator.maxTouchPoints > 1;
    return isiOSUA || isIPadOS13Plus;
  };

  // PWA 모드 감지
  const isPWAMode = () => {
    if (typeof window === "undefined") return false;
    const modes = ["standalone", "fullscreen", "minimal-ui"];
    return (
      modes.some((m) => window.matchMedia(`(display-mode: ${m})`).matches) ||
      window.navigator.standalone === true
    );
  };

  const handleTestPush = async () => {
    try {
      setLoading(true);
      const last = getLastToken();
      if (!last) {
        // iOS이면 PWA 모드 아닐 경우 분기 처리
        if (isIOS() && !isPWAMode()) {
          alert(
            "iOS에서는 홈 화면에 설치한 웹앱에서만 푸시 알림을 받을 수 있습니다.\n" +
              '"공유" 버튼 > "홈 화면에 추가"로 설치한 뒤 다시 시도해 주세요.'
          );
          return;
        }
        alert("알림 권한을 허용해 주세요.");
        return;
      }

      // 테스트 푸시
      const res = await fetch(`${API_URL}/notification/fcm/test/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: "GUEST1" }),
      });
      const text = await res.text();
      // console.log("서버에 푸시 테스트 요청 보냄", res.status, text);
      if (!res.ok) {
        console.error(`테스트 푸시 요청 실패(${res.status}). 응답: ${text}`);
        return;
      }

      // alert 대신 토스트 띄움
      setToastShow(true);
      // 1초 후 사라짐
      setTimeout(() => setToastShow(false), 1000);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <S.PushBtnContainer>
      <S.PushBtnText $loading={loading}>
        {loading ? "잠시 기다려 주세요." : "푸시 알림을 테스트 해 보세요."}
      </S.PushBtnText>
      <S.PushButton
        onClick={handleTestPush}
        $loading={loading}
        disabled={loading}
      >
        {loading ? "로딩 중" : "테스트"}
      </S.PushButton>
    </S.PushBtnContainer>
  );
}
