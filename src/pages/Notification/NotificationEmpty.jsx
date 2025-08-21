import * as S from "./NotificationEmptyStyle";

export default function NotificationEmpty() {
  return (
    <S.EmptyContainer>
      <S.EmptyIcon />
      <S.EmptyText>새로운 알림이 아직 없어요</S.EmptyText>
      <S.EmptySubText>관심 분야에 맞는 소식이 등록되면 알려드릴게요</S.EmptySubText>
    </S.EmptyContainer>
  );
}