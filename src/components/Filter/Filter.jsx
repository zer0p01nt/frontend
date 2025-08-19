import { useState } from "react";
import { useFilterSelections, useGroups } from "../../utils/filter";
import Button from "../../components/Button/Button";
import * as S from "./FilterStyle";

export default function Filter() {
  const { groups, isLoading } = useGroups();
  const { selected, toggleSelection } = useFilterSelections(groups);
  const [expanded, setExpanded] = useState(false); // 펼친 상태 관리

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
      <S.ContentContainer>
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
            <S.FilterOverlay $expanded={expanded} />
          </>
        )}
      </S.ContentContainer>
    </>
  );
}