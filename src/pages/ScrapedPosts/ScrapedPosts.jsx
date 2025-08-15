import { useEffect, useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";

import * as S from "./ScrapedPostsStyle";
import * as H from "../Home/HomeStyle";
import * as D from "../Search/SearchStyle";

import GoToTop from "../../components/GoToTop/GoToTop";
import Header from "../../components/Header/Header";
import { ButtonWrapper } from "../../styles/ButtonCircle";
import Filter from "../../components/Filter/Filter";
import CategoryBar from "../../components/CategoryBar/CategoryBar";
import CardList from "../../components/CardList/CardList";

import DropIcon from "../../assets/Back Icon.svg";

export default function ScrapedPosts() {
  // 스크랩된 공문 불러오기 => 추후 fetch 링크 수정
  const { data: scrapedPosts = [], isLoading: isPostsLoading } = useFetch(
    "/data/CardList.json",
    []
  );

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
      <Header hasBack={true} title='공문 스크랩' hasScrap={false} />
      <ButtonWrapper>
        <GoToTop />
      </ButtonWrapper>
      <S.ScrapedContainer>
        <CategoryBar />
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

        <H.CardListWrapper>
          {!isPostsLoading && scrapedPosts && (
            <>
              {scrapedPosts?.map((p) => (
                <CardList
                  badges={[
                    { text: p.region, color: "blue" },
                    { text: p.keyword, color: "teal" },
                  ]}
                  title={p.title}
                  date={p.date}
                  key={p.id}
                />
              ))}
            </>
          )}
        </H.CardListWrapper>
      </S.ScrapedContainer>
    </>
  );
}
