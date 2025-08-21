// 스크랩 토글 상태를 동기화 하기 위해 이벤트를 커스텀
export const SCRAP_EVT = "chatbot:scrap-changed";

export function emitScrapChange(detail) {
  window.dispatchEvent(new CustomEvent(SCRAP_EVT, { detail }));
}

// 세션 삭제 시 로컬 키 정리
export function purgeSessionScrapKeys(sessionId) {
  const prefix = `chatbot:scrap:${sessionId}:`;
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const k = localStorage.key(i);
    if (k && k.startsWith(prefix)) localStorage.removeItem(k);
  }
}
