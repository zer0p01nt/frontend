import React from "react";
import * as S from "./CardListStyle.js";
import Badge from "../Badge/Badge";

export default function CardList({
  badges = [],
  title = "제목 없음",
  date = "",
  badgeVariant = "filled",
  variant = "list", // variant prop 추가, 기본값은 'list'
}) {
  return (
    // CardContainer에 variant prop 전달
    <S.CardContainer variant={variant}>
      <S.ContentWrapper>
        <S.BadgeWrapper>
          {badges.map((badgeInfo, index) => (
            <Badge
              key={index}
              color={badgeInfo.color}
              variant={badgeVariant}
            >
              {badgeInfo.text}
            </Badge>
          ))}
        </S.BadgeWrapper>
        <S.Title>{title}</S.Title>
        <S.Date>{date}</S.Date>
      </S.ContentWrapper>
      <S.CardImage />
    </S.CardContainer>
  );
}