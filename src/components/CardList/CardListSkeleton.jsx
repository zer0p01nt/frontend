// CardListSkeleton.jsx
import * as S from "./CardListStyle.js";

/**
 * 공문 카드 리스트 로딩 컴포넌트
 * @param {Object} props
 * @param {'list' | 'card' | 'notification' | 'recommend'} props.variant - 카드 리스트 스타일 (기본값 'list')
 */
export default function CardListSkeleton({ variant = "list" }) {
  if (variant === "card") {
    return (
      <S.CardContainer $variant={variant}>
        <S.BadgeWrapper>
          <S.SkeletonBadge />
          <S.SkeletonBadge />
        </S.BadgeWrapper>
        <S.CardImage $hasRealImage={false} style={{ background: "none" }}>
          <S.SkeletonImage />
        </S.CardImage>
        <S.ContentWrapper>
          <S.SkeletonTitle />
          <S.SkeletonDate />
        </S.ContentWrapper>
      </S.CardContainer>
    );
  }

  return (
    <S.CardContainer $variant={variant}>
      <S.ContentWrapper>
        <S.BadgeWrapper>
          <S.SkeletonBadge />
          <S.SkeletonBadge />
        </S.BadgeWrapper>
        <S.SkeletonTitle />
        <S.SkeletonDate />
      </S.ContentWrapper>
      <S.CardImage $hasRealImage={false} style={{ background: "none" }}>
        <S.SkeletonImage />
      </S.CardImage>
    </S.CardContainer>
  );
}
