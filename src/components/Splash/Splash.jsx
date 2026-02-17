import * as S from "./SplashStyle";
import homeIcon from "../../assets/homeIcon.svg";
import { useEffect, useState } from "react";

export default function Splash({ children }) {
  const [isFading, setIsFading] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");

    if (hasSeenSplash) {
      setIsMounted(false);
      return;
    }

    const timerToFade = setTimeout(() => {
      setIsFading(true);
    }, 1000);

    const timerToRemove = setTimeout(() => {
      setIsMounted(false);
      sessionStorage.setItem("hasSeenSplash", "true");
    }, 1000 + 400);

    return () => {
      clearTimeout(timerToFade);
      clearTimeout(timerToRemove);
    };
  }, []);

  if (!isMounted) {
    return children;
  }

  return (
    <>
      {children}
      {isMounted && (
        <S.Container $isfading={isFading}>
          <img src={homeIcon} alt='Villit Icon' />
        </S.Container>
      )}
    </>
  );
}
