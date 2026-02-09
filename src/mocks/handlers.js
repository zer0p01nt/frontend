import { http, HttpResponse, delay } from "msw";
import { documents } from "./documents";
import { scrapedChatbots } from "./scrapedChatbots";
import { scrapedPosts } from "./scrapedPosts";

const API_URL = process.env.REACT_APP_API_URL;

let chatbotSessions = [];

export const handlers = [
  // useProfile
  http.get(`${API_URL}/user/profile/`, () => {
    return HttpResponse.json({
      data: {
        name: "김덕사",
        birth: "20000101",
        gender_display: "여",
        user_regions: [
          {
            id: 1,
            region: {
              id: 6,
              district: "도봉구",
            },
          },
          {
            id: 2,
            region: {
              id: 24,
              district: "종로구",
            },
          },
        ],
        user_categories: [
          {
            id: 1,
            category: {
              id: 1,
              category_name: "교통",
            },
          },
          {
            id: 2,
            category: {
              id: 2,
              category_name: "문화",
            },
          },
          {
            id: 3,
            category: {
              id: 4,
              category_name: "경제",
            },
          },
        ],
      },
    });
  }),

  // profileService/fetchRegions
  http.get(`${API_URL}/region/regions/`, ({ request }) => {
    const url = new URL(request.url);
    const searchQuery = url.searchParams.get("search") || "";
    const filteredResults = [
      {
        id: 1,
        full_name: "서울특별시 도봉구",
        district: "도봉구",
        region_code: "11320",
      },
      {
        id: 2,
        full_name: "서울특별시 종로구",
        district: "종로구",
        region_code: "11110",
      },
    ].filter((r) => r.full_name.includes(searchQuery));

    return HttpResponse.json({
      results: filteredResults,
      next: null,
    });
  }),

  // profileService/putProfile
  http.put(`${API_URL}/user/profile/`, async () => {
    return HttpResponse.json(
      {
        status: "success",
        message: "[Mocked] Profile updated successfully",
      },
      { status: 200 },
    );
  }),

  // Search documents
  http.get(`${API_URL}/documents/search/`, async ({ request }) => {
    const url = new URL(request.url);
    const q = url.searchParams.get("q") || ""; // 검색어
    const order = url.searchParams.get("order") || "latest"; // 정렬 기준

    await delay(500);

    let filtered = documents.filter((doc) => {
      const keyword = q.toLowerCase();
      return (
        doc.doc_title.toLowerCase().includes(keyword) ||
        doc.summary.toLowerCase().includes(keyword) ||
        doc.doc_content.toLowerCase().includes(keyword)
      );
    });

    if (order === "latest") {
      filtered.sort((a, b) => new Date(b.pub_date) - new Date(a.pub_date));
    } else if (order === "oldest") {
      filtered.sort((a, b) => new Date(a.pub_date) - new Date(b.pub_date));
    }

    return HttpResponse.json({
      data: {
        results: filtered,
        count: filtered.length,
      },
    });
  }),

  // Home/recentAlerts
  http.get(
    `${API_URL}/documents/categories/recent-alerts/`,
    async ({ request }) => {
      const url = new URL(request.url);
      const categoryIds =
        url.searchParams.get("category_ids")?.split(",").map(Number) || [];

      // 사용자의 관심 카테고리 중 하나라도 포함된 공문을 최신순으로 3개 추출
      const alerts = documents
        .filter((doc) =>
          doc.categories?.some((cat) => categoryIds.includes(cat.id)),
        )
        .sort((a, b) => new Date(b.pub_date) - new Date(a.pub_date))
        .slice(0, 3);

      return HttpResponse.json({
        recent_alerts: alerts,
      });
    },
  ),

  // Home/scrapedPosts
  http.get(`${API_URL}/documents/upcoming-deadlines/`, async () => {
    // scrapedPosts 배열에 있는 공문들 중 has_deadline이 true인 것만 추출
    const deadlinePosts = scrapedPosts
      .map((scrap) => {
        const doc = documents.find((d) => d.id === scrap.document);
        return doc ? { id: scrap.id, document: doc } : null;
      })
      .filter((item) => item && item.document.has_deadline)
      .sort(
        (a, b) =>
          new Date(a.document.dead_date) - new Date(b.document.dead_date),
      ) // 마감 임박순
      .slice(0, 3);

    return HttpResponse.json({
      data: {
        results: deadlinePosts,
      },
    });
  }),

  // Home/recentNews
  http.get(
    `${API_URL}/documents/region/:regionId/recent/`,
    async ({ params }) => {
      const { regionId } = params;

      // 해당 지역 ID와 일치하는 공문을 최신순으로 3개 추출
      const news = documents
        .filter((doc) => doc.region_id === Number(regionId))
        .sort((a, b) => new Date(b.pub_date) - new Date(a.pub_date))
        .slice(0, 3);

      return HttpResponse.json({
        recent_news: news,
      });
    },
  ),

  // Notification
  http.get(`${API_URL}/notification/notification/`, async ({ request }) => {
    const url = new URL(request.url);
    const docType = url.searchParams.get("doc_type");
    const regionIds =
      url.searchParams.get("region_ids")?.split(",").map(Number) || [];
    const categoryIds =
      url.searchParams.get("category_ids")?.split(",").map(Number) || [];

    let filtered = [...documents];

    if (docType) {
      filtered = filtered.filter((n) => n.document_info.doc_type === docType);
    }

    if (regionIds.length > 0) {
      filtered = filtered.filter((n) => regionIds.includes(n.region_id));
    }

    if (categoryIds.length > 0) {
      filtered = filtered.filter((n) =>
        n.categories.some((cat) => categoryIds.includes(cat.id)),
      );
    }

    // 최신 알림순 정렬
    filtered.sort(
      (a, b) => new Date(b.notification_time) - new Date(a.notification_time),
    );

    return HttpResponse.json({
      data: {
        results: filtered,
        count: filtered.length,
      },
    });
  }),

  // scrapService/listPostScrap
  http.get(`${API_URL}/scrap/documents/`, ({ request }) => {
    const url = new URL(request.url);

    // 쿼리 파라미터 추출
    const docType = url.searchParams.get("doc_type");
    const order = url.searchParams.get("order");
    const regionIdsRaw = url.searchParams.get("region_ids");
    const regionIds = regionIdsRaw ? regionIdsRaw.split(",").map(Number) : [];
    const categoryIdsRaw = url.searchParams.get("category_ids");
    const categoryIds = categoryIdsRaw
      ? categoryIdsRaw.split(",").map(Number)
      : [];

    let filtered = [...scrapedPosts];

    if (docType) {
      filtered = filtered.filter((p) => p.doc_type === docType);
    }

    if (regionIds.length > 0) {
      filtered = filtered.filter((p) => regionIds.includes(p.region_id));
    }

    if (categoryIds.length > 0) {
      filtered = filtered.filter((p) =>
        p.categories?.some((cat) => categoryIds.includes(cat.id)),
      );
    }

    if (order === "latest") {
      filtered.sort((a, b) => new Date(b.pub_date) - new Date(a.pub_date));
    } else if (order === "oldest") {
      filtered.sort((a, b) => new Date(a.pub_date) - new Date(b.pub_date));
    }

    return HttpResponse.json({
      data: {
        results: filtered,
        count: filtered.length,
        next: null,
      },
    });
  }),

  // scrapService/createPostScrap
  http.post(`${API_URL}/scrap/documents/`, async ({ request }) => {
    const { document_id } = await request.json();

    const newScrapId = Math.floor(Math.random() * 10000);
    const newScrap = { id: newScrapId, document: document_id };
    scrapedPosts.push(newScrap);

    return HttpResponse.json(
      {
        data: { id: newScrapId },
      },
      { status: 201 },
    );
  }),

  // scrapService/deletePostScrap
  http.delete(`${API_URL}/scrap/documents/:scrapId/`, ({ params }) => {
    const { scrapId } = params;
    scrapedPosts = scrapedPosts.filter((s) => s.id !== Number(scrapId));

    return new HttpResponse(null, { status: 204 });
  }),

  // documents fetch
  http.get(`${API_URL}/documents/`, async ({ request }) => {
    const url = new URL(request.url);

    // 쿼리 파라미터 추출
    const docType = url.searchParams.get("doc_type");
    const order = url.searchParams.get("order");
    const regionIdsRaw = url.searchParams.get("region_id");
    const regionIds = regionIdsRaw ? regionIdsRaw.split(",").map(Number) : [];
    const categoryIdsRaw = url.searchParams.get("category");
    const categoryIds = categoryIdsRaw
      ? categoryIdsRaw.split(",").map(Number)
      : [];

    let filtered = [...documents];

    if (docType) {
      filtered = filtered.filter((p) => p.doc_type === docType);
    }

    if (regionIds.length > 0) {
      filtered = filtered.filter((p) => regionIds.includes(p.region_id));
    }

    if (categoryIds.length > 0) {
      filtered = filtered.filter((p) =>
        p.categories?.some((cat) => categoryIds.includes(cat.id)),
      );
    }

    if (order === "views") {
      filtered.sort((a, b) => b.views - a.views);
    }

    return HttpResponse.json({
      results: filtered,
      next: null,
    });
  }),

  // document detail fetch
  http.get(`${API_URL}/documents/:id/`, async ({ params }) => {
    const { id } = params;
    // documents 배열에서 ID가 일치하는 공문 찾기
    const post = documents.find((d) => d.id === Number(id)) || documents[0];

    // await delay(300);

    return HttpResponse.json({
      ...post,
    });
  }),

  // ScrapedChatbots fetch
  http.get(`${API_URL}/scrap/chatbot/`, async ({ request }) => {
    const url = new URL(request.url);

    // 쿼리 파라미터 추출
    const docType = url.searchParams.get("doc_type");
    const order = url.searchParams.get("order");
    const categoryIdsRaw = url.searchParams.get("category_id");
    const categoryIds = categoryIdsRaw
      ? categoryIdsRaw.split(",").map(Number)
      : [];

    let filtered = [...scrapedChatbots];

    if (docType) {
      filtered = filtered.filter((p) => p.doc_type === docType);
    }

    if (categoryIds.length > 0) {
      filtered = filtered.filter((p) =>
        p.categories?.some((cat) => categoryIds.includes(cat.id)),
      );
    }

    if (order === "latest") {
      filtered.sort((a, b) => new Date(b.pub_date) - new Date(a.pub_date));
    } else if (order === "oldest") {
      filtered.sort((a, b) => new Date(a.pub_date) - new Date(b.pub_date));
    }

    return HttpResponse.json({
      data: {
        results: filtered,
        count: filtered.length,
        next: null,
      },
    });
  }),

  // ScrapedChatbot detail fetch
  http.get(`${API_URL}/scrap/chatbot/:openId/`, async ({ params }) => {
    const { openId } = params;

    await delay(400);

    const detail = scrapedChatbots.find(
      (chatbot) => chatbot.id === Number(openId),
    );

    return HttpResponse.json({
      data: detail,
    });
  }),

  // create chatbot scrap
  http.post(`${API_URL}/scrap/chatbot/`, async ({ request }) => {
    const body = await request.json();

    // 성공했다는 의미의 가짜 ID만 생성해서 바로 반환
    const fakeScrapId = Date.now();

    return HttpResponse.json(
      {
        data: {
          data: { id: fakeScrapId },
        },
      },
      { status: 201 },
    );
  }),

  // delete chatbot scrap
  http.delete(`${API_URL}/scrap/chatbot/:scrapId/`, () => {
    return new HttpResponse(null, { status: 204 });
  }),

  // chatbotService/createSession
  http.post(`${API_URL}/chatbot/sessions/`, async ({ request }) => {
    const { document_id, initial_message } = await request.json();

    const userMsgId = Date.now();
    const aiMsgId = userMsgId + 1;

    const newSession = {
      id: Number(document_id),
      post_id: Number(document_id),
      messages: [
        {
          id: userMsgId,
          speaker: "USER",
          content: initial_message,
          created_at: new Date().toISOString(),
        },
        {
          id: aiMsgId,
          speaker: "AI",
          content: `안녕하세요! 빌리트의 리티입니다.\n리티는 현재 "${initial_message}" 에 대해 답변을 제공할 수 없습니다.`,
          created_at: new Date().toISOString(),
        },
      ],
    };

    chatbotSessions.push(newSession);

    return HttpResponse.json(
      {
        data: { data: newSession },
      },
      { status: 201 },
    );
  }),

  // chatbotService/getSession
  http.get(`${API_URL}/chatbot/sessions/:sessionId/`, ({ params }) => {
    const { sessionId } = params;
    const session = chatbotSessions.find((s) => s.id === Number(sessionId));

    if (!session) return new HttpResponse(null, { status: 404 });

    return HttpResponse.json({
      data: { data: session },
    });
  }),

  // chatbotService/sendMessage
  http.post(
    `${API_URL}/chatbot/sessions/:sessionId/messages/`,
    async ({ params, request }) => {
      const { sessionId } = params;
      const { message } = await request.json();
      const session = chatbotSessions.find((s) => s.id === Number(sessionId));

      if (!session) return new HttpResponse(null, { status: 404 });

      const userMsg = {
        id: Date.now(),
        speaker: "USER",
        content: message,
        created_at: new Date().toISOString(),
      };
      const aiMsg = {
        id: Date.now() + 1,
        speaker: "AI",
        content: `리티는 현재 "${message}" 에 대해 답변을 제공할 수 없습니다.`,
        created_at: new Date().toISOString(),
      };

      session.messages.push(userMsg, aiMsg);

      await delay(800);

      return HttpResponse.json({
        data: {
          data: {
            user_message: userMsg,
            ai_message: aiMsg,
          },
        },
      });
    },
  ),

  // chatbotService/deleteSession
  http.delete(`${API_URL}/chatbot/sessions/:sessionId/`, ({ params }) => {
    const { sessionId } = params;
    chatbotSessions = chatbotSessions.filter((s) => s.id !== Number(sessionId));
    return new HttpResponse(null, { status: 204 });
  }),

  // fcm/sendToken
  http.post(`${API_URL}/notification/fcm/register/`, () => {
    return HttpResponse.json({ success: true }, { status: 200 });
  }),

  // PushBtn
  http.post(`${API_URL}/notification/fcm/test/`, async () => {
    // 서비스 워커가 준비되었는지 확인
    if (!("serviceWorker" in navigator)) {
      return new HttpResponse("Service Worker not supported", { status: 500 });
    }

    const registration = await navigator.serviceWorker.ready;
    try {
      await registration.showNotification(
        "📍 [서울특별시 종로구/문화] 관련 공문이 등록됐어요!",
        {
          body: '"2026년 인사동 문화지구 육성지원 계획 공고" 지금 확인해 보세요!',
          icon: "/logo512.png",
          badge: "/logo192.png",
          tag: "test-push",
          renotify: true,
          data: {
            path: "/post/1",
          },
        },
      );

      return HttpResponse.json(
        { message: "테스트 알림 발송 성공" },
        { status: 200 },
      );
    } catch (error) {
      console.error("MSW Notification Error:", error);
      return new HttpResponse("Notification failed", { status: 500 });
    }
  }),
];
