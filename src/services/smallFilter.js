import { useMemo, useState } from "react";
import useProfile from "./useProfile";

// 유저 프로필에서 필터 라벨 가져옴
export function useProfileLabels(key) {
  const { profile, isProfileLoading } = useProfile();

  const labels = useMemo(() => {
    const arr = profile?.data?.[key] ?? [];
    return Array.from(
      new Set(
        arr
          .map((u) => {
            if (key === "user_regions") return u?.region?.district;
            if (key === "user_categories") return u?.category?.category_name;
            return null;
          })
          .filter(Boolean)
      )
    );
  }, [profile, key]);

  return { labels, isLoading: isProfileLoading };
}

// 유저 프로필에서 가져온 라벨로만 이루어진 필터
export function useSmallFilter(labels) {
  const [selected, setSelected] = useState(() => new Set());

  const toggle = (label) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });

  // 연동 할 때 쓰일 예정 : 실제 공문 필터링 하는 로직
  // const makePredicate = (key) => {
  //   if (selected.size === 0) return () => true;

  //   const S = new Set(selected);

  //   if (key === "user_regions") {
  //     return (item) => S.has(item?.region?.district)
  //   }

  //   return (item) => S.has(item?.category?.category_name)
  // }

  return { selected, toggle }; // 여기에 makePredicate도 추가될 예정
}
