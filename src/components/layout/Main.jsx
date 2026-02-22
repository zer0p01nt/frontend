import styled from "styled-components";

const MainWrapper = styled.div`
  position: relative;
  overflow-x: hidden;
  width: 100%;
  max-width: 393px;
  margin: 0 auto;
  padding-bottom: 80px; /* 하단 네비게이터 높이만큼 여백 추가 */
`;

export default function Main({ children }) {
  return <MainWrapper>{children}</MainWrapper>;
}
