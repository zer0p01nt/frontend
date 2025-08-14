import styled from "styled-components";

export const SmallFilterWrapper = styled.div`
  width: 100%;
  max-width: 393px;
  margin: 0 auto;
  display: flex;
  padding: 12px 24px;
  align-items: center;
  gap: 8px;
  flex: 1 0 0;
  overflow-x: auto;
  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
