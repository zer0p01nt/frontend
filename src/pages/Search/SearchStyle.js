// src/pages/Search/SearchStyle.jsx

import styled from "styled-components";

export const SearchContainer = styled.div`
  padding: 60px 24px 80px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

// --- 최근 검색어 ---
export const RecentSearchesSection = styled.section`
  width: 100%;
`;
export const RecentSearchesTitle = styled.h2`
  font-size: var(--Body-sm-font-size);
  font-weight: 500;
  color: var(--color-neutral-600);
  margin-bottom: 12px;
`;
export const SearchHistoryList = styled.ul`
  display: flex;
  flex-direction: column;
`;
export const SearchHistoryItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  font-size: var(--Body-md-font-size);
  cursor: pointer;

  &:hover {
    background-color: var(--color-neutral-100); 
  }

  span:first-child {
    color: var(--color-base-black);
    font-weight: 500;
  }

  span:last-child {
    color: var(--color-text-secondary);
  }
`;

// --- 검색 결과 ---
export const SearchResultsSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ResultHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
`;

export const ResultCount = styled.span`
  font-size: var(--Body-sm-font-size);
  color: var(--color-neutral-600);
`;

// --- 드롭다운 ---
export const SortWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const SortButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--color-neutral-600);
  font-size: var(--Body-sm-font-size);
  font-weight: 500;
  white-space: nowrap;
`;

export const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  min-width: 100px;
  background: white;

  border: 1px solid var(--color-neutral-300);
  border-radius: var(--border-radius-md);

  list-style: none;
  padding: 8px;
  z-index: 10;
`;

export const DropdownItem = styled.li`
  padding: 8px 12px;
  font-size: var(--Body-sm-font-size);
  border-radius: var(--border-radius-md);
  font-weight: ${({ $isSelected }) => ($isSelected ? "600" : "500")};
  color: ${({ $isSelected }) =>
    $isSelected ? "var(--color-base-black)" : "var(--color-text-secondary)"};

  &:hover {
    background-color: var(--color-neutral-100);
  }
`;