import { useState, useEffect, useRef } from "react";
import Header from "../../components/Header/Header";
import SearchInputField from "../../components/SearchInputField/SearchInputField";
import CardList from "../../components/CardList/CardList";
import GoToTop from "../../components/GoToTop/GoToTop";
import * as B from "../../styles/ButtonCircle";
import * as S from "./SearchStyle";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { makeBadges } from "../../utils/makeBadges";
import DropIcon from "../../assets/Back Icon.svg";
import PageTitle from "../../components/PageTitle/PageTitle";

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
    date: new Date().toLocaleString("ko-KR").slice(0, 12),
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
    ? `${API_URL}/documents/search/?q=${encodeURIComponent(
        searchQuery,
      )}&order=${order}`
    : null;

  const { data: searchData, isLoading } = useFetch(searchUrl, {});
  const searchResults = searchData?.data?.results ?? [];

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

  const handleDeleteHistory = (e, term) => {
    e.stopPropagation();
    let history = getSearchHistory();
    history = history.filter((item) => item.term !== term);
    localStorage.setItem("searchHistory", JSON.stringify(history));
    setRecentSearches(history);
  };

  return (
    <>
      <PageTitle title='검색' />
      <Header hasBack={true} title='검색' hasScrap={false} />
      <S.SearchContainer>
        <SearchInputField
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onSubmit={() => handleSearchSubmit(searchValue)}
          placeholder='궁금한 공문 내용을 검색해 보세요'
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
          </S.SearchResultsSection>
        ) : (
          <S.RecentSearchesSection>
            <S.RecentSearchesTitle>최근 검색어</S.RecentSearchesTitle>
            <S.SearchHistoryList>
              {recentSearches.map((item) => (
                <S.SearchHistoryItem
                  key={item.term}
                  onClick={() => handleHistoryClick(item.term)}
                >
                  <span>
                    <button onClick={(e) => handleDeleteHistory(e, item.term)}>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='11'
                        height='11'
                        viewBox='0 0 11 11'
                        fill='none'
                      >
                        <path
                          d='M5.23802 6.44659L1.47785 10.2065C1.31008 10.3744 1.1067 10.4565 0.867705 10.4526C0.628514 10.4489 0.425038 10.3632 0.257276 10.1955C0.0895133 10.0277 0.0056322 9.82239 0.0056322 9.57953C0.0056322 9.33667 0.0895133 9.13136 0.257276 8.9636L4.00615 5.21472L0.246271 1.48351C0.0783162 1.31575 -0.00373089 1.11044 0.000130147 0.867576C0.00379813 0.62491 0.0895133 0.419695 0.257276 0.251933C0.425038 0.083978 0.630348 0 0.873207 0C1.11607 0 1.32138 0.083978 1.48914 0.251933L5.23802 4.01181L8.96923 0.251933C9.13699 0.083978 9.34037 0 9.57937 0C9.81856 0 10.022 0.083978 10.1898 0.251933C10.3695 0.431472 10.4594 0.639678 10.4594 0.876553C10.4594 1.11343 10.3695 1.31575 10.1898 1.48351L6.44092 5.21472L10.2008 8.97489C10.3688 9.14265 10.4527 9.34603 10.4527 9.58503C10.4527 9.82422 10.3688 10.0277 10.2008 10.1955C10.0213 10.3752 9.81306 10.4651 9.57618 10.4651C9.33931 10.4651 9.13699 10.3752 8.96923 10.1955L5.23802 6.44659Z'
                          fill='#a3a1a1'
                        />
                      </svg>
                    </button>
                    <div>{item.term}</div>
                  </span>
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
