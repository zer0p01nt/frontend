const API_URL = process.env.REACT_APP_API_URL;

// 공문 스크랩 생성
export async function createPostScrap(postId) {
  const res = await fetch(`${API_URL}/scrap/documents/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      document_id: postId,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status} - ${text}`);
  }

  return res.json();
}

// 공문 스크랩 취소
export async function deletePostScrap(scrapId) {
  const res = await fetch(`${API_URL}/scrap/documents/${scrapId}/`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status} - ${text}`);
  }

  return true;
}

// 공문 스크랩 조회 : 모든 스크랩에서 서치하려고 일부러 pageSize 크게 둠
export async function listPostScrap(pageSize = 50) {
  const res = await fetch(`${API_URL}/scrap/documents/?page_size=${pageSize}`, {
    method: "GET",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status} - ${text}`);
  }

  return res.json();
}

// 공문 스크랩 목록에서 해당 공문 찾기 (스크랩 연동)
export async function findScrapId(documentId) {
  const res = await listPostScrap(50);
  const items = res.data?.results ?? [];
  const matched = items.find((x) => x.document === documentId);
  return matched.id ?? null; // 일치하면 그 스크랩 ID, 일치하는 거 없으면 null
}

// 챗봇 스크랩 생성
export async function createChatbotScrap(userMsgId, aiMsgId) {
  const res = await fetch(`${API_URL}/scrap/chatbot/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_message_id: userMsgId,
      ai_message_id: aiMsgId,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status} - ${text}`);
  }

  return res.json();
}

// 챗봇 스크랩 취소
export async function deleteChatbotScrap(scrapId) {
  const res = await fetch(`${API_URL}/scrap/chatbot/${scrapId}/`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status} - ${text}`);
  }

  return true;
}

// 챗봇 스크랩 조회
export async function listChatbotScrap(pageSize = 50) {
  const res = await fetch(`${API_URL}/scrap/chatbot/?page_size=${pageSize}`, {
    method: "GET",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status} - ${text}`);
  }

  return res.json();
}
