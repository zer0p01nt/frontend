export const chatbotScrapKey = (sessionId, aiId) =>
  `chatbot:scrap:${String(sessionId)}:${Number(aiId)}`;
