import styled, { css } from "styled-components";

// isFilled={true} 일 때 (채워진 스타일)
const getFilledBadgeColors = (color) => {
  switch (color) {
    case "pink":
      return {
        background: "var(--color-pink-50)",
        text: "var(--color-pink-600)",
      };
    case "teal":
      return {
        background: "var(--color-teal-50)",
        text: "var(--color-teal-700)",
      };
    case "blue":
    default:
      return {
        background: "var(--color-blue-50)",
        text: "var(--color-blue-600)",
      };
  }
};

// isFilled={false} 일 때 (테두리만 있는 스타일)
const getUnfilledBadgeColors = (color) => {
  switch (color) {
    case "pink":
      return {
        text: "var(--color-pink-600)",
      };
    case "teal":
      return {
        text: "var(--color-teal-600)", // Figma: #00C4B7
      };
    case "blue":
    default:
      return {
        text: "var(--color-blue-400-main)", // Figma: #2769FF
      };
  }
};

export const BadgeContainer = styled.span`
  display: inline-flex;
  padding: ${({ $isFilled }) => ($isFilled ? "4px 12px" : "2px 12px")};
  justify-content: center;
  align-items: center;
  border-radius: var(--border-radius-rounded);
  font-size: var(--Body-sm-font-size);
  font-weight: 400;
  line-height: var(--Body-sm-line-height);

  ${({ color, $isFilled }) => {
    // isFilled={true} : 테두리가 없는 채워진 스타일
    if ($isFilled) {
      const { background, text } = getFilledBadgeColors(color);
      return css`
        background-color: ${background};
        color: ${text};
        border: 1px solid transparent;
      `;
    }
    // isFilled={false} : 반투명 스타일 (홈 화면용)
    else {
      return css`
        background-color: rgba(254, 254, 254, 0.4);
        border: 1px solid var(--color-base-white);
        color: var(--color-base-white); 
      `;
    }
  }}
`;