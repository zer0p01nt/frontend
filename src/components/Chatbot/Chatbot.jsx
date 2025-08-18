import { useEffect, useMemo, useRef, useState } from "react";
import * as S from "./ChatbotStyle";
import ChatbotInputField from "../ChatbotInputField/ChatbotInputField";
import {
  createSession,
  getSession,
  sendMessage,
  deleteSession,
} from "../../services/chatbotService";
import {
  createChatbotScrap,
  deleteChatbotScrap,
} from "../../services/scrapService";
import {
  emitScrapChange,
  purgeSessionScrapKeys,
  SCRAP_EVT,
} from "../../utils/scrapChatbotEvent";
import { chatbotScrapKey } from "../../utils/scrapChatbotKey";

export default function Chatbot({ isOpen, handleClose, postId }) {
  // localStorage에 저장 => useMemo 활용해 스토리지키가 변하지 않도록 함
  const storageKey = useMemo(() => `chatbot:session:${postId}`, [postId]);

  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const hasChats = messages.length > 0;
  // 테스트용 세션 삭제 버튼을 위한 상태
  const [isDeleting, setIsDeleting] = useState(false);

  // 스크랩을 위한 상태 및 값
  const [scrapMap, setScrapMap] = useState({}); // { [aiId]: scrapId }
  const [aiUser, setAiUser] = useState({}); // { [aiId]: userId }
  const [isScraping, setIsScraping] = useState(false);
  const scrapKey = chatbotScrapKey;

  // 언마운트 된 뒤 setState 하지 않도록 막음
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

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

  useEffect(() => {
    if (!isOpen) return;

    // 초기화 : 공문 id로 저장한 스토리지키에서 세션아이디 불러옴 (있다면)
    const stored = localStorage.getItem(storageKey);
    if (!stored) {
      setSessionId(null);
      setMessages([]);
      return;
    }

    // 초기화 : 세션 아이디가 있다면 세션 상태 확인, 메세지 있으면 Messages 배열에 메세지 불러옴
    (async () => {
      setIsLoading(true);
      try {
        // 세션 불러옴
        const s = await getSession(stored);
        if (!s) {
          // 세션이 없다면 로컬스토리지에 있는 기록 포함 다 초기화
          localStorage.removeItem(storageKey);
          setSessionId(null);
          setMessages([]);
          return;
        }
        // 세션이 있다면 setState로 반영
        setSessionId(stored);
        setMessages(Array.isArray(s.data.messages) ? s.data.messages : []);
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted.current) setIsLoading(false);
      }
    })();
  }, [isOpen, storageKey]);

  // 스크랩을 위한 로직
  // 메세지 바뀔 때마다 매핑 갱신
  useEffect(() => {
    let lastUserId = null;
    const map = {};
    for (const m of messages) {
      if (m.speaker === "USER" && Number.isFinite(m.id)) {
        lastUserId = m.id;
      } else if (
        m.speaker === "AI" &&
        Number.isFinite(m.id) &&
        Number.isFinite(lastUserId)
      ) {
        map[m.id] = lastUserId;
      }
    }
    setAiUser(map);
  }, [messages]);

  // 다른 곳에서 스크랩 상태 변경되면 수신
  useEffect(() => {
    const onScrapChange = (e) => {
      const { type, sessionId: sid, aiId, scrapId } = e.detail || {};
      if (!sid || String(sid) !== String(sessionId) || !Number.isFinite(aiId))
        return;

      if (type === "create" && Number.isFinite(scrapId)) {
        setScrapMap((prev) => ({ ...prev, [aiId]: scrapId }));
        localStorage.setItem(scrapKey(sessionId, aiId), String(scrapId));
      } else if (type === "delete") {
        setScrapMap((prev) => {
          const n = { ...prev };
          delete n[aiId];
          return n;
        });
        localStorage.removeItem(scrapKey(sessionId, aiId));
      }
    };
    window.addEventListener(SCRAP_EVT, onScrapChange);
    return () => window.removeEventListener(SCRAP_EVT, onScrapChange);
  }, [sessionId]);

  // 세션, 메세지 변경 시 스크랩이 있다면 로컬에서 복원함
  useEffect(() => {
    if (!sessionId || messages.length === 0) {
      setScrapMap({});
      return;
    }
    const restored = {};
    for (const m of messages) {
      if (m.speaker === "AI" && Number.isFinite(m?.id)) {
        const saved = localStorage.getItem(scrapKey(sessionId, m.id));
        if (saved) restored[m.id] = Number(saved);
      }
    }
    setScrapMap(restored);
  }, [sessionId, messages]);

  // 최초 메세지, 즉 세션이 없다면, createSession -> 응답 렌더
  // 세션 있다면, sendMessage -> 응답 렌더
  const handleSend = async (text) => {
    const content = (text || "").trim();
    if (!content || isLoading) return;

    setIsLoading(true);
    try {
      if (!sessionId) {
        // 세션 생성, 첫 대화
        const created = await createSession({ postId, firstMessage: content });

        const sid = created.data.id;
        if (!sid) throw new Error("[FE] 세션 ID를 찾을 수 없습니다.");

        localStorage.setItem(storageKey, String(sid));
        setSessionId(String(sid));

        const msgs = Array.isArray(created.data.messages)
          ? created.data.messages
          : [];
        setMessages(msgs);
        return;
      }

      // 세션이 있는 경우 : 유저 메세지 먼저 렌더(낙관적 업데이트) -> sendMessage 응답 렌더
      const optimisticUser = {
        id: `local-${Date.now()}`,
        speaker: "USER",
        content,
        created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
      };
      setMessages((prev) => [...prev, optimisticUser]);

      const res = await sendMessage(sessionId, content);
      const user = res?.data?.user_message;
      const ai = res?.data?.ai_message;

      // 메세지 교체(<-낙관적) , 추가
      setMessages((prev) => {
        const base = prev.filter((m) => m !== optimisticUser);
        return [...base, ...(user ? [user] : []), ...(ai ? [ai] : [])];
      });

      if (Number.isFinite(user?.id) && Number.isFinite(ai?.id)) {
        setAiUser((m) => ({ ...m, [ai.id]: user.id }));
      }
    } catch (e) {
      console.error(e);
    } finally {
      if (mounted.current) setIsLoading(false);
    }
  };

  // 스크랩 토글 로직
  const toggleScrap = async (aiId) => {
    if (!sessionId || !Number.isFinite(aiId)) return;

    // 중복 클릭 방지
    setIsScraping(true);

    try {
      const hasScrap = scrapMap[aiId] != null;

      if (!hasScrap) {
        // 스크랩 생성 : 매핑에서 userId 추출
        const userId = aiUser[aiId];
        if (!Number.isFinite(userId)) {
          alert("이 AI 메세지에 대응하는 사용자 메세지를 찾을 수 없습니다.");
          return;
        }
        const created = await createChatbotScrap(userId, aiId);
        const newId = created?.data?.id;
        if (!Number.isFinite(newId))
          throw new Error("스크랩 ID가 응답에 없습니다.");

        setScrapMap((prev) => ({ ...prev, [aiId]: newId }));
        localStorage.setItem(scrapKey(sessionId, aiId), String(newId));
        emitScrapChange({
          type: "create",
          scrapId: newId,
          sessionId: String(sessionId),
          aiId,
        });
      } else {
        // 스크랩 취소 : scrapId로 삭제
        const sId = scrapMap[aiId];
        await deleteChatbotScrap(sId);
        setScrapMap((prev) => {
          const next = { ...prev };
          delete next[aiId];
          return next;
        });
        localStorage.removeItem(scrapKey(sessionId, aiId));
        emitScrapChange({ type: "delete", scrapId: sId, sessionId, aiId });
      }
    } catch (e) {
      console.error(e);
      alert("스크랩 처리 중 오류가 발생했습니다.");
    } finally {
      setIsScraping(false);
    }
  };

  // 테스트용 세션 삭제 버튼
  const handleDelete = async () => {
    if (!sessionId) {
      // 세션이 없다면 로컬만 비움
      localStorage.removeItem(storageKey);
      setMessages([]);
      return;
    }

    const ok = window.confirm(
      "현재 챗봇 대화를 삭제할까요? 이 작업은 되돌릴 수 없습니다."
    );
    if (!ok) return;

    try {
      setIsDeleting(true);
      await deleteSession(sessionId);
      localStorage.removeItem(storageKey);
      setSessionId(null);
      setMessages([]);
      // 세션 관련 스크랩 로컬키 정리
      purgeSessionScrapKeys(sessionId);
      setScrapMap({});
      setAiUser({});
    } catch (e) {
      console.error(e);
      alert("대화 삭제 중 오류가 발생했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <S.Overlay $isOpen={isOpen}>
      <S.ChatbotContainer $isOpen={isOpen}>
        <S.ChatbotHeader>
          {/* 빈 공간 (여기에 세션 삭제 버튼 추가 가능) */}
          {/* <S.Blank /> */}
          <S.deleteBtn
            type='button'
            onClick={handleDelete}
            disabled={isDeleting || isLoading}
          >
            삭제
          </S.deleteBtn>
          <S.ChatbotTitle>AI 챗봇</S.ChatbotTitle>
          <S.CloseBtn type='button' onClick={handleClose}>
            닫기
          </S.CloseBtn>
        </S.ChatbotHeader>

        <S.ChatbotBody $hasChats={hasChats}>
          {hasChats ? (
            <S.Chats>
              {/* 채팅 기록 있을 때 */}
              {messages.map((m) =>
                m.speaker === "USER" ? (
                  <S.UserChatWrapper key={`u-${m.id}`}>
                    <S.UserChat>{m.content}</S.UserChat>
                  </S.UserChatWrapper>
                ) : (
                  <S.AIChatWrapper key={`m-${m.id}`}>
                    <S.AIProfile />
                    <S.AIChat>
                      <S.AIChatContent>{m.content}</S.AIChatContent>
                      <S.Scrap
                        type='button'
                        $isScrap={scrapMap[m.id] != null}
                        onClick={() => toggleScrap(m.id)}
                        disabled={isScraping}
                      />
                    </S.AIChat>
                  </S.AIChatWrapper>
                )
              )}
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
          <ChatbotInputField $isLoading={isLoading} onSubmit={handleSend} />
        </S.ChatbotBody>
      </S.ChatbotContainer>
    </S.Overlay>
  );
}
