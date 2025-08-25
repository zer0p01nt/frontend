import styled from "styled-components";

export const PushBtnContainer = styled.div`
  background-color: var(--color-base-white);
  width: 100%;
  max-width: 393px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
`;

export const PushBtnText = styled.div`
  color: ${({ $loading }) =>
    $loading ? "var(--color-neutral-400)" : "var(--color-base-black)"};
  font-weight: 500;
  font-size: var(--Body-md-font-size);
`;

export const PushButton = styled.button`
  border-radius: var(--border-radius-rounded);
  box-shadow: var(--shadow-default);
  background-color: ${({ $loading }) =>
    $loading
      ? "var(--color-neutral-400)"
      : "var(--color-neutral-brand-primary)"};
  color: var(--color-base-white);
  padding: 6px 12px;
  font-weight: 500;
`;
