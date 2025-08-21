import styled, { css } from "styled-components";

// isFilled={true} 일 때 (원래 기본 스타일 - 테두리 없음)
// 뱃지 바탕색 변경에 따라 이 부분을 변경함
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

export const BadgeContainer = styled.span`
  display: inline-flex;
  padding: ${({ $isFilled }) => ($isFilled ? "4px 12px" : "2px 12px")};
  justify-content: center;
  align-items: center;
  border-radius: var(--border-radius-rounded);
  font-size: var(--Body-sm-font-size);
  font-weight: 600;
  line-height: var(--Body-sm-line-height);

  ${({ color, $isFilled }) => {
    // isFilled={true} : 테두리가 없는 채워진 스타일 (원래 기본값)
    if ($isFilled) {
      const { background, text } = getFilledBadgeColors(color);
      return css`
        background-color: ${background};
        color: ${text};
        border: 1px solid transparent; /* 테두리 없음 */
      `;
    }
    // isFilled={false} : 반투명 스타일 (소식 페이지 배너용)
    else {
      return css`
        background-color: rgba(254, 254, 254, 0.4);
        border: 1px solid var(--color-base-white);
        color: var(--color-base-black); /* 글자색 검은색으로 수정 */
      `;
    }
  }}
`;
