import * as N from "../../pages/Notification/NotificationEmptyStyle";
import * as S from "./EmptyStyle";

/**
 * 표시할 내용이 없다고 알리는 컴포넌트
 * @param {object} props
 * @param {string} props.text - 표시할 메시지 텍스트
 * @param {string} props.subText - 표시할 보조 메시지 텍스트
 * @param {boolean} props.isInNotFound - NotFound 페이지에서 사용되는지 여부 (기본값: false)
 */
export default function Empty({ text, subText, isInNotFound = false }) {
  return (
    <S.EmptyContainer $isInNotFound={isInNotFound}>
      <N.EmptyIcon />
      <N.EmptyText>{text}</N.EmptyText>
      <N.EmptySubText>{subText}</N.EmptySubText>
      {isInNotFound && (
        <S.Btn onClick={() => (window.location.href = "/")}>홈으로 이동</S.Btn>
      )}
    </S.EmptyContainer>
  );
}
