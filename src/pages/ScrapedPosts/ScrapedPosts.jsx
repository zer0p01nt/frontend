import { useEffect, useRef, useState } from "react";
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

const API_URL = process.env.REACT_APP_API_URL;

export default function ScrapedPosts() {
  const navigate = useNavigate();
  // 공문 스크랩 (쿼리스트링 수정 필요)
  const { data: postdata, isLoading: isPostsLoading } = useFetch(
    `${API_URL}/scrap/documents/?order=latest`,
    {}
  );
  const scrapedPosts = postdata?.data?.results ?? [];

  // 최신순, 오래된순 정렬 => 기본값은 최신순
  const [sortOrder, setSortOrder] = useState("최신순");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSortChange = (order) => {
    setSortOrder(order);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

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
        />
        <Filter />
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
                />
              ))}
            </>
          )}
        </S.PostsWrapper>
      </S.ScrapedContainer>
    </>
  );
}
