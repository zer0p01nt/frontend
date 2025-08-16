import { useEffect, useMemo, useState } from "react";
import * as S from "./ChatbotStyle";
import ChatbotInputField from "../ChatbotInputField/ChatbotInputField";
import { createSession, getSession, sendMessage } from "../../services/chatbot";

export default function Chatbot({ isOpen, handleClose, postId }) {
  // localStorage에 저장 => useMemo 활용해 스토리지키가 변하지 않도록 함
  const storageKey = useMemo(() => `chatbot:session:${postId}`, [postId]);

  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const hasChats = messages.length > 0;

  // 챗봇 열려있는 동안 배경 스크롤 막음
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev; // 닫힐 때 원상복구
      };
    }
  }, [isOpen]);

  // 테스트 코드
  // useEffect(() => {
  //   if (isOpen) {
  //     const test = createSession({ postId: 1, firstMessage: "안녕하세요" });
  //     console.log(test);
  //   }
  // }, [isOpen]);

  return (
    <S.Overlay $isOpen={isOpen}>
      <S.ChatbotContainer $isOpen={isOpen}>
        <S.ChatbotHeader>
          {/* 빈 공간 */}
          <S.Blank></S.Blank>
          <S.ChatbotTitle>AI 챗봇</S.ChatbotTitle>
          <S.CloseBtn type='button' onClick={handleClose}>
            닫기
          </S.CloseBtn>
        </S.ChatbotHeader>

        <S.ChatbotBody $hasChats={hasChats}>
          {hasChats ? (
            <S.Chats>
              {/* 채팅 기록 있을 때 */}
              <S.UserChatWrapper>
                <S.UserChat>
                  사용자응답이들어가는텍스트사용자응답이들어가는텍스트사용자응답이들어가는텍스트사용자응답이들어가는텍스트사용자응답이들어가는텍스트
                </S.UserChat>
              </S.UserChatWrapper>
              <S.AIChatWrapper>
                <S.AIProfile />
                <S.AIChat>
                  <S.AIChatContent>
                    그러면 띄어쓰기가 있는 글을 이렇게 길게 쓰면 어떻게 될까요?
                    어떻게 될까?
                  </S.AIChatContent>
                  <S.Scrap $isScrap={true} />
                </S.AIChat>
              </S.AIChatWrapper>
            </S.Chats>
          ) : (
            <S.NoChatBox>
              {/* 채팅 기록 없을 때 */}
              <S.AICharacter />
              <S.NoChatText>
                <S.NoChatTitle>안녕하세요!</S.NoChatTitle>
                <S.NoChatContent>
                  궁금한 내용이 있다면{"\n"}언제든지 물어보세요
                </S.NoChatContent>
              </S.NoChatText>
            </S.NoChatBox>
          )}
          <ChatbotInputField $isLoading={isLoading} />
        </S.ChatbotBody>
      </S.ChatbotContainer>
    </S.Overlay>
  );
}
