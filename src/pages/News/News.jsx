import React, { useRef, useState } from "react";
import Header from "../../components/Header/Header";
import GoToTop from "../../components/GoToTop/GoToTop";
import CategoryBar from "../../components/CategoryBar/CategoryBar"; 
import Filter from "../../components/Filter/Filter";
import PostCard from "../../components/PostCard/PostCard";
import Badge from "../../components/Badge/Badge";
import * as B from "../../styles/ButtonCircle";
import * as S from "./NewsStyle";

const hotNews = [
  {
    id: 1,
    region: "도봉구",
    keyword: "문화",
    title: "지금 많이 보는 공문 제목입니다. (1)",
  },
  {
    id: 2,
    region: "강북구",
    keyword: "교통",
    title: "두 번째로 많이 보는 공문입니다. (2)",
  },
  {
    id: 3,
    region: "서울시",
    keyword: "복지",
    title: "세 번째 배너형 공문입니다. (3)",
  },
];

const dummyNews = [
  {
    id: 2,
    region: "강북구",
    keyword: "교통",
    title: "일반 소식 공문 제목입니다.",
    date: "2025.07.30",
  },
  {
    id: 3,
    region: "서울시",
    keyword: "복지",
    title: "새로운 복지 정책 안내",
    date: "2025.07.29",
  },
];

export default function News() {
  const [currentPage, setCurrentPage] = useState(1);
  const bannerRef = useRef(null);

  const handleCategoryChange = (category) => {
    console.log("선택된 카테고리:", category);
  };

  const handleBannerScroll = () => {
    if (bannerRef.current) {
      const slideWidth = bannerRef.current.firstChild.clientWidth;
      const page = Math.round(bannerRef.current.scrollLeft / slideWidth) + 1;
      setCurrentPage(page > 0 ? page : 1);
    }
  };

  return (
    <>
      <Header hasBack={false} title='소식' hasScrap={false} />
      <S.NewsContainer>
        <S.SectionTitle>지금 많이 보는 공문</S.SectionTitle>
        <S.BannerSection>
          <S.BannerWrapper ref={bannerRef} onScroll={handleBannerScroll}>
            {hotNews.map((item) => (
              <S.BannerSlide key={item.id}>
                <S.BadgeWrapper>
                  <Badge color='blue' isFilled={false}>
                    {item.region}
                  </Badge>
                  <Badge color='teal' isFilled={false}>
                    {item.keyword}
                  </Badge>
                </S.BadgeWrapper>
                <S.SlideTitle>{item.title}</S.SlideTitle>
              </S.BannerSlide>
            ))}
          </S.BannerWrapper>
          <S.Pager>
            {currentPage} / {hotNews.length}
          </S.Pager>
        </S.BannerSection>

        <S.ContentSection>
          {/* 2. Filter 위에 CategoryBar 추가 */}
          <CategoryBar onCategoryChange={handleCategoryChange} />
          <S.FilterWrapper>
            <Filter />
          </S.FilterWrapper>

          {dummyNews.map((item) => (
            <PostCard
              key={item.id}
              badges={[
                { text: item.region, color: "blue" },
                { text: item.keyword, color: "teal" },
              ]}
              title={item.title}
              date={item.date}
            />
          ))}
        </S.ContentSection>
      </S.NewsContainer>
      <B.ButtonWrapper>
        <GoToTop />
      </B.ButtonWrapper>
    </>
  );
}