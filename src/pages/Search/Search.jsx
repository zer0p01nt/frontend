// src/pages/Search/Search.jsx

import React, { useState, useEffect, useRef, useCallback } from "react";
import Header from "../../components/Header/Header";
import SearchInputField from "../../components/SearchInputField/SearchInputField";
import CardList from "../../components/CardList/CardList";
import GoToTop from "../../components/GoToTop/GoToTop";
import * as B from "../../styles/ButtonCircle";
import * as S from "./SearchStyle";
import DropIcon from "../../assets/Back Icon.svg";
import useFetch from "../../hooks/useFetch"; 
import { useNavigate } from "react-router-dom"; 
import { makeBadges } from "../../utils/makeBadges"; 

// --- 최근 검색어 관리를 위한 함수 ---
const getSearchHistory = () => {
  const history = localStorage.getItem("searchHistory");
  return history ? JSON.parse(history) : [];
};

const addSearchHistory = (term) => {
  if (!term) return;
  let history = getSearchHistory();

  history = history.filter((item) => item.term !== term);
  const newEntry = {
    term,
    date: new Date().toLocaleDateString("ko-KR").slice(2, -1),
  };
  const newHistory = [newEntry, ...history].slice(0, 10); 
  localStorage.setItem("searchHistory", JSON.stringify(newHistory));
};


const API_URL = process.env.REACT_APP_API_URL;

export default function Search() {
  const navigate = useNavigate(); 
  const [searchValue, setSearchValue] = useState("");
  const [searchQuery, setSearchQuery] = useState(null);
  const [isSearched, setIsSearched] = useState(false);


  const [recentSearches, setRecentSearches] = useState(getSearchHistory());


  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("최신순");
  const dropdownRef = useRef(null);


  const order = sortOrder === "최신순" ? "latest" : "oldest";
  const searchUrl = searchQuery
    ? `${API_URL}/documents/?search=${encodeURIComponent(
        searchQuery
      )}&order=${order}`
    : null;

  const { data: searchData, isLoading } = useFetch(searchUrl, {});
  const searchResults = searchData?.results ?? [];


  const handleSearchSubmit = (query) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;
    setSearchQuery(trimmedQuery);
    addSearchHistory(trimmedQuery);
    setRecentSearches(getSearchHistory()); 
    setIsSearched(true);
  };

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

  
  const handleHistoryClick = (term) => {
    setSearchValue(term);
    handleSearchSubmit(term);
  };

  return (
    <>
      <Header hasBack={true} title="검색" hasScrap={false} />
      <S.SearchContainer>
        <SearchInputField
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onSubmit={() => handleSearchSubmit(searchValue)}
          placeholder="궁금한 공문 내용을 검색해 보세요"
        />

        {isSearched ? (
          <S.SearchResultsSection>
            <S.ResultHeader>
              <S.ResultCount>{searchResults.length}건</S.ResultCount>
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
                      onClick={() => handleSortChange("최신순")}
                      $isSelected={sortOrder === "최신순"}
                    >
                      최신순
                    </S.DropdownItem>
                    <S.DropdownItem
                      onClick={() => handleSortChange("오래된순")}
                      $isSelected={sortOrder === "오래된순"}
                    >
                      오래된순
                    </S.DropdownItem>
                  </S.DropdownMenu>
                )}
              </S.SortWrapper>
            </S.ResultHeader>
            {/* --- 실제 검색 결과 렌더링 --- */}
            {isLoading ? (
              <div>검색 중...</div>
            ) : (
              searchResults.map((doc) => (
                <CardList
                  key={doc.id}
                  badges={makeBadges(doc)}
                  title={doc.doc_title}
                  date={doc.pub_date.slice(0, 10)}
                  onClick={() => navigate(`/post/${doc.id}`)}
                  image={doc.image_url}
                  type={doc.doc_type}
                />
              ))
            )}
            {/* ------------------------- */}
          </S.SearchResultsSection>
        ) : (
          <S.RecentSearchesSection>
            <S.RecentSearchesTitle>최근 검색어</S.RecentSearchesTitle>
            <S.SearchHistoryList>
              {/* --- 실제 최근 검색어 렌더링 --- */}
              {recentSearches.map((item) => (
                <S.SearchHistoryItem
                  key={item.term}
                  onClick={() => handleHistoryClick(item.term)}
                >
                  <span>{item.term}</span>
                  <span>{item.date}</span>
                </S.SearchHistoryItem>
              ))}
              {/* --------------------------- */}
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