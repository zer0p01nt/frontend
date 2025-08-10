import styled from "styled-components";

// 뱃지 종류에 따라 다른 색상 값을 반환하는 함수
const getBadgeColors = (color) => {
  switch (color) {
    case "pink":
      return {
        background: "var(--color-pink-50)",
        text: "var(--color-pink-400-sub)",
      };
    case "teal":
      return {
        background: "var(--color-teal-50)",
        text: "var(--color-teal-400-sub)",
      };
    case "blue":
    default:
      return {
        background: "var(--color-blue-50)",
        text: "var(--color-blue-400-main)",
      };
  }
};

export const BadgeContainer = styled.span`
  display: inline-flex;
  padding: 4px 12px;
  justify-content: center;
  align-items: center;
  border-radius: var(--border-radius-rounded);
  font-size: var(--Body-sm-font-size);
  font-weight: 600;
  line-height: var(--Body-sm-line-height);

  /* isFilled 값에 따라 배경색과 테두리 스타일을 다르게 적용 */
  background-color: ${({ color, isFilled }) =>
    isFilled
      ? getBadgeColors(color).background
      : "rgba(254, 254, 254, 0.4)"}; /* 흰색 배경에 40% 투명도 적용 */

  border: 1px solid
    ${({ color, isFilled }) =>
      isFilled ? "transparent" : "var(--color-base-white)"}; /* 흰색 테두리 */

  color: ${({ color, isFilled }) =>
    isFilled
      ? getBadgeColors(color).text
      : "var(--color-neutral-brand-primary)"};
`;