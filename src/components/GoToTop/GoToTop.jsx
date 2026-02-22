import * as B from "../../styles/ButtonCircle";
import arrow from "../../assets/arrow_upward.svg";
import { useEffect, useState } from "react";

/**
 * 페이지 최상단으로 스크롤시키는 버튼 컴포넌트
 * @param {object} props
 * @param {boolean} props.$isOpen - 버튼이 보여지는지 여부
 */
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

    // window 객체의 스크롤 이벤트를 감지
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    // <B.ButtonWrapper>
    <B.ButtonCircle
      $icon={arrow}
      type='button'
      onClick={scrollToTop}
      $isVisible={$isOpen ? false : isVisible}
    />
    // </B.ButtonWrapper>
  );
}
