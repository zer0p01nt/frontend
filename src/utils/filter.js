import { useEffect, useMemo, useState } from "react";
import useProfile from "../hooks/useProfile";
import { CATEGORY_OPTIONS } from "../constants/maps";

// 지역 필터링을 위한 옵션 배열
function buildRegionOptions(profile) {
  // list 생성 => truthy한 값만 남기고 falsy한 값은 전부 제거
  const list =
    profile?.data?.user_regions
      ?.map((u) => u?.region?.district)
      ?.filter(Boolean) ?? [];
  // Set으로 중복 없앰
  const uniqueList = Array.from(new Set(list));
  return ["관심 지역 전체", ...uniqueList];
}

// 카테고리 배열과 지역 배열 합침
export function useGroups() {
  const { profile, isProfileLoading } = useProfile();

  const groups = useMemo(() => {
    const regionOptions = buildRegionOptions(profile);
    return [
      {
        id: "region",
        allOption: regionOptions[0], // "관심 지역 전체"
        options: regionOptions,
      },
      {
        id: "category",
        allOption: CATEGORY_OPTIONS[0], // "모든 주제"
        options: CATEGORY_OPTIONS,
      },
    ];
  }, [profile]);

  return { groups, isLoading: isProfileLoading };
}

export function useFilterSelections(groups) {
  // 초기화 : 모든 배열을 전체 선택 상태로
  const [selected, setSelected] = useState(() =>
    Object.fromEntries(groups.map((g) => [g.id, new Set([g.allOption])]))
  );

  // 배열(group)에 변동사항 생길 때마다 선택값 재조정
  useEffect(() => {
    setSelected((prev) => {
      const next = {};
      for (const g of groups) {
        // 이전 상태에서 해당 배열에서의 선택값 가져오기 ?? 없으면 "전체"만 선택되도록 Set으로 기본값 설정
        const prevSet = prev[g.id] ?? new Set([g.allOption]);
        // 이전 선택값 중 현재 배열에 실제로 존재하는 값만 남기기
        const valid = new Set(
          Array.from(prevSet).filter((v) => g.options.includes(v))
        );
        // 유효한 값이 하나도 없으면 "전체"만 선택되도록 추가
        if (valid.size === 0) valid.add(g.allOption);
        // 결과 객체에 저장
        next[g.id] = valid;
      }
      // 새로운 선택 상태 반환 => setSelected로 업데이트
      return next;
    });
  }, [groups]);

  // 버튼 토글 시 로직
  const toggleSelection = (groupId, option) => {
    // groupId 확인
    const g = groups.find((g) => g.id === groupId);
    if (!g) return;

    setSelected((prev) => {
      const next = new Set(prev[groupId] ?? []);

      // 전체 클릭 시 전체만 선택됨
      if (option === g.allOption) {
        return { ...prev, [groupId]: new Set([g.allOption]) };
      }

      // 개별 토글
      if (next.has(option)) {
        next.delete(option);
      } else {
        next.add(option);
      }

      // 개별 선택 시 전체 해제
      if (next.has(g.allOption)) {
        next.delete(g.allOption);
      }

      // 아무 것도 없으면 전체 복귀
      if (next.size === 0) {
        next.add(g.allOption);
      }

      return { ...prev, [groupId]: next };
    });
  };

  return { selected, toggleSelection };
}
