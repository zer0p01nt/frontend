import styled from "styled-components";
import close from "../../assets/close_circle.svg";

export const ToastContainer = styled.div`
  width: 86.5%;
  max-width: 340px;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  position: fixed;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: var(--border-radius-2xl);
  background: #fef2f2;
`;

export const CheckIcon = styled.div`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  background-image: url(${close});
`;

export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const TextTitle = styled.div`
  color: var(--color-text-danger);
  font-size: var(--Body-md-font-size);
  line-height: var(--Body-md-line-height);
  font-weight: 600;
`;

export const TextContent = styled.div`
  color: #000;
  font-size: var(--Body-md-font-size);
  line-height: var(--Body-md-line-height);
  font-weight: 400;
`;
