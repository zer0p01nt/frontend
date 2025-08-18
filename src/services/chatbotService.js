const API_URL = process.env.REACT_APP_API_URL;

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
    throw new Error(`HTTP ${res.status} - ${text}`);
  }

  return res.json();
}

export async function getSession(sessionId) {
  const res = await fetch(`${API_URL}/chatbot/sessions/${sessionId}/`, {
    method: "GET",
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch session");
  return res.json();
}

export async function sendMessage(sessionId, message) {
  const res = await fetch(
    `${API_URL}/chatbot/sessions/${sessionId}/messages/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    }
  );
  if (!res.ok) throw new Error("Failed to send message");
  return res.json();
}

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
