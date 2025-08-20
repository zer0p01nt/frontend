import React, { useRef, useState, useEffect, useCallback } from "react";
import Header from "../../components/Header/Header";
import GoToTop from "../../components/GoToTop/GoToTop";
import CategoryBar from "../../components/CategoryBar/CategoryBar";
import Filter from "../../components/Filter/Filter";
import PostCard from "../../components/PostCard/PostCard";
import Badge from "../../components/Badge/Badge";
import * as B from "../../styles/ButtonCircle";
import * as S from "./NewsStyle";
import useFetch from "../../hooks/useFetch";
import { makeBadges } from "../../utils/makeBadges";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

export default function News() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const bannerRef = useRef(null);

  // 1. [지금 많이 보는 공문] 배너 API 연동
  const { data: hotNewsData, isLoading: isHotNewsLoading } = useFetch(
    `${API_URL}/documents/?order=views&page_size=3`, // 조회수(views) 순으로 3개 가져오기
    {}
  );
  const hotNews = hotNewsData?.results ?? [];

  // 2. [전체 공문 목록] API 연동 (무한 스크롤)
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef(null); // 스크롤 감지를 위한 ref

  const { data: postsData, isLoading: isPostsLoading } = useFetch(
    hasMore ? `${API_URL}/documents/?page=${page}` : null,
    {}
  );

  useEffect(() => {
    if (postsData?.results) {
      setPosts((prevPosts) => [...prevPosts, ...postsData.results]);
      // 'next' 필드가 null이면 더 이상 불러올 페이지가 없음
      setHasMore(postsData.next !== null);
    }
  }, [postsData]);

  // 스크롤이 맨 아래에 닿으면 다음 페이지 로드
  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !isPostsLoading) {
        setPage((prevPage) => prevPage + 1);
      }
    },
    [hasMore, isPostsLoading]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [handleObserver]);

  // 배너 스크롤 핸들러 (기존과 동일)
  const handleBannerScroll = () => {
    if (bannerRef.current) {
      const slideWidth = bannerRef.current.firstChild.clientWidth;
      const page = Math.round(bannerRef.current.scrollLeft / slideWidth) + 1;
      setCurrentPage(page > 0 ? page : 1);
    }
  };

  const handleCategoryChange = (category) => {
    console.log("선택된 카테고리:", category);
  };

  return (
    <>
      <Header hasBack={false} title='소식' hasScrap={false} />
      <S.NewsContainer>
        <S.SectionTitle>지금 많이 보는 공문</S.SectionTitle>
        <S.BannerSection>
          <S.BannerWrapper ref={bannerRef} onScroll={handleBannerScroll}>
            {!isHotNewsLoading &&
              hotNews.map((item) => (
                <S.BannerSlide
                  key={item.id}
                  onClick={() => navigate(`/post/${item.id}`)}
                >
                  <S.BadgeWrapper>
                    {/* isFilled를 false로 하여 '칩' 스타일 적용 */}
                    {makeBadges(item).map((badge, index) => (
                      <Badge key={index} color={badge.color} isFilled={false}>
                        {badge.text}
                      </Badge>
                    ))}
                  </S.BadgeWrapper>
                  <S.SlideTitle>{item.doc_title}</S.SlideTitle>
                </S.BannerSlide>
              ))}
          </S.BannerWrapper>
          <S.Pager>
            {currentPage} / {hotNews.length || 1}
          </S.Pager>
        </S.BannerSection>

        <S.ContentSection>
          <CategoryBar onCategoryChange={handleCategoryChange} />
          <S.FilterWrapper>
            <Filter />
          </S.FilterWrapper>

          {/* 3. 더미데이터를 실제 데이터로 교체 */}
          {!isPostsLoading &&
            posts.map((item) => (
              <PostCard
                key={item.id}
                badges={makeBadges(item)}
                title={item.doc_title}
                date={item.pub_date.slice(0, 10)}
                onClick={() => navigate(`/post/${item.id}`)}
                image={item.image_url}
                type={item.doc_type}
              />
            ))}
          {/* 4. 무한 스크롤 감지를 위한 div */}
          <div ref={loadMoreRef} />
        </S.ContentSection>
      </S.NewsContainer>
      <B.ButtonWrapper>
        <GoToTop />
      </B.ButtonWrapper>
    </>
  );
}
