import Badge from "../Badge/Badge";
import * as S from "./ChatbotBoxStyle";
import * as F from "../Filter/FilterStyle";
import * as C from "../Chatbot/ChatbotStyle";
import { useState } from "react";

// category : 해당 채팅이 있었던 공문의 카테고리
// title : AI 응답 요약
// userChat : 사용자 메세지
// aiChat : ai 메세지
// expanded : 컴포넌트 펼침 상태
// onToggle : 펼치고 접음 컨트롤
export default function ChatbotBox({
  category,
  title,
  userChat,
  aiChat,
  expanded = false,
  onToggle,
}) {
  return (
    <S.ChatbotWrapper>
      <S.ContentContainer>
        <S.ContentBox>
          <S.BadgeBox>
            <Badge color='teal'>{category}</Badge>
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
      {expanded && (
        <>
          <S.DetailWrapper>
            <C.Chats>
              <C.UserChatWrapper>
                <C.UserChat
                  style={{ backgroundColor: "var(--color-base-white)" }}
                >
                  {userChat}
                </C.UserChat>
              </C.UserChatWrapper>
              <C.AIChatWrapper>
                <C.AIProfile />
                <C.AIChat>
                  <C.AIChatContent>{aiChat}</C.AIChatContent>
                </C.AIChat>
              </C.AIChatWrapper>
            </C.Chats>
          </S.DetailWrapper>
          {/* 펼쳤을 때만 보이는 삭제, 접기 버튼 */}
          <S.ButtonWrapper>
            <S.Button>스크랩 삭제</S.Button>
            <S.Divide></S.Divide>
            <S.Button onClick={onToggle}>접기</S.Button>
          </S.ButtonWrapper>
        </>
      )}
    </S.ChatbotWrapper>
  );
}
