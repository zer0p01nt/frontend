import * as B from "../../styles/ButtonCircle";
import arrow from "../../assets/arrow_upward.svg";
import { useEffect, useState } from "react";

export default function GoToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.pageYOffset > 200 ? true : false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    // 실제로 사용할 땐 꼭 ButtonWrapper로 감싸주세요
    // <B.ButtonWrapper>
    <B.ButtonCircle
      $icon={arrow}
      type='button'
      onClick={scrollToTop}
      $isVisible={isVisible} // 경고문 안 뜨도록 $ 붙임
    />
    // </B.ButtonWrapper>
  );
}
