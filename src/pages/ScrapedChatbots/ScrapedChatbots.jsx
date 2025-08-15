import { useRef, useState } from "react";

import * as S from "./ScrapedChatbotStyle";
import * as P from "../ScrapedPosts/ScrapedPostsStyle";
import * as F from "../../components/SmallFilter/SmallFilterStyle";
import * as D from "../Search/SearchStyle";

import GoToTop from "../../components/GoToTop/GoToTop";
import Header from "../../components/Header/Header";
import { ButtonWrapper } from "../../styles/ButtonCircle";
import { useChatbotSmallFilter } from "../../services/smallFilter";
import { CATEGORY_OPTIONS } from "../../services/filter";
import Button from "../../components/Button/Button";
import ChatbotBox from "../../components/ChatbotBox/ChatbotBox";

import DropIcon from "../../assets/Back Icon.svg";

export default function ScrapedChatbots() {
  // 필터 관련
  const labels = CATEGORY_OPTIONS; // 모든 카테고리 배열
  const { selected, toggle } = useChatbotSmallFilter(labels, labels[0]);

  // 최신순, 오래된순 정렬 => 기본값은 최신순
  const [sortOrder, setSortOrder] = useState("최신순");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 챗봇 스크랩 (더미데이터)
  const scrapedChatbots = [
    {
      id: 1,
      category: "시설",
      title: "AI 응답 요약",
      userChat: "사용자 텍스트가 들어가는 자리",
      aiChat: "AI 답변이 들어가는 자리",
    },
    {
      id: 2,
      category: "시설",
      title: "AI 응답 요약",
      userChat: "사용자 텍스트가 들어가는 자리",
      aiChat: "AI 답변이 들어가는 자리",
    },
    {
      id: 3,
      category: "시설",
      title: "AI 응답 요약",
      userChat: "사용자 텍스트가 들어가는 자리",
      aiChat: "AI 답변이 들어가는 자리",
    },
    {
      id: 4,
      category: "시설",
      title: "AI 응답 요약",
      userChat: "사용자 텍스트가 들어가는 자리",
      aiChat: "AI 답변이 들어가는 자리",
    },
    {
      id: 5,
      category: "시설",
      title: "AI 응답 요약",
      userChat: "사용자 텍스트가 들어가는 자리",
      aiChat: "AI 답변이 들어가는 자리",
    },
  ];

  // 한 번에 하나만 열리도록
  const [openId, setOpenId] = useState(null);
  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id)); // 이미 열려있으면 닫기, 아니면 새로 열기
  };

  return (
    <>
      {/* fixed 되는 컴포넌트들 */}
      <Header hasBack={true} title='챗봇 스크랩' hasScrap={false} />
      <ButtonWrapper>
        <GoToTop />
      </ButtonWrapper>
      <P.ScrapedContainer>
        {/* 챗봇 스크랩 전용 Small Filter */}
        <F.SmallFilterWrapper>
          {labels.map((label) => (
            <Button
              key={label}
              label={label}
              checked={selected.has(label)}
              onChange={() => toggle(label)}
            />
          ))}
        </F.SmallFilterWrapper>
        <P.OrderContainer>
          {/* Search에서 가져온 Dropdown */}
          <D.ResultHeader>
            <D.ResultCount>{scrapedChatbots?.length}건</D.ResultCount>
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
        </P.OrderContainer>
        <S.ContentContainer>
          {scrapedChatbots.map((c) => (
            <ChatbotBox
              id={c.id}
              category={c.category}
              title={c.title}
              userChat={c.userChat}
              aiChat={c.aiChat}
              expanded={openId === c.id}
              onToggle={() => handleToggle(c.id)}
            />
          ))}
        </S.ContentContainer>
      </P.ScrapedContainer>
    </>
  );
}
