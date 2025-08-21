import { useEffect } from "react";
import { useProfileLabels, useSmallFilter } from "../../utils/smallFilter";
import Button from "../Button/Button";

export default function SmallFilter({ sourceKey, onChange }) {
  const { labels, isLoading } = useProfileLabels(sourceKey);
  const { selected, toggle } = useSmallFilter(labels);

  // 선택이 바뀌면 상위 컴포넌트에 전달 : 추후 수정 예정
  useEffect(() => {
    onChange?.(Array.from(selected));
  }, [selected, onChange]);

  if (isLoading) return null;
  if (!labels.length) return null;

  return (
    <>
      {/* 반드시 SmallFilterWrapper로 감싸서 사용 (여기서 말고 실제로 쓸 때) */}
      {labels.map((label) => (
        <Button
          key={label}
          label={label}
          checked={selected.has(label)}
          onChange={() => toggle(label)}
        />
      ))}
    </>
  );
}
