import styled from "styled-components";

export const ButtonWrapper = styled.div`
  max-width: 393px;
  position: fixed;
  right: max(calc(50vw - 393px / 2), 0px);
  bottom: 60px;
  display: inline-flex;
  padding: 24px 16px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
  pointer-events: none;
  z-index: 200; /* 네비게이터(10)보다 위에 보이도록 순서를 20으로 지정 */

  & > * {
    pointer-events: auto; /* 자식 버튼만 클릭 가능하도록 설정 */
  }
`;

export const ButtonCircle = styled.button`
  display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  padding: 11px;
  border-radius: var(--border-radius-rounded);
  box-shadow: var(--shadow-default);
  background-image: url(${({ $icon }) => $icon});
  background-color: var(--color-neutral-brand-primary);
  background-repeat: no-repeat;
  background-position: center center;
  transition: background-color 0.3s ease;

  &:hover,
  &:active {
    background-color: var(--color-blue-500);
  }
`;
