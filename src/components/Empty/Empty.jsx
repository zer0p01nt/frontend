import * as S from "../../pages/Notification/NotificationEmptyStyle";

export default function Empty({ text, subText }) {
  return (
    <S.EmptyContainer>
      <S.EmptyIcon />
      <S.EmptyText>{text}</S.EmptyText>
      <S.EmptySubText>{subText}</S.EmptySubText>
    </S.EmptyContainer>
  );
}
