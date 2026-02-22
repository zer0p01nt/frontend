import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import useFetch from "../../hooks/useFetch";
import { makeScrapBadges } from "../../utils/makeBadges";
import {
  CATEGORY_TYPE_MAP,
  NAME_CATEGORY_MAP,
  NAME_REGION_MAP,
} from "../../constants/maps";

import * as S from "./ScrapedPostsStyle";
import * as D from "../Search/SearchStyle";

import GoToTop from "../../components/GoToTop/GoToTop";
import Header from "../../components/Header/Header";
import { ButtonWrapper } from "../../styles/ButtonCircle";
import Filter from "../../components/Filter/Filter";
import CategoryBar from "../../components/CategoryBar/CategoryBar";
import CardList from "../../components/CardList/CardList";
import Empty from "../../components/Empty/Empty";
import PageTitle from "../../components/PageTitle/PageTitle";
import CardListSkeleton from "../../components/CardList/CardListSkeleton";

import DropIcon from "../../assets/Back Icon.svg";

const API_URL = process.env.REACT_APP_API_URL;
const PAGE_SIZE = 10;

export default function ScrapedPosts() {
  const navigate = useNavigate();

  // 카테고리바, 필터 상태
  // 모든 스크랩이면 undefined
  const [docType, setDocType] = useState(undefined);
  // 관심 지역 전체 || 모든 주제면 빈 배열
  const [regionIds, setRegionIds] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  // 최신순, 오래된순 정렬 => 기본값은 최신순
  const [sortOrder, setSortOrder] = useState("최신순");
  const order = sortOrder === "최신순" ? "latest" : "oldest";

  // 드롭다운 상태
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 무한 스크롤 상태
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]); // 누적 목록
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef(null);

  // 카테고리바 변경
  const handleCategoryBar = useCallback((label) => {
    if (label === "모든 스크랩") {
      setDocType(undefined);
    } else {
      setDocType(CATEGORY_TYPE_MAP[label] ?? undefined);
    }
  }, []);

  // 필터 변경
  const handleFilter = useCallback((selected) => {
    const rids = [];
    const cids = [];
    for (const s of selected) {
      if (NAME_REGION_MAP[s]) rids.push(NAME_REGION_MAP[s]);
      if (NAME_CATEGORY_MAP[s]) cids.push(NAME_CATEGORY_MAP[s]);
    }

    // 중복 제거
    setRegionIds(Array.from(new Set(rids)));
    setCategoryIds(Array.from(new Set(cids)));
  }, []);

  // 드롭다운 관리
  const handleSortChange = (order) => {
    setSortOrder(order);
    setIsDropdownOpen(false);
  };

  // 드롭다운 외부 클릭 처리
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 필터 || 정렬 변경 시 페이지 및 리스트 초기화
  useEffect(() => {
    setPage(1);
    setHasMore(true);
  }, [order, docType, regionIds, categoryIds]);

  // 필터링 바탕으로 쿼리스트링 조립
  const listUrl = useMemo(() => {
    const params = new URLSearchParams();
    params.set("order", order); // 정렬
    if (docType) params.set("doc_type", docType); // 타입이 있을 때만
    if (regionIds.length) params.set("region_ids", regionIds.join(",")); // 지역이 있을 때만
    if (categoryIds.length) params.set("category_ids", categoryIds.join(",")); // 카테고리가 있을 때만
    // 페이지, 사이즈는 기본값 유지
    params.set("page", String(page));
    params.set("page_size", PAGE_SIZE);

    return `${API_URL}/scrap/documents/?${params.toString()}`;
  }, [order, docType, regionIds, categoryIds, page]);

  // 공문 스크랩 (URL 바뀔 때마다)
  const { data: postdata, isLoading: isPostsLoading } = useFetch(listUrl, {});

  // 응답 데이터 생기면 갱신
  useEffect(() => {
    if (!postdata) return;

    const results = postdata.data?.results ?? [];
    const total = postdata?.data?.count;
    // 다음 페이지 여부 확인
    setHasMore(page * PAGE_SIZE < total);

    if (page === 1) {
      setItems((prev) => {
        if (
          prev.length === results.length &&
          prev.every((p, i) => p.id === results[i]?.id)
        )
          return prev;
        return results;
      });
    } else {
      if (results.length === 0) {
        setHasMore(false);
        return;
      }

      setItems((prev) => {
        const map = new Map(prev.map((it) => [it.id, it]));
        for (const it of results) map.set(it.id, it);
        const merged = Array.from(map.values());

        if (
          merged.length === prev.length &&
          merged.every((p, i) => p.id === prev[i].id)
        )
          return prev;

        return merged;
      });
    }
  }, [postdata, page]);

  // 무한 스크롤
  useEffect(() => {
    const ref = loadMoreRef.current;
    if (!ref) return;

    const io = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMore && !isPostsLoading) {
          setPage((prev) => prev + 1);
        }
      },
      { root: null, rootMargin: "200px", threshold: 0 },
    );

    io.observe(ref);
    return () => io.disconnect();
  }, [hasMore, isPostsLoading]);

  return (
    <>
      <PageTitle title='스크랩한 공문' />
      {/* fixed 되는 컴포넌트들 */}
      <Header hasBack={true} title='스크랩한 공문' hasScrap={false} />
      <ButtonWrapper>
        <GoToTop />
      </ButtonWrapper>
      <S.ScrapedContainer>
        <CategoryBar
          categories={["모든 스크랩", "참여", "공지", "고시/공고", "보고"]}
          onCategoryChange={handleCategoryBar}
        />
        <Filter onChange={handleFilter} />
        <S.OrderContainer>
          {/* Search에서 가져온 Dropdown */}
          <D.ResultHeader>
            <D.ResultCount>{items.length}건</D.ResultCount>
            <D.SortWrapper ref={dropdownRef}>
              <D.SortButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                {sortOrder}
                <img src={DropIcon} />
              </D.SortButton>
              {isDropdownOpen && (
                <D.DropdownMenu>
                  <D.DropdownItem
                    onClick={() => handleSortChange("최신순")}
                    $isSelected={sortOrder === "최신순"}
                  >
                    최신순
                  </D.DropdownItem>
                  <D.DropdownItem
                    onClick={() => handleSortChange("오래된순")}
                    $isSelected={sortOrder === "오래된순"}
                  >
                    오래된순
                  </D.DropdownItem>
                </D.DropdownMenu>
              )}
            </D.SortWrapper>
          </D.ResultHeader>
        </S.OrderContainer>

        <S.PostsWrapper>
          {isPostsLoading ? (
            Array(5)
              .fill(0)
              .map((_, i) => <CardListSkeleton key={i} variant='list' />)
          ) : items.length > 0 ? (
            items.map((p) => (
              <CardList
                badges={makeScrapBadges(p)}
                title={p.doc_title}
                date={p.pub_date.slice(0, 10)}
                key={p.id}
                onClick={() => navigate(`/post/${p.document}`)}
                image={p.image_url}
                type={p.doc_type}
              />
            ))
          ) : (
            <Empty
              text='스크랩한 공문이 없어요'
              subText='관심 공문은 스크랩해서 모아보세요'
            />
          )}
          <div ref={loadMoreRef} style={{ height: 1 }} />
        </S.PostsWrapper>
      </S.ScrapedContainer>
    </>
  );
}
