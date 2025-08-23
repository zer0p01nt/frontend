import { useMemo } from "react";
import { REGION_MAP } from "../../constants/maps";
import useFetch from "../../hooks/useFetch";

const API_URL = process.env.REACT_APP_API_URL;

// 관련 공문 추천 개별 공문의 상세 조회 API로 뱃지 정보 조회
// children(badges, loading) 형태로 가져와 CardList에 넘김

export default function RecommendBadges({ doc, children }) {
  const url = doc?.id ? `${API_URL}/documents/${doc.id}` : null;
  const { data, isLoading } = useFetch(url, {});

  const badges = useMemo(() => {
    if (!data) return;

    const region =
      typeof data.region_id !== "undefined"
        ? {
            text: REGION_MAP[data.region_id],
            color: "blue",
          }
        : null;

    const categories = Array.isArray(data.categories)
      ? data.categories.map((c) => ({
          text: c.category_name,
          color: "teal",
        }))
      : [];

    return [region, ...categories].filter(Boolean);
  }, [data]);

  let renderBadges;
  // 뱃지가 3개를 초과하면 '+N'으로 처리하는 로직
  if (badges.length > 3) {
    const remainingCount = badges.length - 3;
    renderBadges = badges.slice(0, 3);
    renderBadges.push({ text: `+${remainingCount}`, color: "teal" });
  } else {
    renderBadges = badges;
  }

  return children(renderBadges, isLoading);
}
