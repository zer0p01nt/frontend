import { REGION_MAP } from "../constants/maps";

// 디데이 계산 함수
const calculateDday = (dead_date) => {
  if (!dead_date) return null;
  const today = new Date();
  const deadline = new Date(dead_date);
  today.setHours(0, 0, 0, 0);
  deadline.setHours(0, 0, 0, 0);

  const diffTime = deadline.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return null; // 마감일이 지났으면 표시 안 함
  if (diffDays === 0) return "D-day";
  return `D-${diffDays}`;
};

// '다가오는 관심 일정' 외 다른 목록들을 위한 뱃지 생성 함수
export const makeBadges = (r) => [
  {
    text: REGION_MAP[r.region_id],
    color: "blue",
  },
  ...(r.categories ?? []).map((c) => ({
    text: c.category_name,
    color: "teal",
  })),
];

// '다가오는 관심 일정' (스크랩 목록)을 위한 뱃지 생성 함수
export const makeScrapBadges = (r) => {
  let badges = [];
  
  // 디데이 뱃지 로직 (가장 먼저 추가)
  if (r.has_deadline) {
    const dDay = calculateDday(r.dead_date);
    if (dDay) {
      badges.push({ text: dDay, color: "pink" });
    }
  }

  // 나머지 뱃지들 추가
  badges.push({
    text: REGION_MAP[r.region.id],
    color: "blue",
  });
  
  badges.push(...(r.categories ?? []).map((c) => ({
    text: c.category_name,
    color: "teal",
  })));

  // 뱃지가 2개를 초과하면 '+N'으로 처리하는 로직
  if (badges.length > 2) {
    const remainingCount = badges.length - 2;
    badges = badges.slice(0, 2);
    badges.push({ text: `+${remainingCount}`, color: "teal" });
  }

  return badges;
};

// 알림 목록 조회 API 응답 데이터에 맞춰 수정
export const makeNotiBadges = (r) => [
  {
    text: REGION_MAP[r.document_info.region_id],
    color: "blue",
  },
  ...(r.document_info.category_tags ?? []).map((c) => ({
    text: c,
    color: "teal",
  })),
];