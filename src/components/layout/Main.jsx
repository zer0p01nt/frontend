import styled from "styled-components";

/* 모바일 환경 구현을 위해 max-width를 393px로 고정 */
const MainWrapper = styled.div`
  width: 100%;
  max-width: 393px;
  margin: 0 auto;
  min-height: 100vh;
`;

export default function Main({ children }) {
  return <MainWrapper>{children}</MainWrapper>;
}
