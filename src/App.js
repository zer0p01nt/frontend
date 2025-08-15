import { Outlet, Route, Routes } from "react-router-dom";
import Main from "./components/layout/Main";
import Navigator from "./components/Navigator/Navigator";
import GlobalStyle from "./styles/GlobalStyle";
import Home from "./pages/Home/Home";
import Detail from "./pages/Detail/Detail";
import Search from "./pages/Search/Search.jsx";
import MyPage from "./pages/MyPage/MyPage";
import ScrapedChatbots from "./pages/ScrapedChatbots/ScrapedChatbots";
import ScrapedPosts from "./pages/ScrapedPosts/ScrapedPosts";
import Profile from "./pages/Profile/Profile";
import Notification from "./pages/Notification/Notification.jsx";
import News from "./pages/News/News";

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
            <Route path='/notification' element={<Notification />} />
            <Route path='/news' element={<News />} />
            <Route path='/mypage' element={<MyPage />} />
          </Route>
          <Route element={<WithoutNav />}>
            {/* Navigator가 없는 경우 이쪽에 route를 만들어주세요 */}
            <Route path='/detail' element={<Detail />} />
            {/* 추후 /post/:id로 경로 변경할 예정 */}
            <Route path='/search' element={<Search />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/scrap/posts' element={<ScrapedPosts />} />
            <Route path='/scrap/chatbots' element={<ScrapedChatbots />} />
          </Route>
        </Routes>
      </Main>
    </>
  );
}

export default App;
