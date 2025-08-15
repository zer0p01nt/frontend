import { useCallback, useEffect, useMemo, useState } from "react";
import useProfile from "./useProfile";
import { CATEGORY_OPTIONS } from "./filter";

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
export function useSmallFilter(labels = []) {
  const [selected, setSelected] = useState(() => new Set());

  useEffect(() => {
    const L = new Set(labels);
    setSelected((prev) => {
      const next = new Set([...prev].filter((l) => L.has(l)));
      return next.size === prev.size ? prev : next;
    });
  }, [labels]);

  const toggle = (label) => {
    if (!labels.includes(label)) return;
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  };

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

// 챗봇 스크랩용 SmallFilter : 모든 카테고리를 보여줌
export function useChatbotSmallFilter(labels, allOption) {
  const L = useMemo(() => new Set(labels), [labels]); // 넘겨 받은 배열에서 중복 제거
  const hasAll = L.has(allOption); // allOption이 배열 안에 있는 옵션인지 확인

  // 초기값: allOption이 존재하면 '모든 주제' 선택, 없으면 빈 선택
  const [selected, setSelected] = useState(
    () => hasAll && new Set([allOption])
  );

  // labels가 바뀔 때 : 유효하지 않은 선택 제거 + 비었으면 allOption 복구
  useEffect(() => {
    setSelected((prev) => {
      const next = new Set([...prev].filter((v) => L.has(v)));
      if (hasAll && next.size === 0) next.add(allOption);

      const sameSize = next.size === prev.size;
      const same = sameSize && [...next].every((v) => prev.has(v));
      return same ? prev : next;
    });
  }, [L, hasAll, allOption]);

  // 토글: allOption 클릭 시 allOption만 유지,
  // 개별 옵션 클릭 시 allOption 해제, 모두 해제되면 allOption 복귀
  const toggle = useCallback(
    (label) => {
      if (!L.has(label)) return;

      setSelected((prev) => {
        // all 클릭
        if (hasAll && label === allOption) {
          return new Set([allOption]);
        }

        // 개별 토글
        const next = new Set(prev);
        next.has(label) ? next.delete(label) : next.add(label);

        // 개별이 하나라도 있으면 all 해제
        if (hasAll && next.has(allOption)) next.delete(allOption);

        // 모두 해제되면 all 복귀
        if (hasAll && next.size === 0) next.add(allOption);

        return next;
      });
    },
    [L, hasAll, allOption]
  );

  // 연동시 실제 필터에 사용
  // const makePredicate = useCallback(
  //   (key) => {
  //     if (hasAll && selected.has(allOption)) return () => true;
  //     const S = new Set(selected);
  //     if (key === "user_regions") return (item) => S.has(item?.region?.district);
  //     return (item) => S.has(item?.category?.category_name);
  //   },
  //   [selected, hasAll, allOption]
  // );

  return { selected, toggle }; // 추후 makePredicate 추가 예정
}
