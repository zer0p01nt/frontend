import React from "react";
import * as S from "./CardListStyle.js";
import Badge from "../Badge/Badge";
import { dummyImages } from "../../constants/dummyImages.js";

export default function CardList({
  badges = [],
  title = "제목 없음",
  date = "",
  variant = "list",
  isUnread = false, // 안 읽음 상태 prop 추가
  onClick,
  image,
  type,
}) {
  // 뱃지들을 렌더링하는 부분
  const badgeComponent = (
    <S.BadgeWrapper>
      {badges.map((badgeInfo, index) => (
        <Badge key={index} color={badgeInfo.color}>
          {badgeInfo.text}
        </Badge>
      ))}
    </S.BadgeWrapper>
  );

  // "다가오는 관심 일정"의 카드 스타일일 경우
  if (variant === "card") {
    return (
      <S.CardContainer $variant={variant}>
        {badgeComponent}
        <S.CardImage />
        <S.ContentWrapper>
          <S.Title>{title}</S.Title>
          <S.Date>{date}</S.Date>
        </S.ContentWrapper>
      </S.CardContainer>
    );
  }

  // 기본 밑줄 스타일일 경우 (알림 페이지 등)
  return (
    <S.CardContainer $variant={variant} $isUnread={isUnread} onClick={onClick}>
      <S.ContentWrapper>
        {badgeComponent}
        <S.Title>
          {title}
          {/* isUnread가 true일 때만 파란 점 렌더링 */}
          {isUnread && <S.UnreadMark />}
        </S.Title>
        <S.Date>{date}</S.Date>
      </S.ContentWrapper>
      <S.CardImage>
        <img src={image ?? dummyImages[type] ?? null} />
      </S.CardImage>
    </S.CardContainer>
  );
}
