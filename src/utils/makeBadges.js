import { REGION_MAP } from "../constants/maps";

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

// 스크랩 목록 조회 API 응답 데이터에 맞춰 수정
export const makeScrapBadges = (r) => [
  {
    text: REGION_MAP[r.region.id],
    color: "blue",
  },
  ...(r.categories ?? []).map((c) => ({
    text: c.category_name,
    color: "teal",
  })),
];
