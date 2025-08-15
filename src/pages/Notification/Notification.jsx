import React from "react";

import Header from "../../components/Header/Header";
import GoToTop from "../../components/GoToTop/GoToTop";
import CategoryBar from "../../components/CategoryBar/CategoryBar";
import CardList from "../../components/CardList/CardList";
import SmallFilter from "../../components/SmallFilter/SmallFilter";

import * as B from "../../styles/ButtonCircle";
import * as S from "./NotificationStyle";
import * as F from "../../components/SmallFilter/SmallFilterStyle";


const dummyNotifications = [
  {
    id: 1,
    region: "도봉구",
    keyword: "문화",
    title: "미확인 알림입니다",
    date: "2025.07.30",
    isUnread: true,
  },
  {
    id: 2,
    region: "강북구",
    keyword: "교통",
    title: "확인한 알림입니다",
    date: "2025.07.30",
    isUnread: false,
  },
  {
    id: 3,
    region: "서울시",
    keyword: "시설",
    title: "이것도 확인한 알림",
    date: "2025.07.30",
    isUnread: false,
  },
  {
    id: 4,
    region: "서울시",
    keyword: "시설",
    title: "추가된 알림 데이터",
    date: "2025.07.29",
    isUnread: true,
  },
  {
    id: 5,
    region: "서울시",
    keyword: "시설",
    title: "추가된 알림 데이터",
    date: "2025.07.29",
    isUnread: false,
  },
  {
    id: 6,
    region: "서울시",
    keyword: "시설",
    title: "추가된 알림 데이터",
    date: "2025.07.28",
    isUnread: false,
  },
  {
    id: 7,
    region: "도봉구",
    keyword: "문화",
    title: "추가된 알림 데이터",
    date: "2025.07.27",
    isUnread: false,
  },
  {
    id: 8,
    region: "강북구",
    keyword: "교통",
    title: "추가된 알림 데이터",
    date: "2025.07.26",
    isUnread: false,
  },
];

export default function Notification() {
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

        {dummyNotifications.map((item) => (
          <CardList
            key={item.id}
            variant='notification'
            badges={[
              { text: item.region, color: "blue" },
              { text: item.keyword, color: "teal" },
            ]}
            title={item.title}
            date={item.date}
            isUnread={item.isUnread}
          />
        ))}
      </S.NotificationContainer>

      {/* GoToTop을 다시 ButtonWrapper로 감싸는 원래의 단순한 방식으로 돌아갑니다. */}
      <B.ButtonWrapper>
        <GoToTop />
      </B.ButtonWrapper>
    </>
  );
}
