import styled from "styled-components";

export const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 100px 0;
  gap: ${({ $isInNotFound }) => ($isInNotFound ? "8px" : "0px")};
`;

export const Btn = styled.button`
  width: 70%;
  height: 40px;
  border-radius: 8px;
  background-color: var(--color-blue-400-main);
  color: #fff;
  font-weight: 600;
  transition: background-color 0.3s ease;

  &:hover,
  &:active {
    background-color: var(--color-blue-500);
  }
`;
