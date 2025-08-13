import { Outlet, Route, Routes } from "react-router-dom";
import Main from "./components/layout/Main";
import Navigator from "./components/Navigator/Navigator";
import GlobalStyle from "./styles/GlobalStyle";
import Home from "./pages/Home/Home";
import Detail from "./pages/Detail/Detail";
import Search from "./pages/Search/Search.jsx";

// Navigator를 띄우는 레이아웃
function WithNav() {
  return (
    <>
      <Navigator />
      <Outlet />
    </>
  );
}

// Navigator가 없는 레이아웃
function WithoutNav() {
  return <Outlet />;
}

function App() {
  return (
    <>
      <GlobalStyle />
      <Main>
        <Routes>
          <Route element={<WithNav />}>
            {/* Navigator가 있는 경우 이쪽에 route를 만들어주세요 */}
            <Route index element={<Home />} />
          </Route>
          <Route element={<WithoutNav />}>
            {/* Navigator가 없는 경우 이쪽에 route를 만들어주세요 */}
            <Route path='/detail' element={<Detail />} />
            <Route path='/search' element={<Search />} />
          </Route>
        </Routes>
      </Main>
    </>
  );
}

export default App;
