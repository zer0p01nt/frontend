import * as S from "./CardListStyle.js";
import Badge from "../Badge/Badge";
import { dummyImages } from "../../constants/dummyImages.js";

/**
 * 공문 카드 리스트 컴포넌트
 * @param {Object} props
 * @param {Array<{ text: string, color: 'blue' | 'pink' | 'teal' }>} props.badges - 카드에 표시할 뱃지 정보 배열
 * @param {string} props.title - 공문의 제목 (기본값 '제목 없음')
 * @param {string} props.date - 공문 작성 날짜 (기본값 '')
 * @param {'list' | 'card' | 'notification' | 'recommend'} props.variant - 카드 리스트 스타일 (기본값 'list')
 * @param {boolean} props.isUnread - 공문이 읽지 않은 상태인지 여부 (기본값 false) - 알림 페이지에서만 사용
 * @param {Function} props.onClick - 카드 클릭 시 호출되는 함수
 * @param {string} props.image - 카드에 표시할 이미지 URL (null 또는 undefined인 경우 더미 이미지 사용)
 * @param {string} props.type - 더미 이미지 선택을 위한 공문 타입
 */
export default function CardList({
  badges = [],
  title = "제목 없음",
  date = "",
  variant = "list",
  isUnread = false,
  onClick,
  image,
  type,
}) {
  const badgeComponent = (
    <S.BadgeWrapper>
      {badges.map((badgeInfo, index) => (
        <Badge key={index} color={badgeInfo.color}>
          {badgeInfo.text}
        </Badge>
      ))}
    </S.BadgeWrapper>
  );

  const hasRealImage = !!image;

  if (variant === "card") {
    return (
      <S.CardContainer $variant={variant} onClick={onClick}>
        {badgeComponent}
        <S.CardImage $hasRealImage={hasRealImage}>
          <img src={image ?? dummyImages[type] ?? null} alt={title} />
        </S.CardImage>
        <S.ContentWrapper>
          <S.Title $variant='card'>{title}</S.Title>
          <S.Date>{date}</S.Date>
        </S.ContentWrapper>
      </S.CardContainer>
    );
  }

  return (
    <S.CardContainer $variant={variant} $isUnread={isUnread} onClick={onClick}>
      <S.ContentWrapper>
        {badgeComponent}
        <S.Title>
          {title}
          {isUnread && <S.UnreadMark />}
        </S.Title>
        <S.Date>{date}</S.Date>
      </S.ContentWrapper>
      <S.CardImage $hasRealImage={hasRealImage}>
        <img src={image ?? dummyImages[type] ?? null} alt={title} />
      </S.CardImage>
    </S.CardContainer>
  );
}
