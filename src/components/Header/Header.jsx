import { useNavigate } from 'react-router-dom';
import * as S from "./HeaderStyle";

// Scrap 버튼이 있는 헤더에서만 isScrap을 prop으로 보내면 됩니다.
// hasBack, hasScrap, title은 필수 prop.
export default function Header({ hasBack, hasScrap, title, isScrap }) {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1)
  }

  return (
    <S.HeaderContainer $hasBack={hasBack} $hasScrap={hasScrap}>
      {hasBack && <S.HeaderBack onClick={handleBack} />}
      <S.HeaderTitle>{title}</S.HeaderTitle>
      {hasScrap && <S.HeaderScrap $isScrap={isScrap} />}
    </S.HeaderContainer>
  );
}
