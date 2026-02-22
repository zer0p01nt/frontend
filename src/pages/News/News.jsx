import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import useFetch from "../../hooks/useFetch";
import { makeBadges } from "../../utils/makeBadges";
import {
  CATEGORY_TYPE_MAP,
  NAME_CATEGORY_MAP,
  NAME_REGION_MAP,
} from "../../constants/maps";

import * as B from "../../styles/ButtonCircle";
import * as S from "./NewsStyle";

import Header from "../../components/Header/Header";
import GoToTop from "../../components/GoToTop/GoToTop";
import CategoryBar from "../../components/CategoryBar/CategoryBar.jsx";
import Filter from "../../components/Filter/Filter";
import CardList from "../../components/CardList/CardList.jsx";
import Badge from "../../components/Badge/Badge";
import PageTitle from "../../components/PageTitle/PageTitle.jsx";
import CardListSkeleton from "../../components/CardList/CardListSkeleton.jsx";
import Empty from "../../components/Empty/Empty.jsx";

const API_URL = process.env.REACT_APP_API_URL;

export default function News() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const bannerRef = useRef(null);

  // 1. [지금 많이 보는 공문] 배너 API 연동
  const { data: hotNewsData, isLoading: isHotNewsLoading } = useFetch(
    `${API_URL}/documents/?order=views&page_size=3`,
    {},
  );
  const hotNews = hotNewsData?.results ?? [];

  // 2. [전체 공문 목록] API 연동 (무한 스크롤)
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef(null);

  // 필터 관련 상태
  const [docType, setDocType] = useState(undefined);
  const [regionIds, setRegionIds] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);

  const handleCategoryChange = useCallback((label) => {
    if (label === "모든 알림") setDocType(undefined);
    else setDocType(CATEGORY_TYPE_MAP[label] ?? undefined);
  }, []);

  const handleFilter = useCallback((selected) => {
    const rids = [];
    const cids = [];
    for (const s of selected) {
      if (NAME_REGION_MAP[s]) rids.push(NAME_REGION_MAP[s]);
      if (NAME_CATEGORY_MAP[s]) cids.push(NAME_CATEGORY_MAP[s]);
    }
    setRegionIds(Array.from(new Set(rids)));
    setCategoryIds(Array.from(new Set(cids)));
  }, []);

  // 필터, 카테고리 변경 시 목록 리셋
  useEffect(() => {
    setPage(1);
    setPosts([]);
    setHasMore(true);
  }, [docType, regionIds, categoryIds]);

  // 필터, 카테고리로 조합한 쿼리
  const filterQuery = useMemo(() => {
    const params = new URLSearchParams();
    if (docType) params.set("doc_type", docType);
    if (regionIds.length) params.set("region_id", regionIds.join(","));
    if (categoryIds.length) params.set("category", categoryIds.join(","));
    params.set("page", String(page));
    return `${API_URL}/documents/?${params.toString()}`;
  }, [docType, regionIds, categoryIds, page]);

  const listUrl = hasMore ? filterQuery : null;
  const { data: postsData, isLoading: isPostsLoading } = useFetch(listUrl, {});

  useEffect(() => {
    if (postsData?.results) {
      setPosts((prevPosts) => [...prevPosts, ...postsData.results]);
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
    [hasMore, isPostsLoading],
  );

  useEffect(() => {
    const option = { root: null, rootMargin: "20px", threshold: 0.1 };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [handleObserver]);

  // 배너 스크롤 핸들러
  const handleBannerScroll = () => {
    if (bannerRef.current) {
      const slideWidth = bannerRef.current.firstChild.clientWidth;
      const page = Math.round(bannerRef.current.scrollLeft / slideWidth) + 1;
      setCurrentPage(page > 0 ? page : 1);
    }
  };

  return (
    <>
      <PageTitle title='소식' />
      <Header hasBack={false} title='소식' hasScrap={false} />
      <S.NewsContainer>
        {/* 1. 오버레이가 덮으면 안 되는 상단 영역 */}
        <S.TopSection>
          <S.SectionTitle>지금 많이 보는 공문</S.SectionTitle>
          <S.BannerSection>
            <S.BannerWrapper ref={bannerRef} onScroll={handleBannerScroll}>
              {!isHotNewsLoading &&
                hotNews.map((item) => (
                  <S.BannerSlide
                    key={item.id}
                    onClick={() => navigate(`/post/${item.id}`)}
                    $image={item.image_url}
                    $type={item.doc_type}
                  >
                    <S.BadgeWrapper>
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
          <CategoryBar onCategoryChange={handleCategoryChange} />
        </S.TopSection>

        {/* 2. 오버레이가 덮어야 하는 하단 리스트 영역 */}
        <S.ListSection>
          <S.FilterWrapper>
            <Filter onChange={handleFilter} />
          </S.FilterWrapper>

          {isPostsLoading ? (
            Array(5)
              .fill(0)
              .map((_, i) => <CardListSkeleton key={i} variant='list' />)
          ) : posts?.length !== 0 ? (
            posts.map((item) => (
              <CardList
                key={item.id}
                badges={makeBadges(item)}
                title={item.doc_title}
                date={item.pub_date.slice(0, 10)}
                onClick={() => navigate(`/post/${item.id}`)}
                image={item.image_url}
                type={item.doc_type}
              />
            ))
          ) : (
            <Empty text='조건에 맞는 공문이 없어요' />
          )}
          <div ref={loadMoreRef} />
        </S.ListSection>
      </S.NewsContainer>
      <B.ButtonWrapper>
        <GoToTop />
      </B.ButtonWrapper>
    </>
  );
}
