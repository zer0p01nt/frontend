import styled from "styled-components";

export const FilterContainer = styled.div`
  display: flex;
  gap: 8px;
  padding: 12px 24px;
  overflow-x: auto;
  white-space: nowrap;

  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const Button = styled.button`
  padding: 6px 12px;
  border-radius: var(--border-radius-rounded);
  font-size: var(--Body-sm-font-size);
  font-weight: 500;
  flex-shrink: 0;
  transition: all 150ms ease-in-out;

  background-color: ${({ $isSelected }) =>
    $isSelected
      ? "var(--color-neutral-brand-primary)"
      : "var(--color-base-white)"};

  color: ${({ $isSelected }) =>
    $isSelected
      ? "var(--color-base-white)"
      : "var(--color-base-black)"};

  border: ${({ $isSelected }) =>
    $isSelected
      ? "1px solid transparent"
      : "0.5px solid var(--color-neutral-tertiary)"};
  
  /* 모든 버튼에 그림자 효과 적용 */
  box-shadow: var(--shadow-default);
`;