import React from "react";
import * as S from "./BadgeStyle.js";

/**
 * 뱃지 컴포넌트
 * @param {object} props
 * @param {React.ReactNode} props.children - 뱃지 안에 들어갈 텍스트
 * @param {'blue' | 'pink' | 'teal'} props.color - 뱃지의 색상
 * @param {boolean} props.isFilled - 배경색 채움 여부 (기본값: true)
 */
export default function Badge({ children, color = "blue", isFilled = true }) {
  return (
    <S.BadgeContainer color={color} isFilled={isFilled}>
      {children}
    </S.BadgeContainer>
  );
}