import styled from "styled-components";
import scrapTrue from "../../assets/Header/bookmark_true.svg";
import scrapFalse from "../../assets/Header/bookmark_false.svg";
import aiImage from "../../assets/ai-image.png";

// 챗봇 떠있는 동안 배경 블러
export const Overlay = styled.div`
  width: 100%;
  max-width: 393px;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 100dvh;
  background-color: rgba(115, 113, 113, 0.4);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 999; /* 헤더도 덮어야 해서 늘림 */

  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};
  transition: opacity 180ms ease;
`;

export const ChatbotContainer = styled.div`
  width: 100%;
  max-width: 393px;
  background-color: var(--color-base-white);
  display: flex;
  flex-direction: column;
  overflow: hidden;

  transform: translateY(${({ $isOpen }) => ($isOpen ? "0%" : "100%")});
  transition: transform 300ms ease-in-out;
`;

// 헤더 (타이틀 부분)
export const ChatbotHeader = styled.div`
  position: sticky;
  display: flex;
  padding: 16px 24px;
  justify-content: space-between;
  align-items: center;
`;

export const ChatbotTitle = styled.div`
  color: var(--color-base-black);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: var(--Heading-xl-font-size);
  font-weight: 700;
  line-height: var(--Heading-xl-line-height);
  letter-spacing: var(--letter-spacing);
`;

export const Blank = styled.div`
  width: 45px;
  height: 30px;
`;

export const CloseBtn = styled.button`
  display: flex;
  padding: 6px 12px;
  justify-content: center;
  align-items: center;
  border-radius: var(--border-radius-rounded);
  background: var(--color-neutral-brand-primary);
  box-shadow: var(--shadow-default);
  color: var(--color-base-white);
  font-size: var(--Body-sm-font-size);
  font-weight: 600;
  line-height: var(--Body-sm-line-height);
`;

// 챗봇 바디
export const ChatbotBody = styled.div`
  width: 100%;
  max-width: 393px;
  height: calc(80vh - 62px);
  display: flex;
  flex-direction: column;
  justify-content: ${({ $hasChats }) => ($hasChats ? "flex-end" : "center")};
  align-items: center;
  padding: 0 16px 16px;
  gap: 16px;
  min-height: 0;
  margin-bottom: 61px;
`;

// 채팅 기록이 있을 때
export const Chats = styled.div`
  width: 100%;
  max-width: 393px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

export const UserChatWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const UserChat = styled.div`
  display: flex;
  max-width: 252px;
  padding: 12px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  border-radius: var(--border-radius-xl);
  background: var(--color-neutral-100);
  color: var(--color-base-black);
  font-size: var(--Body-md-font-size);
  font-weight: 400;
  line-height: var(--Body-md-line-height);
  word-break: break-word;
  white-space: pre-wrap;
`;

export const AIChatWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

export const AIProfile = styled.div`
  width: 24px;
  height: 24px;
  aspect-ratio: 1/1;
  border-radius: var(--border-radius-rounded);
  background-image: url(${aiImage});
  background-size: cover;
`;

export const AIChat = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 4px;
`;

export const AIChatContent = styled.div`
  display: flex;
  max-width: 252px;
  padding: 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: var(--border-radius-xl);
  background: var(--color-neutral-brand-primary);
  color: var(--color-base-white);
  font-size: var(--Body-md-font-size);
  font-weight: 400;
  line-height: var(--Body-md-line-height);
  word-break: break-word;
  white-space: pre-wrap;
`;
export const Scrap = styled.button`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  background-image: url(${({ $isScrap }) =>
    $isScrap ? scrapTrue : scrapFalse});
  background-repeat: no-repeat;
`;

// 채팅 기록이 없을 때
export const NoChatBox = styled.div`
  width: 100%;
  max-width: 393px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

export const AICharacter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 123.5px;
    height: 127.805px;
  }
`;

export const NoChatText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const NoChatTitle = styled.div`
  color: #000;
  text-align: center;
  font-size: var(--Heading-lg-font-size);
  font-weight: 700;
  line-height: var(--Heading-lg-line-height);
  letter-spacing: var(--letter-spacing);
`;

export const NoChatContent = styled.div`
  color: var(--Color-text-primary);
  text-align: center;
  font-size: var(--Body-md-font-size);
  font-weight: 500;
  line-height: var(--Body-md-line-height);
  white-space: pre-line;
`;

// 테스트용 챗봇 삭제 버튼
export const deleteBtn = styled.button`
  display: flex;
  padding: 6px 12px;
  justify-content: center;
  align-items: center;
  border-radius: var(--border-radius-rounded);
  background-color: var(--color-base-white);
  color: var(--color-base-black);
  font-size: var(--Body-sm-font-size);
  font-weight: 600;
  line-height: var(--Body-sm-line-height);
  border: 0.5px solid var(--color-neutral-tertiary);
`;
