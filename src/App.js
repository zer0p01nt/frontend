import styled from "styled-components";
import Main from "./components/layout/Main";
import Navigator from "./components/Navigator/Navigator";
import SearchInputField from "./components/SearchInputField/SearchInputField";
import GlobalStyle from "./styles/GlobalStyle";

// UI 테스트용 스타일 컴포넌트입니다
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Main>
        <Container>
          <div
            style={{
              textAlign: "center",
              backgroundColor: "pink",
              width: "100%",
            }}
          >
            🦁 니은다섯 프론트엔드 레포지토리 입니다 🦁
          </div>
          <SearchInputField />
        </Container>
        <Navigator />
      </Main>
    </>
  );
}

export default App;
