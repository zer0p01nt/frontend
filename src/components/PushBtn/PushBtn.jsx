import { useEffect } from "react";
import { onForegroundMessage, triggerTestPush } from "../../fcm";
import { ButtonCircle } from "../../styles/ButtonCircle";

export default function PushBtn() {
  // 포그라운드 수신 콘솔 확인용
  useEffect(() => {
    const unsub = onForegroundMessage((p) => {
      console.log("Foreground - FCM : ", p);
    });
    return () => unsub();
  }, []);

  const handleClick = async () => {
    try {
      if (!("serviceWorker" in navigator)) throw new Error("SW 미지원");
      if (!("Notification" in window))
        throw new Error("브라우저가 알림을 지원하지 않습니다.");
      if (location.protocol !== "https:" && location.hostname !== "localhost") {
        throw new Error("HTTPS 환경이 필요합니다.");
      }

      const result = await triggerTestPush();
      console.log("[push-test] resp:", result);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ButtonCircle $isVisible={true} onClick={handleClick}>
      알림 테스트
    </ButtonCircle>
  );
}
