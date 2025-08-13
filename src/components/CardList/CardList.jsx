import React from "react";
import * as S from "./CardListStyle.js";
import Badge from "../Badge/Badge";

export default function CardList({
  badges = [],
  title = "제목 없음",
  date = "",
  badgeVariant = "filled",
  variant = "list",
}) {
  // 뱃지들을 렌더링하는 부분은 공통이므로 변수로 분리
  const badgeComponent = (
    <S.BadgeWrapper>
      {badges.map((badgeInfo, index) => (
        <Badge key={index} color={badgeInfo.color} variant={badgeVariant}>
          {badgeInfo.text}
        </Badge>
      ))}
    </S.BadgeWrapper>
  );

  // "다가오는 관심 일정"의 카드 스타일일 경우
  if (variant === "card") {
    return (
      <S.CardContainer variant={variant}>
        {/* 👇 1. 뱃지 -> 2. 이미지 -> 3. 글자 순서로 배치 */}
        {badgeComponent}
        <S.CardImage />
        <S.ContentWrapper>
          <S.Title>{title}</S.Title>
          <S.Date>{date}</S.Date>
        </S.ContentWrapper>
      </S.CardContainer>
    );
  }

  // 기본 밑줄 스타일일 경우
  return (
    <S.CardContainer variant={variant}>
      {/* 👇 1. 글자/뱃지 -> 2. 이미지 순서로 배치 */}
      <S.ContentWrapper>
        {badgeComponent}
        <S.Title>{title}</S.Title>
        <S.Date>{date}</S.Date>
      </S.ContentWrapper>
      <S.CardImage />
    </S.CardContainer>
  );
}