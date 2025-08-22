import React from "react";
import * as S from "./CardListStyle.js";
import Badge from "../Badge/Badge";
import { dummyImages } from "../../constants/dummyImages.js";

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
          <S.Title $variant="card">{title}</S.Title>
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