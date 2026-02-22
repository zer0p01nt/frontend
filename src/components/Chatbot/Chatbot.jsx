import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  createSession,
  getSession,
  sendMessage,
  deleteSession,
} from "../../services/chatbotService";
import {
  createChatbotScrap,
  deleteChatbotScrap,
  listChatbotScrap,
} from "../../services/scrapService";

import * as S from "./ChatbotStyle";

import ChatbotInputField from "../ChatbotInputField/ChatbotInputField";

import noChatbot from "../../assets/nochatbot.png";

/**
 * 공문 상세 페이지의 AI 챗봇 컴포넌트
 * @param {object} props
 * @param {boolean} props.isOpen - 챗봇 열림 여부
 * @param {Function} props.handleClose - 챗봇 닫는 함수
 * @param {number} props.postId - 현재 공문 ID (세션 관리 및 API 요청에 사용)
 */
export default function Chatbot({ isOpen, handleClose, postId }) {
  // URL 쿼리 파라미터 접근
  const [searchParams, setSearchParams] = useSearchParams();
  const setSessionParam = (sid) => {
    const next = new URLSearchParams(searchParams);
    next.set("session", String(sid));
    setSearchParams(next, { replace: true });
  };
  const clearSessionParam = () => {
    const next = new URLSearchParams(searchParams);
    next.delete("session");
    setSearchParams(next, { replace: true });
  };

  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const hasChats = messages.length > 0;
  // 테스트용 세션 삭제 버튼을 위한 상태
  const [isDeleting, setIsDeleting] = useState(false);

  // 스크랩을 위한 상태 및 값
  const [scrapMap, setScrapMap] = useState({}); // { [aiId]: scrapId }
  const [aiUser, setAiUser] = useState({}); // { [aiId]: userId }
  const [userAi, setUserAi] = useState({}); //  { [userId]: aiId }
  const [isScraping, setIsScraping] = useState(false);

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

  // 챗봇 열면 URL 쿼리 파라미터로 복원
  useEffect(() => {
    if (!isOpen) return;

    (async () => {
      setIsLoading(true);
      try {
        const sidParam = searchParams.get("session");
        const sidNum = Number(sidParam);
        if (sidParam && Number.isFinite(sidNum)) {
          try {
            const s = await getSession(sidNum);
            const payload = s?.data?.data ?? s?.data ?? {};
            // 다른 문서 세션이 실수로 들어온 경우 방지(서버가 post_id 내려줄 때만 체크)
            if (
              payload.post_id != null &&
              Number(payload.post_id) !== Number(postId)
            ) {
              clearSessionParam();
            } else {
              setSessionId(String(sidNum));
              const msgs = payload.messages ?? s?.data?.messages ?? [];
              setMessages(Array.isArray(msgs) ? msgs : []);
              return; // 복원 성공
            }
          } catch (e) {
            console.error("URL SessionId 복원 실패", e);
            clearSessionParam();
          }
        }
        // URL에 session이 없으면 빈 상태로 시작 (첫 전송 시 생성)
        setSessionId(null);
        setMessages([]);
        setScrapMap({});
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted.current) setIsLoading(false);
      }
    })();
  }, [isOpen, searchParams]);

  // 스크랩을 위한 로직 (유저 - AI 페어 매핑)
  // 메세지 바뀔 때마다 매핑 갱신
  useEffect(() => {
    let lastUserId = null;
    const _aiUser = {};
    const _userAi = {};
    for (const m of messages) {
      if (m.speaker === "USER" && Number.isFinite(m.id)) {
        lastUserId = m.id;
      } else if (
        m.speaker === "AI" &&
        Number.isFinite(m.id) &&
        Number.isFinite(lastUserId)
      ) {
        _aiUser[m.id] = lastUserId;
        // 사용자 메시지에 이어지는 첫 AI와 매핑
        if (_userAi[lastUserId] == null) _userAi[lastUserId] = m.id;
      }
    }
    setAiUser(_aiUser);
    setUserAi(_userAi);
  }, [messages]);

  // 서버 스크랩 목록으로 scrapMap 복원
  useEffect(() => {
    if (!isOpen || !sessionId) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await listChatbotScrap(50);
        if (cancelled) return;
        const items = res?.data?.data?.results ?? res?.data?.results ?? [];
        const myItems = items.filter(
          (x) => x.session_info?.id === Number(sessionId),
        );

        // 스크랩 목록에서 유저 메세지 프리뷰로 스크랩 매핑
        // 정규화 함수 (유니코드/공백 통일) - 프리뷰 일치시키기 위함
        const norm = (s) =>
          (s ?? "").normalize("NFKC").replace(/\s+/g, " ").trim();

        // 사용자 메시지 텍스트 → userId 매핑
        const userTextToId = {};
        for (const m of messages) {
          if (
            m.speaker === "USER" &&
            typeof m.content === "string" &&
            Number.isFinite(m.id)
          ) {
            const key = norm(m.content);
            if (!userTextToId[key]) userTextToId[key] = m.id;
          }
        }

        // user_message_preview로 매칭
        const next = {};
        for (const it of myItems) {
          const up = norm(it.user_message_preview || "");
          const userId = userTextToId[up];
          if (Number.isFinite(userId)) {
            const aiId = userAi[userId]; // 해당 USER에 이어진 AI
            if (Number.isFinite(aiId)) next[aiId] = it.id; // scrapId
          }
        }

        setScrapMap(next);
      } catch (e) {
        console.error("스크랩 복원 실패:", e);
        setScrapMap({});
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isOpen, sessionId, messages, userAi]);

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
        const payload = created?.data?.data ?? created?.data ?? {};
        const sid = payload.id;
        if (!sid) throw new Error("[FE] 세션 ID를 찾을 수 없습니다.");

        setSessionId(String(sid));
        setSessionParam(sid);

        const msgs = Array.isArray(payload.messages)
          ? payload.messages
          : Array.isArray(created?.data?.messages)
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
      const user = res?.data?.data?.user_message ?? res?.data?.user_message;
      const ai = res?.data?.data?.ai_message ?? res?.data?.ai_message;

      // 메세지 교체(<-낙관적) , 추가
      setMessages((prev) => {
        const base = prev.filter((m) => m !== optimisticUser);
        return [...base, ...(user ? [user] : []), ...(ai ? [ai] : [])];
      });

      if (Number.isFinite(user?.id) && Number.isFinite(ai?.id)) {
        setAiUser((m) => ({ ...m, [ai.id]: user.id }));
        setUserAi((m) => (m[user.id] ? m : { ...m, [user.id]: ai.id }));
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
        const newId = created?.data?.data?.id ?? created?.data?.id;

        if (!Number.isFinite(newId)) {
          throw new Error("스크랩 ID가 응답에 없습니다.");
        }

        setScrapMap((prev) => ({ ...prev, [aiId]: newId }));
      } else {
        // 스크랩 취소 : scrapId로 삭제
        const sId = scrapMap[aiId];
        await deleteChatbotScrap(sId);
        setScrapMap((prev) => {
          const next = { ...prev };
          delete next[aiId];
          return next;
        });
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
      setMessages([]);
      return;
    }

    const ok = window.confirm(
      "현재 챗봇 대화를 삭제할까요? 이 작업은 되돌릴 수 없습니다.",
    );
    if (!ok) return;

    try {
      setIsDeleting(true);
      await deleteSession(sessionId);
      setSessionId(null);
      setMessages([]);
      setScrapMap({});
      setAiUser({});
      setUserAi({});
      clearSessionParam(); // URL에서 session 제거
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
                ),
              )}
            </S.Chats>
          ) : (
            <S.NoChatBox>
              {/* 채팅 기록 없을 때 */}
              <S.AICharacter>
                <img src={noChatbot} />
              </S.AICharacter>
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
