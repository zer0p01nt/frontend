import styled, { css, keyframes } from "styled-components";

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: var(--color-text-primary-brand);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  opacity: 1;

  /* fade-out 상태일 때만 애니메이션 적용 */
  ${({ $isfading }) =>
    $isfading &&
    css`
      animation: ${fadeOut} 0.5s ease-in-out forwards;
      pointer-events: none;
    `}

  img {
    width: 100px;
    height: auto;
    object-fit: contain;
  }
`;
