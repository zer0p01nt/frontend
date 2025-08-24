import styled from "styled-components";

export const Btn = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 0;
  color: ${({ $atMyPage }) => $atMyPage ? "var(--color-neutral-tertiary)" : "var(--color-text-secondary)"};

  span {
    font-size: var(--Body-sm-font-size);
    font-weight: 400;
    line-height: var(--Body-sm-line-height);
    white-space: nowrap;
  }

  img {
    width: 12px;
    height: 12px;
    aspect-ratio: 1/1;
  }
`;
