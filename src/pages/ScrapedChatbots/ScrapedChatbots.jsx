import { useRef, useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";

import * as S from "./ScrapedChatbotStyle";
import * as P from "../ScrapedPosts/ScrapedPostsStyle";
import * as F from "../../components/SmallFilter/SmallFilterStyle";
import * as D from "../Search/SearchStyle";

import GoToTop from "../../components/GoToTop/GoToTop";
import Header from "../../components/Header/Header";
import { ButtonWrapper } from "../../styles/ButtonCircle";
import { useChatbotSmallFilter } from "../../utils/smallFilter";
import { CATEGORY_OPTIONS } from "../../constants/maps";
import Button from "../../components/Button/Button";
import ChatbotBox from "../../components/ChatbotBox/ChatbotBox";

import DropIcon from "../../assets/Back Icon.svg";
import { deleteChatbotScrap } from "../../services/scrapService";
import { emitScrapChange } from "../../utils/scrapChatbotEvent";
import { chatbotScrapKey } from "../../utils/scrapChatbotKey";

const API_URL = process.env.REACT_APP_API_URL;

export default function ScrapedChatbots() {
  // 필터 관련
  const labels = CATEGORY_OPTIONS; // 모든 카테고리 배열
  const { selected, toggle } = useChatbotSmallFilter(labels, labels[0]);

  // 최신순, 오래된순 정렬 => 기본값은 최신순
  const [sortOrder, setSortOrder] = useState("최신순");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 챗봇 스크랩 목록
  const { data: chatbotdata, isLoading: isChatbotsLoading } = useFetch(
    `${API_URL}/scrap/chatbot/?order=latest`
  );
  const scrapedChatbots = chatbotdata?.data?.results ?? [];

  // 목록을 상태로 관리 -> 삭제하면 즉시 반영 (목록 데이터 === items)
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(scrapedChatbots);
  }, [scrapedChatbots]);

  // ChatbotBox 한 번에 하나만 열리도록
  const [openId, setOpenId] = useState(null);
  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id)); // 이미 열려있으면 닫기, 아니면 새로 열기
  };

  // 챗봇 펼친 상태 캐싱
  const [detailById, setDetailById] = useState({});
  const openUrl =
    openId && !detailById[openId]
      ? `${API_URL}/scrap/chatbot/${openId}/`
      : null;

  // 챗봇 스크랩 상세 조회
  const { data: detailData, isLoading: isDetailDataLoading } = useFetch(
    openUrl,
    null
  );
  const OpenedChatbot = detailData?.data;
  useEffect(() => {
    if (openId && OpenedChatbot) {
      setDetailById((prev) => ({ ...prev, [openId]: OpenedChatbot }));
    }
  }, [openId, OpenedChatbot]);

  // 상세 데이터 === detail && 상세 로딩 === isDetailLoading
  const detail = openId ? detailById[openId] : null;
  const isDetailLoading = openId && !detail ? isDetailDataLoading : false;

  // 챗봇 스크랩 삭제 로직
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async (id) => {
    if (!id || isDeleting) return;

    const ok = window.confirm("해당 챗봇 스크랩을 삭제하시겠습니까?");
    if (!ok) return;

    try {
      setIsDeleting(true);
      await deleteChatbotScrap(id);

      // items에서도 삭제
      setItems((prev) => prev.filter((it) => it.id !== id));

      // 캐시에서 삭제
      setDetailById((prev) => {
        const { [id]: _removed, ...rest } = prev;
        return rest;
      });

      // 펼쳐져 있었으면 접기
      setOpenId((prev) => (prev === id ? null : prev));

      // detail에서 aiId, sessionId 추출 후 이벤트 보냄
      const d = detailById[id];
      const aiId = d?.ai_message; // 숫자
      const sessionId = String(d?.chatbot_session ?? ""); // 문자열로 강제
      if (Number.isFinite(aiId) && sessionId) {
        localStorage.removeItem(chatbotScrapKey(sessionId, aiId));
        emitScrapChange({ type: "delete", scrapId: id, sessionId, aiId });
      }
    } catch (e) {
      console.error(e);
      alert("삭제 중 오류가 발생했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {/* fixed 되는 컴포넌트들 */}
      <Header hasBack={true} title='스크랩한 챗봇' hasScrap={false} />
      <ButtonWrapper>
        <GoToTop />
      </ButtonWrapper>
      <P.ScrapedContainer style={{ paddingTop: "42px" }}>
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
        </P.OrderContainer>
        <S.ContentContainer>
          {!isChatbotsLoading && items && (
            <>
              {items.map((c) => (
                <ChatbotBox
                  key={c.id}
                  id={c.id}
                  categories={c.categories ?? []}
                  title={c.summary}
                  expanded={openId === c.id}
                  onToggle={() => handleToggle(c.id)}
                  onDelete={() => handleDelete(c.id)}
                  detail={openId === c.id ? detail : null}
                  loading={openId === c.id ? isDetailLoading : false}
                  isDeleting={isDeleting}
                />
              ))}
            </>
          )}
        </S.ContentContainer>
      </P.ScrapedContainer>
    </>
  );
}
