// 전체 카테고리 배열
export const CATEGORY_OPTIONS = [
  "모든 주제",
  "교통",
  "문화",
  "주택",
  "경제",
  "환경",
  "안전",
  "복지",
  "행정",
];

export const CATEGORY_MAP = {
  0: "모든 주제",
  1: "교통",
  2: "문화",
  3: "주택",
  4: "경제",
  5: "환경",
  6: "안전",
  7: "복지",
  8: "행정",
};

// 카테고리명으로 id 매핑
export const NAME_CATEGORY_MAP = {
  교통: 1,
  문화: 2,
  주택: 3,
  경제: 4,
  환경: 5,
  안전: 6,
  복지: 7,
  행정: 8,
};

// id로 지역 매핑
export const REGION_MAP = {
  6: "도봉구",
  24: "종로구",
  85: "경기도",
};

// 지역명으로 id 매핑
export const NAME_REGION_MAP = {
  도봉구: 6,
  종로구: 24,
  경기도: 85,
};

// 한글 카테고리명으로 카테고리 매핑
export const CATEGORY_TYPE_MAP = {
  "참여": "PARTICIPATION",
  "공지": "NOTICE",
  "고시/공고": "ANNOUNCEMENT",
  "보고":"REPORT",
}
