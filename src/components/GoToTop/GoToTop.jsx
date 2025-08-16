import * as B from "../../styles/ButtonCircle";
import arrow from "../../assets/arrow_upward.svg";
import { useEffect, useState } from "react";

export default function GoToTop({ $isOpen }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 200px 이상 스크롤되면 isVisible 상태를 true로 변경
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // window 객체의 스크롤 이벤트를 감지합니다.
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트가 사라질 때 이벤트 리스너를 제거합니다.
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // 이 useEffect는 처음 한 번만 실행됩니다.

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    // 실제로 사용할 땐 꼭 ButtonWrapper로 감싸주세요
    // <B.ButtonWrapper>
    <B.ButtonCircle
      $icon={arrow}
      type='button'
      onClick={scrollToTop}
      $isVisible={$isOpen ? false : isVisible} // 경고문 안 뜨도록 $ 붙임
    />
    // </B.ButtonWrapper>
  );
}
