import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import useFetch from "../../hooks/useFetch";

import * as S from "./ScrapedPostsStyle";
import * as D from "../Search/SearchStyle";

import GoToTop from "../../components/GoToTop/GoToTop";
import Header from "../../components/Header/Header";
import { ButtonWrapper } from "../../styles/ButtonCircle";
import Filter from "../../components/Filter/Filter";
import CategoryBar from "../../components/CategoryBar/CategoryBar";
import CardList from "../../components/CardList/CardList";

import DropIcon from "../../assets/Back Icon.svg";
import { makeScrapBadges } from "../../utils/makeBadges";
import { useNavigate } from "react-router-dom";
import { CATEGORY_TYPE_MAP, NAME_CATEGORY_MAP, NAME_REGION_MAP } from '../../constants/maps';

const API_URL = process.env.REACT_APP_API_URL;

export default function ScrapedPosts() {
  const navigate = useNavigate();

  // 카테고리바, 필터 상태
  // 모든 스크랩이면 undefined
  const [docType, setDocType] = useState(undefined)
  // 관심 지역 전체 || 모든 주제면 빈 배열
  const [regionIds, setRegionIds] = useState([])
  const [categoryIds, setCategoryIds] = useState([])
  // 최신순, 오래된순 정렬 => 기본값은 최신순
  const [sortOrder, setSortOrder] = useState("최신순");
  const order = sortOrder === "최신순" ? "latest" : "oldest"

  // 드롭다운 상태
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 카테고리바 변경
  const handleCategoryBar = useCallback((label) => {
    if (label === "모든 스크랩") {
      setDocType(undefined)
    } else {
      setDocType(CATEGORY_TYPE_MAP[label] ?? undefined)
    }
  }, [])

  // 필터 변경 
  const handleFilter = useCallback((selected) => {
    const rids = []
    const cids = []
    for (const s of selected) {
      if (NAME_REGION_MAP[s]) rids.push(NAME_REGION_MAP[s])
      if (NAME_CATEGORY_MAP[s]) cids.push(NAME_CATEGORY_MAP[s])
    }

    // 중복 제거
    setRegionIds(Array.from(new Set(rids)))
    setCategoryIds(Array.from(new Set(cids)))
  }, [])

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
  }, [dropdownRef]);

  // 필터링 바탕으로 쿼리스트링 조립
  const listUrl = useMemo(() => {
    const params = new URLSearchParams()
    params.set("order", order) // 정렬
    if (docType) params.set("doc_type", docType) // 타입이 있을 때만
    if (regionIds.length) params.set("region_ids", regionIds.join(",")) // 지역이 있을 때만
    if (categoryIds.length) params.set("category_ids", categoryIds.join(",")) // 카테고리가 있을 때만
    // 페이지, 사이즈는 기본값 유지
    params.set("page", "1")
    params.set("page_size", "10")

    return `${API_URL}/scrap/documents/?${params.toString()}`
  }, [order, docType, regionIds, categoryIds])

  // 공문 스크랩 (URL 바뀔 때마다)
  const { data: postdata, isLoading: isPostsLoading } = useFetch(
    listUrl,
    {}
  );
  const scrapedPosts = postdata?.data?.results ?? [];

  return (
    <>
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
            <D.ResultCount>{scrapedPosts?.length}건</D.ResultCount>
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
          {!isPostsLoading && scrapedPosts && (
            <>
              {scrapedPosts?.map((p) => (
                <CardList
                  badges={makeScrapBadges(p)}
                  title={p.doc_title}
                  date={p.pub_date.slice(0, 10)}
                  key={p.id}
                  onClick={() => navigate(`/post/${p.document}`)}
                  image={p.image_url}
                  type={p.doc_type}
                />
              ))}
            </>
          )}
        </S.PostsWrapper>
      </S.ScrapedContainer>
    </>
  );
}
