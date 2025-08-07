import Main from "./components/layout/Main";
import Navigator from "./components/Navigator/Navigator";
import GlobalStyle from "./styles/GlobalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <Main>
        <div style={{ textAlign: "center", backgroundColor: "pink" }}>
          🦁 니은다섯 프론트엔드 레포지토리 입니다 🦁
        </div>
        <Navigator />
      </Main>
    </>
  );
}

export default App;
