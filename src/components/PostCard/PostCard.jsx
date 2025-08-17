import React from "react";
import * as S from "./PostCardStyle.js";
import Badge from "../Badge/Badge";

export default function PostCard({ badges = [], title = "제목 없음", date = "" }) {
  return (
    <S.Container>
      <S.ContentWrapper>
        <S.BadgeWrapper>
          {badges.map((badgeInfo, index) => (
            <Badge key={index} color={badgeInfo.color} isFilled={badgeInfo.isFilled}>
              {badgeInfo.text}
            </Badge>
          ))}
        </S.BadgeWrapper>
        <S.Title>{title}</S.Title>
        {/* 날짜 데이터가 있을 때만 표시합니다 */}
        {date && <S.Date>{date}</S.Date>}
      </S.ContentWrapper>
      <S.CardImage />
    </S.Container>
  );
}