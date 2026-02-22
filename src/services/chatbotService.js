const API_URL = process.env.REACT_APP_API_URL;

// 챗봇 세션 생성
export async function createSession({ postId, firstMessage }) {
  const res = await fetch(`${API_URL}/chatbot/sessions/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      document_id: postId,
      initial_message: firstMessage,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    if (text.includes("해당 공문에 대한 세션이 이미 존재")) {
      alert("한 게시글엔 하나의 챗봇만 생성할 수 있습니다.");
    }
    throw new Error(`HTTP ${res.status} - ${text}`);
  }

  return res.json();
}

// 세션 가져오기
export async function getSession(sessionId) {
  const res = await fetch(`${API_URL}/chatbot/sessions/${sessionId}/`, {
    method: "GET",
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch session");
  return res.json();
}

// 메시지 전송
export async function sendMessage(sessionId, message) {
  const res = await fetch(
    `${API_URL}/chatbot/sessions/${sessionId}/messages/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    },
  );
  if (!res.ok) throw new Error("Failed to send message");
  return res.json();
}

// 세션 삭제
export async function deleteSession(sessionId) {
  const res = await fetch(`${API_URL}/chatbot/sessions/${sessionId}/`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status} - ${text}`);
  }
  return true;
}
