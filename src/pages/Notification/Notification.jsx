import React from "react";
import Header from "../../components/Header/Header";
import GoToTop from "../../components/GoToTop/GoToTop";
import CategoryBar from "../../components/CategoryBar/CategoryBar";
import CardList from "../../components/CardList/CardList";
import SmallFilter from "../../components/SmallFilter/SmallFilter";
import * as B from "../../styles/ButtonCircle";
import * as S from "./NotificationStyle";
import * as F from "../../components/SmallFilter/SmallFilterStyle";
import useFetch from "../../hooks/useFetch";
import NotificationEmpty from "./NotificationEmpty";
import { makeScrapBadges } from "../../utils/makeBadges"; // 뱃지 생성 유틸리티
import { useNavigate } from "react-router-dom"; // 페이지 이동 훅

export default function Notification() {
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  // useFetch로 알림 목록 데이터 받아오기
  const { data: notificationData, isLoading } = useFetch(
    `${API_URL}/notification/notification/?user_id=GUEST1`,
    {} // 초기값은 빈 객체로 설정
  );

  // 실제 알림 목록은 API 응답의 'results' 안에 들어있습니다.
  const notifications = notificationData?.results ?? [];

  const handleCategoryChange = (category) => {
    console.log("선택된 카테고리:", category);
  };

  const handleFilterChange = (filter) => {
    console.log("선택된 필터:", filter);
  };

  return (
    <>
      <Header hasBack={false} title='알림' hasScrap={false} />
      <S.NotificationContainer>
        <CategoryBar onCategoryChange={handleCategoryChange} />
        <F.SmallFilterWrapper>
          <SmallFilter sourceKey='user_regions' onChange={handleFilterChange} />
          <SmallFilter
            sourceKey='user_categories'
            onChange={handleFilterChange}
          />
        </F.SmallFilterWrapper>

        {/* 로딩이 끝난 후, 데이터 유무에 따라 다른 화면 표시 */}
        {!isLoading &&
          (notifications.length > 0 ? (
            // 알림이 있을 경우: 실제 데이터로 목록 표시
            notifications.map((item) => (
              <CardList
                key={item.id}
                variant='notification'
                badges={makeScrapBadges(item)} // API 데이터에 맞게 뱃지 생성
                title={item.doc_title} // 실제 제목 데이터
                date={item.pub_date.slice(0, 10)} // 실제 날짜 데이터
                isUnread={!item.is_read} // '읽음' 상태의 반대로 '안읽음' 표시
                onClick={() => navigate(`/post/${item.id}`)} // 클릭 시 상세 페이지로 이동
              />
            ))
          ) : (
            // 알림이 없을 경우: 빈 화면 표시
            <NotificationEmpty />
          ))}
      </S.NotificationContainer>

      <B.ButtonWrapper>
        <GoToTop />
      </B.ButtonWrapper>
    </>
  );
}
