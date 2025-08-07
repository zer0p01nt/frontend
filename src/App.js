import Main from "./components/layout/Main";
import GlobalStyle from "./styles/GlobalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <Main>
        <div style={{ textAlign: "center", backgroundColor: "pink" }}>
          🦁 니은다섯 프론트엔드 레포지토리 입니다 🦁
        </div>
      </Main>
    </>
  );
}

export default App;
