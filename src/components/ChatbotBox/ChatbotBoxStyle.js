import styled from "styled-components";

export const ChatbotWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  background: var(--color-neutral-100);
`;

export const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 12px 8px;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  border-bottom: 0.5px solid var(--color-neutral-tertiary);
  background: var(--color-base-white);
`;

export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

export const BadgeBox = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const Title = styled.div`
  color: var(--color-base-black);
  font-size: var(--Body-md-font-size);
  font-weight: 500;
  line-height: var(--Body-md-line-height);
`;

export const DetailWrapper = styled.div`
  display: flex;
  padding: 0 12px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 0.5px solid var(--color-neutral-tertiary);
  border-bottom: 0.5px solid var(--color-neutral-tertiary);
  background: var(--color-base-white);
  width: 100%;
  position: relative;
`;

export const Button = styled.button`
  display: flex;
  padding: 12px 0;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
`;

export const Divide = styled.div`
  height: 100%;
  background-color: var(--color-neutral-tertiary);
  position: absolute;
  width: 0.5px;
  left: 50%;

  transform: translateX(-50%);
  pointer-events: none;
`;
