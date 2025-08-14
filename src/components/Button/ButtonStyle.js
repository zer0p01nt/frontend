import styled, { css } from "styled-components";

export const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

export const HiddenLabel = styled.label`
  position: relative;
  display: inline-block;
`;

export const SelectedBtnContainer = styled.span`
  display: inline-flex;
  padding: 6px 12px;
  justify-content: center;
  align-items: center;
  border-radius: var(--border-radius-rounded);
  border: 0.5px solid var(--color-neutral-tertiary);
  background: var(--color-base-white);
  color: var(--color-base-black);
  font-size: var(--Body-sm-font-size);
  font-weight: 600;
  line-height: var(--Body-sm-line-height);
  box-shadow: var(--shadow-default);
  cursor: pointer;
  user-select: none;
  white-space: nowrap;

  ${({ $checked }) =>
    $checked &&
    css`
      background: var(--color-neutral-brand-primary);
      color: var(--color-base-white);
    `}
`;
