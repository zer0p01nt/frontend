import React from "react";
import Header from "../../components/Header/Header";
import GoToTop from "../../components/GoToTop/GoToTop";
import CategoryBar from "../../components/CategoryBar/CategoryBar";
import CardList from "../../components/CardList/CardList";
import Filter from "../../components/Filter/Filter";
import * as B from "../../styles/ButtonCircle";
import * as S from "./NewsStyle";


const dummyNews = [
    { id: 2, region: "강북구", keyword: "교통", title: "일반 소식 공문 제목입니다.", date: "2025.07.30" },
    { id: 3, region: "서울시", keyword: "복지", title: "새로운 복지 정책 안내", date: "2025.07.29" },
    { id: 4, region: "도봉구", keyword: "주택", title: "주택 관련 새로운 소식", date: "2025.07.28" },
    { id: 5, region: "강남구", keyword: "경제", title: "경제 지원 정책 발표", date: "2025.07.27" },
];

export default function News() {
  const handleCategoryChange = (category) => {
    console.log("선택된 카테고리:", category);
  };

  return (
    <>
      <Header hasBack={false} title='소식' hasScrap={false} />
      <S.NewsContainer>
        
        {/* 필터 및 소식 목록 */}
        <CategoryBar onCategoryChange={handleCategoryChange} />
        <Filter />
        
        {dummyNews.map((item) => (
          <CardList
            key={item.id}
            variant='notification'
            badges={[
              { text: item.region, color: "blue" },
              { text: item.keyword, color: "teal" },
            ]}
            title={item.title}
            date={item.date}
          />
        ))}

      </S.NewsContainer>
      <B.ButtonWrapper>
        <GoToTop />
      </B.ButtonWrapper>
    </>
  );
}