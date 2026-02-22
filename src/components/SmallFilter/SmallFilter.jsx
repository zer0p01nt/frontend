import { useEffect } from "react";
import { useProfileLabels, useSmallFilter } from "../../utils/smallFilter";
import Button from "../Button/Button";

/**
 * 알림 페이지, 스크랩된 챗봇 페이지 등에서 사용하는 펼쳐지지 않는 작은 필터 컴포넌트
 * @param {object} props
 * @param {string} props.sourceKey - 프로필 라벨을 가져올 소스 키
 * @param {Function} props.onChange - 선택된 라벨이 변경될 때 호출되는 함수
 */
export default function SmallFilter({ sourceKey, onChange }) {
  const { labels, isLoading } = useProfileLabels(sourceKey);
  const { selected, toggle } = useSmallFilter(labels);

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
