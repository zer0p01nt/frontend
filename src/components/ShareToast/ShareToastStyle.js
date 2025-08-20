import styled from "styled-components";
import check from "../../assets/check_circle.svg";

export const ToastContainer = styled.div`
  width: 86.5%;
  max-width: 340px;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  position: fixed;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%)
    translateY(${({ $isVisible }) => ($isVisible ? "0" : "8px")});
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  visibility: ${({ $isVisible }) => ($isVisible ? "visible" : "hidden")};

  border-radius: var(--border-radius-2xl);
  background: var(--color-blue-50);

  transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out,
    visibility 0.25s ease-in-out;
  z-index: 10000;
`;

export const CheckIcon = styled.div`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  background-image: url(${check});
`;

export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const TextTitle = styled.div`
  color: var(--color-text-primary-brand);
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
