import { useLayoutEffect, useRef } from "react";

import * as S from "./ChatbotBoxStyle";
import * as F from "../Filter/FilterStyle";
import * as C from "../Chatbot/ChatbotStyle";

import Badge from "../Badge/Badge";

// category : 해당 채팅이 있었던 공문의 카테고리
// title : AI 응답 요약
// expanded : 컴포넌트 펼침 상태
// onToggle : 펼치고 접음 컨트롤
// onDelete : 스크랩 삭제 함수
// detail : 펼쳤을 때 보여질 상세 내용
// loading : 펼쳤을 때 상세 내용 로딩
// isDeleting : 삭제 버튼 누르고 로딩

/**
 * 스크랩한 챗봇 페이지에서 쓰이는 챗봇 박스 컴포넌트
 * @param {object} props
 * @param {Array<{id: number, category_name: string}>} props.categories - 챗봇이 속한 공문의 카테고리 리스트
 * @param {string} props.title - 챗봇 요약 제목
 * @param {boolean} props.expanded - 챗봇 박스 펼침 여부
 * @param {Function} props.onToggle - 챗봇 박스 펼침 토글 함수
 * @param {Function} props.onDelete - 챗봇 스크랩 삭제 함수
 * @param {object|null} props.detail - 챗봇 상세 내용 (펼쳤을 때 보여질 내용) (기본값 null)
 * @param {boolean} props.loading - 챗봇 상세 내용 로딩 여부 (기본값 false)
 * @param {boolean} props.isDeleting - 챗봇 삭제 중 여부 (삭제 버튼 비활성화에 사용) (기본값 false)
 */
export default function ChatbotBox({
  categories,
  title,
  expanded = false,
  onToggle,
  onDelete,
  detail = null,
  loading = false,
  isDeleting = false,
}) {
  // 드롭다운 부드럽게 내려가기
  const ref = useRef();

  useLayoutEffect(() => {
    if (!expanded) return;
    const id = requestAnimationFrame(() => {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });

    return () => cancelAnimationFrame(id);
  }, [expanded]);

  return (
    <S.ChatbotWrapper>
      <S.ContentContainer>
        <S.ContentBox>
          <S.BadgeBox>
            {categories.map((c) => (
              <Badge key={c.id} color='teal'>
                {c.category_name}
              </Badge>
            ))}
          </S.BadgeBox>
          <S.Title>{title}</S.Title>
        </S.ContentBox>
        <F.chevronBtn
          type='button'
          $expanded={expanded}
          onClick={onToggle}
        ></F.chevronBtn>
      </S.ContentContainer>
      {expanded && loading ? (
        <S.DetailWrapper style={{ padding: "20px 12px" }}>
          <S.SkeletonChat style={{ width: "70%", alignSelf: "flex-end" }} />{" "}
          <S.SkeletonChat style={{ width: "85%" }} />
        </S.DetailWrapper>
      ) : (
        detail && (
          <>
            <S.DetailWrapper>
              <C.Chats>
                <C.UserChatWrapper>
                  <C.UserChat
                    style={{ backgroundColor: "var(--color-base-white)" }}
                  >
                    {detail.user_message_content}
                  </C.UserChat>
                </C.UserChatWrapper>
                <C.AIChatWrapper>
                  <C.AIProfile />
                  <C.AIChat>
                    <C.AIChatContent>
                      {detail.ai_message_content}
                    </C.AIChatContent>
                  </C.AIChat>
                </C.AIChatWrapper>
              </C.Chats>
            </S.DetailWrapper>
            {/* 펼쳤을 때만 보이는 삭제, 접기 버튼 */}
            <S.ButtonWrapper>
              <S.Button onClick={onDelete} disabled={isDeleting}>
                스크랩 삭제
              </S.Button>
              <S.Divide></S.Divide>
              <S.Button onClick={onToggle}>접기</S.Button>
              <div ref={ref} style={{ height: "1px" }}></div>
            </S.ButtonWrapper>
          </>
        )
      )}
    </S.ChatbotWrapper>
  );
}
