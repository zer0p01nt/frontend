import styled from "styled-components";

// 뱃지 종류에 따라 다른 색상 값을 반환하는 함수
const getBadgeColors = (color) => {
  switch (color) {
    case "pink":
      return {
        background: "var(--color-pink-100)",
        text: "var(--color-pink-600)",
      };
    case "teal":
      return {
        background: "var(--color-teal-100)",
        text: "var(--color-teal-700)",
      };
    case "blue":
    default:
      return {
        background: "var(--color-blue-100)",
        text: "var(--color-blue-600)",
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
  background-color: ${({ color, $isFilled }) =>
    $isFilled ? getBadgeColors(color).background : "rgba(254, 254, 254, 0.4)"};

  border: 1px solid
    ${({ color, $isFilled }) =>
      $isFilled ? "transparent" : "var(--color-base-white)"};

  color: ${({ color, $isFilled }) => {
    if ($isFilled) {
      // 1. 채워진 뱃지는 기존 색상 규칙을 그대로 따릅니다.
      return getBadgeColors(color).text;
    } else {
      // 2. 채워지지 않은 뱃지(테두리만 있는 경우)
      if (color === "teal") {
        return "var(--color-teal-600)";
      }
      // 2-2. 그 외(blue, pink 등)에는 원래의 기본 글자색을 적용합니다.
      return "var(--color-neutral-brand-primary)";
    }
  }};
`;
