import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Header/Header";
import SearchInputField from "../../components/SearchInputField/SearchInputField";
import CardList from "../../components/CardList/CardList";
import GoToTop from "../../components/GoToTop/GoToTop";
import * as B from "../../styles/ButtonCircle";
import * as S from "./SearchStyle";
import DropIcon from "../../assets/Back Icon.svg";

export default function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("관련도순");
  const dropdownRef = useRef(null);

  const recentSearches = [
    { id: 1, term: "검색어 히스토리 내용", date: "7.30" },
    { id: 2, term: "검색어 히스토리 내용", date: "7.30" },
  ];

  const dummyResults = [
    {
      id: 1,
      region: "도봉구",
      keyword: "시설",
      title: "공문 제목 공문 제목 공문 제목",
      date: "2025.07.30",
    },
    {
      id: 2,
      region: "강북구",
      keyword: "문화",
      title: "새로운 문화 행사 안내",
      date: "2025.07.29",
    },
    {
      id: 4,
      region: "도봉구",
      keyword: "교통",
      title: "버스 노선 변경 공지",
      date: "2025.07.28",
    },
    {
      id: 5,
      region: "도봉구",
      keyword: "교통",
      title: "버스 노선 변경 공지",
      date: "2025.07.28",
    },
    {
      id: 6,
      region: "도봉구",
      keyword: "교통",
      title: "버스 노선 변경 공지",
      date: "2025.07.28",
    },
    {
      id: 7,
      region: "도봉구",
      keyword: "교통",
      title: "버스 노선 변경 공지",
      date: "2025.07.28",
    },
    {
      id: 8,
      region: "도봉구",
      keyword: "교통",
      title: "버스 노선 변경 공지",
      date: "2025.07.28",
    },
    {
      id: 9,
      region: "도봉구",
      keyword: "교통",
      title: "버스 노선 변경 공지",
      date: "2025.07.28",
    },
  ];

  const handleSearchSubmit = (query) => {
    if (!query) return;
    setSearchResults(dummyResults);
    setIsSearched(true);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    setIsDropdownOpen(false);
    console.log(`${order}으로 정렬합니다.`);
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
      <Header hasBack={true} title='검색' hasScrap={false} />
      <S.SearchContainer>
        <SearchInputField
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onSubmit={handleSearchSubmit}
        />

        {isSearched ? (
          <S.SearchResultsSection>
            <S.ResultHeader>
              <S.ResultCount>{dummyResults.length}건</S.ResultCount>
              <S.SortWrapper ref={dropdownRef}>
                <S.SortButton
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {sortOrder}
                  <img src={DropIcon} />
                </S.SortButton>
                {isDropdownOpen && (
                  <S.DropdownMenu>
                    <S.DropdownItem
                      onClick={() => handleSortChange("관련도순")}
                      $isSelected={sortOrder === "관련도순"}
                    >
                      관련도순
                    </S.DropdownItem>
                    <S.DropdownItem
                      onClick={() => handleSortChange("최신순")}
                      $isSelected={sortOrder === "최신순"}
                    >
                      최신순
                    </S.DropdownItem>
                  </S.DropdownMenu>
                )}
              </S.SortWrapper>
            </S.ResultHeader>
            {searchResults.map((doc) => (
              <CardList
                key={doc.id}
                badges={[
                  { text: doc.region, color: "blue" },
                  { text: doc.keyword, color: "teal" },
                ]}
                title={doc.title}
                date={doc.date}
              />
            ))}
          </S.SearchResultsSection>
        ) : (
          <S.RecentSearchesSection>
            <S.RecentSearchesTitle>최근 검색어</S.RecentSearchesTitle>
            <S.SearchHistoryList>
              {recentSearches.map((item) => (
                <S.SearchHistoryItem key={item.id}>
                  <span>{item.term}</span>
                  <span>{item.date}</span>
                </S.SearchHistoryItem>
              ))}
            </S.SearchHistoryList>
          </S.RecentSearchesSection>
        )}
      </S.SearchContainer>
      <B.ButtonWrapper>
        <GoToTop />
      </B.ButtonWrapper>
    </>
  );
}
