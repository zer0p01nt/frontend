import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import useFetch from "../../hooks/useFetch";

import * as S from "./ScrapedChatbotStyle";
import * as P from "../ScrapedPosts/ScrapedPostsStyle";
import * as F from "../../components/SmallFilter/SmallFilterStyle";
import * as D from "../Search/SearchStyle";

import GoToTop from "../../components/GoToTop/GoToTop";
import Header from "../../components/Header/Header";
import { ButtonWrapper } from "../../styles/ButtonCircle";
import { useChatbotSmallFilter } from "../../utils/smallFilter";
import { CATEGORY_OPTIONS, NAME_CATEGORY_MAP } from "../../constants/maps";
import Button from "../../components/Button/Button";
import ChatbotBox from "../../components/ChatbotBox/ChatbotBox";

import DropIcon from "../../assets/Back Icon.svg";
import { deleteChatbotScrap } from "../../services/scrapService";
import Empty from "../../components/Empty/Empty";

const API_URL = process.env.REACT_APP_API_URL;
const PAGE_SIZE = 10;
const ALL_CATEGORY_LABEL = "모든 주제";

export default function ScrapedChatbots() {
  // 필터 관련
  const labels = CATEGORY_OPTIONS; // 모든 카테고리 배열
  const { selected, toggle } = useChatbotSmallFilter(labels, labels[0]);
  const selectedLabels = useMemo(() => Array.from(selected), [selected]);

  // 정렬 - 드롭다운
  const [sortOrder, setSortOrder] = useState("최신순");
  const order = sortOrder === "최신순" ? "latest" : "oldest";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const handleSortChange = (label) => {
    setSortOrder(label);
    setIsDropdownOpen(false);
  };

  // 드롭다운 외부 클릭 닫기
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 무한 스크롤 상태
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef(null);

  // 필터, 정렬 변경 시 초기화
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setOpenId(null); // 다 닫혀있도록
  }, [sortOrder, selected]);

  // 챗봇 스크랩 목록 - URL 쿼리스트링 조립
  const listUrl = useMemo(() => {
    const params = new URLSearchParams();
    params.set("order", order);
    // 모든 주제가 아닐 경우에만 카테고리 아이디 추가
    const isAll = selected.has(ALL_CATEGORY_LABEL);
    if (!isAll) {
      const cids = selectedLabels
        .map((label) => NAME_CATEGORY_MAP[label])
        .filter(Boolean);
      if (cids.length) params.set("category_id", cids.join(","));
    }
    params.set("page", String(page));
    params.set("page_size", String(PAGE_SIZE));
    return `${API_URL}/scrap/chatbot/?${params.toString()}`;
  }, [sortOrder, selected, selectedLabels, page]);

  const { data: chatbotdata, isLoading: isChatbotsLoading } = useFetch(
    listUrl,
    {}
  );

  // 응답 데이터 생기면 갱신
  useEffect(() => {
    if (!chatbotdata) return;

    const results = chatbotdata.data?.results ?? [];
    const total = chatbotdata.data?.count ?? 0;
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
  }, [chatbotdata, page]);

  // 무한 스크롤
  useEffect(() => {
    const ref = loadMoreRef.current;
    if (!ref) return;

    const io = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMore && !isChatbotsLoading) {
          setPage((prev) => prev + 1);
        }
      },
      { root: null, rootMargin: "200px", threshold: 0 }
    );

    io.observe(ref);
    return () => io.disconnect();
  }, [hasMore, isChatbotsLoading]);

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

  // 펼쳤을 때 데이터 일치시킴
  useEffect(() => {
    const id = OpenedChatbot?.id;
    if (!id) return;
    if (openId && OpenedChatbot) {
      setDetailById((prev) => ({ ...prev, [openId]: OpenedChatbot }));
    }
  }, [OpenedChatbot]);

  // 상세 데이터 === detail && 상세 로딩 === isDetailLoading
  const detail = openId ? detailById[openId] : null;
  const isDetailLoading = openId && !detail ? isDetailDataLoading : false;

  // 챗봇 스크랩 삭제 로직
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = useCallback(
    async (id) => {
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
        }
      } catch (e) {
        console.error(e);
        alert("삭제 중 오류가 발생했습니다.");
      } finally {
        setIsDeleting(false);
      }
    },
    [isDeleting, detailById]
  );

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
          {items.length > 0 ? (
            items.map((c) => (
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
            ))
          ) : (
            <Empty
              text='스크랩한 대화가 없어요'
              subText='유용한 대화는 스크랩해 두고 다시 볼 수 있어요'
            />
          )}
          <div ref={loadMoreRef} style={{ height: 1 }} />
        </S.ContentContainer>
      </P.ScrapedContainer>
    </>
  );
}
