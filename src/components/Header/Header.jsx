import { useNavigate } from "react-router-dom";
import * as S from "./HeaderStyle";
import { useEffect, useState } from "react";

// Scrap 버튼이 있는 헤더에서만 isScrap을 prop으로 보내면 됩니다.
// hasBack, hasScrap, title은 필수 prop.
export default function Header({
  hasBack,
  hasScrap,
  title,
  isScrap,
  isTransparent = false,
  atHome = false,
  onToggleScrap,
  scrapDisabled = false,
}) {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  // isTransparent => 스크롤시 배경색 고정되는 로직
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    if (!isTransparent) return; // 투명 모드 아닐 땐 스크롤 감지 불필요
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isTransparent]);

  return (
    <S.HeaderContainer
      $isTransparent={isTransparent}
      $hasBack={hasBack}
      $hasScrap={hasScrap}
      $scrolled={isTransparent ? scrolled : false}
      $atHome={atHome}
    >
      {hasBack && <S.HeaderBack onClick={handleBack} />}
      {atHome && <S.HomeIcon />}
      <S.HeaderTitle>{title}</S.HeaderTitle>
      {hasScrap && (
        <S.HeaderScrap
          $isScrap={isScrap}
          onClick={onToggleScrap}
          disabled={scrapDisabled}
        />
      )}
    </S.HeaderContainer>
  );
}
