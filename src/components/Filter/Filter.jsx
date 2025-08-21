import { useEffect, useMemo, useState, useRef } from "react";
import { useFilterSelections, useGroups } from "../../utils/filter";
import Button from "../../components/Button/Button";
import * as S from "./FilterStyle";

export default function Filter({ onChange }) {
  const { groups, isLoading } = useGroups();
  const { selected, toggleSelection } = useFilterSelections(groups);
  const [expanded, setExpanded] = useState(false); // 펼친 상태 관리

  // 바깥 클릭 시 닫히도록 하기 위한 ref 추가
  const ref = useRef(null)

  // 바깥 클릭 시 닫힘
  useEffect(() => {
    if (!expanded) return

    const onClickAway = (e) => {
      // 필터 안쪽 클릭이면 냅둠
      if (ref.current && ref.current.contains(e.target)) return
      setExpanded(false)
    }

    window.addEventListener("mousedown", onClickAway)

    return () => {
      window.removeEventListener("mousedown", onClickAway)
    }
  }, [expanded])

  // 현재 선택된 라벨 텍스트만으로 만든 배열 (부모 페이지에 전달)
  const selectedLabels = useMemo(() => {
    return groups.flatMap((g) => Array.from(selected[g.id] ?? []))
  }, [groups, selected])

  // 선택 변경 시 부모 페이지에 전달
  useEffect(() => {
    onChange?.(selectedLabels)
  }, [selectedLabels, onChange])

  if (isLoading) return null;

  // 일반 필터 (접었을 때)
  const summaryList = groups.flatMap((g) =>
    Array.from(selected[g.id] ?? []).map((opt) => ({
      groupId: g.id,
      value: opt,
    }))
  );

  return (
    <>
      <S.ContentContainer ref={ref}>
        <S.FilterContainer>
          {/* 일반 필터 (접었을 때) */}
          <S.NormalFilterWrapper>
            {summaryList.map(({ groupId, value }) => (
              <Button
                key={`${groupId}-${value}`}
                onChange={() => toggleSelection(groupId, value)}
                checked={true}
                label={value}
              />
            ))}
          </S.NormalFilterWrapper>
          <S.chevronBtn
            type='button'
            $expanded={expanded}
            onClick={() => setExpanded((prev) => !prev)}
          ></S.chevronBtn>
        </S.FilterContainer>
        {/* 상세 필터 (펼쳤을 때) */}
        {expanded && (
          <>
            <S.DetailFilterWrapper>
              {groups.map((group) => (
                <S.DetailFilter key={group.id}>
                  {group.options.map((option) => (
                    <Button
                      key={option}
                      label={option}
                      checked={selected[group.id]?.has(option)}
                      onChange={() => toggleSelection(group.id, option)}
                    />
                  ))}
                </S.DetailFilter>
              ))}
            </S.DetailFilterWrapper>
            {/* 오버레이 눌러도 닫히게 함 (이게 중요) */}
            <S.FilterOverlay $expanded={expanded} onClick={() => setExpanded(false)} />
          </>
        )}
      </S.ContentContainer>
    </>
  );
}