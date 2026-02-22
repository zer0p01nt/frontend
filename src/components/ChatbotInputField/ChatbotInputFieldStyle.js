import styled from "styled-components";
import arrowTrue from "../../assets/ChatbotInputField/arrow-up-true.svg";
import arrowFalse from "../../assets/ChatbotInputField/arrow-up-false.svg";

export const ChatbotInputForm = styled.form`
  width: calc(100% - 32px); // margin 만들어줌
  max-width: 361px;
  height: 45px;
  min-height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  border-radius: var(--border-radius-rounded);
  border: 0.5px solid var(--color-neutral-secondary);
  background-color: var(--color-base-white);
  box-shadow: var(--shadow-default);
  gap: 5px;
  position: fixed;
  bottom: 16px;
  z-index: 1;

  &:focus-within {
    border: 0.5px solid var(--color-blue-400-main);
  }

  transition: border 0.2s ease-in-out;
`;

export const ChatbotInputField = styled.input`
  width: 100%;
  color: var(--color-base-black);
  font-size: var(--Body-md-font-size);
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.1px;
  border: none;

  &::placeholder {
    color: var(--color-text-secondary);
  }
`;

export const ChatbotBtn = styled.button`
  width: 24px;
  height: 24px;
  aspect-ratio: 1/1;
  border: none;
  background-color: transparent;
  background-image: url(${({ $isLoading }) =>
    $isLoading ? arrowFalse : arrowTrue});
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
`;
