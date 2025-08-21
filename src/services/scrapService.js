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
