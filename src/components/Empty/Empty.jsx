import * as N from "../../pages/Notification/NotificationEmptyStyle";
import * as S from "./EmptyStyle";

/**
 * 표시할 내용이 없다고 알리는 컴포넌트
 * @param {object} props
 * @param {string} props.text - 표시할 메시지 텍스트
 * @param {string} props.subText - 표시할 보조 메시지 텍스트
 */
export default function Empty({ text, subText }) {
  return (
    <S.EmptyContainer>
      <N.EmptyIcon />
      <N.EmptyText>{text}</N.EmptyText>
      <N.EmptySubText>{subText}</N.EmptySubText>
    </S.EmptyContainer>
  );
}
