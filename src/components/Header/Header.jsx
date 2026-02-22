import { useNavigate } from "react-router-dom";
import * as S from "./HeaderStyle";
import { useEffect, useState } from "react";

/**
 * 헤더 컴포넌트
 * @param {object} props
 * @param {boolean} props.hasBack - 뒤로가기 버튼이 있는지 여부 (필수)
 * @param {boolean} props.hasScrap - 스크랩 버튼이 있는지 여부 (필수)
 * @param {string} props.title - 헤더 타이틀 텍스트 (필수)
 * @param {boolean} props.isScrap - 스크랩 상태 (상세 페이지에서만 필요)
 * @param {boolean} props.isTransparent - 투명 헤더 여부 (스크롤 시 배경색 고정) (기본값 false)
 * @param {boolean} props.atHome - 홈 화면 헤더 여부 (기본값 false)
 * @param {Function} props.onToggleScrap - 스크랩 버튼 클릭 시 호출되는 함수 (상세 페이지에서만 필요)
 * @param {boolean} props.scrapDisabled - 스크랩 버튼 비활성화 여부 (상세 페이지에서만 필요, 기본값 false)
 */
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
