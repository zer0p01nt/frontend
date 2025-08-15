import styled from "styled-components";

export const ScrapedContainer = styled.div`
  margin: 0 auto;
  padding-top: 42px;
  width: 100%;
  max-width: 393px;
  box-sizing: border-box;
`;

export const OrderContainer = styled.div`
  padding: 0 24px;
`;

export const ResultBox = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  color: var(--color-neutral-600);
  font-size: var(--Body-sm-font-size);
  font-weight: 500;
  line-height: var(--Body-sm-line-height);
  letter-spacing: -0.1px;
`;

export const OrderBtn = styled.button`
  display: flex;
  padding: 8px 0;
  align-items: center;
  gap: 5px;
  flex-wrap: nowrap;
  cursor: pointer;
`;
