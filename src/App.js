import { useEffect, useState } from "react";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Main from "./components/layout/Main";
import GlobalStyle from "./styles/GlobalStyle";

import Navigator from "./components/Navigator/Navigator";
import PageTransition from "./components/PageTransition/PageTransition.jsx";

import Home from "./pages/Home/Home";
import Detail from "./pages/Detail/Detail";
import Search from "./pages/Search/Search.jsx";
import MyPage from "./pages/MyPage/MyPage";
import ScrapedChatbots from "./pages/ScrapedChatbots/ScrapedChatbots";
import ScrapedPosts from "./pages/ScrapedPosts/ScrapedPosts";
import Profile from "./pages/Profile/Profile";
import Notification from "./pages/Notification/Notification.jsx";
import News from "./pages/News/News";
import NotFound from "./pages/NotFound/NotFound.jsx";

// 페이지 전환 애니메이션을 위한 경로별 우선순위 정의
const PAGE_ORDER = {
  "/": 1,
  "/notification": 2,
  "/news": 3,
  "/mypage": 4,

  // 검색, 프로필, 스크랩 목록은 보다 깊은 경로
  "/search": 10,
  "/profile": 11,
  "/scrap/posts": 12,
  "/scrap/chatbots": 13,
};

const getPageIndex = (path) => {
  if (path.startsWith("/post/")) return 20; // 상세 페이지는 가장 깊은 경로
  return PAGE_ORDER[path] || 0;
};

// 이전 인덱스를 기억하기 위한 변수
let lastIndex = 0;

// Navigator를 띄우는 레이아웃
function WithNav({ direction }) {
  return (
    <>
      <Navigator />
      <PageTransition direction={direction}>
        <Outlet />
      </PageTransition>
    </>
  );
}

// Navigator가 없는 레이아웃
function WithoutNav({ direction }) {
  return (
    <PageTransition direction={direction}>
      <Outlet />
    </PageTransition>
  );
}

function App() {
  const location = useLocation(); // 현재 경로 감지

  const currentIndex = getPageIndex(location.pathname);
  const direction = currentIndex < lastIndex ? -1 : 1;
  lastIndex = currentIndex; // 다음 렌더링을 위해 현재 인덱스 저장
  return (
    <>
      <GlobalStyle />
      <Main>
        <AnimatePresence mode='popLayout' initial={false} custom={direction}>
          <Routes location={location} key={location.pathname}>
            <Route element={<WithNav direction={direction} />}>
              {/* Navigator가 있는 경우 */}
              <Route index element={<Home />} />
              <Route path='/notification' element={<Notification />} />
              <Route path='/news' element={<News />} />
              <Route path='/mypage' element={<MyPage />} />
            </Route>
            <Route element={<WithoutNav direction={direction} />}>
              {/* Navigator가 없는 경우 */}
              <Route path='/post/:id' element={<Detail />} />
              <Route path='/search' element={<Search />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/scrap/posts' element={<ScrapedPosts />} />
              <Route path='/scrap/chatbots' element={<ScrapedChatbots />} />
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </Main>
    </>
  );
}

export default App;
