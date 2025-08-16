import styled from "styled-components";

export const CategoryContainer = styled.div`
  display: flex;
  padding: 0 16px;
  border-bottom: 1px solid var(--color-neutral-200);
  overflow-x: auto;
  white-space: nowrap;
  gap: 8px; /* 1. 각 아이템 사이에 8px 간격 추가 */

  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  z-index: 30;
  background-color: var(--color-base-white);
  /* 고정 코드 추가 */
  position: fixed;
  top: 42px;
  width: 100%;
  max-width: 393px;
`;

export const CategoryItem = styled.div`
  padding: 12px; /* 2. 내부 여백을 상하좌우 12px로 수정 */
  font-size: var(--Body-md-font-size);
  font-weight: ${({ $isSelected }) => ($isSelected ? "600" : "500")};
  color: ${({ $isSelected }) =>
    $isSelected ? "var(--color-base-black)" : "var(--color-text-secondary)"};
  border-bottom: 2px solid
    ${({ $isSelected }) =>
      $isSelected ? "var(--color-base-black)" : "transparent"};
  cursor: pointer;
  transition: all 150ms ease-in-out;
  z-index: 30;
  background-color: var(--color-base-white);
`;
