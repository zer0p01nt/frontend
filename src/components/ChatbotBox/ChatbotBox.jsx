import Badge from "../Badge/Badge";
import * as S from "./ChatbotBoxStyle";
import * as F from "../Filter/FilterStyle";
import * as C from "../Chatbot/ChatbotStyle";
import { useLayoutEffect, useRef, useState } from "react";

// category : 해당 채팅이 있었던 공문의 카테고리
// title : AI 응답 요약
// expanded : 컴포넌트 펼침 상태
// onToggle : 펼치고 접음 컨트롤
// onDelete : 스크랩 삭제 함수
// detail : 펼쳤을 때 보여질 상세 내용
// loading : 펼쳤을 때 상세 내용 로딩
// isDeleting : 삭제 버튼 누르고 로딩
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
      {/* 챗봇 상세 내용 (펼쳤을 때) : Chatbot에서 가져옴 */}
      {expanded && !loading && detail && (
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
                  <C.AIChatContent>{detail.ai_message_content}</C.AIChatContent>
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
      )}
    </S.ChatbotWrapper>
  );
}
