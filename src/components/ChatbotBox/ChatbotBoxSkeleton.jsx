import * as S from "./ChatbotBoxStyle";

export default function ChatbotBoxSkeleton() {
  return (
    <S.ChatbotWrapper style={{ background: "var(--color-base-white)" }}>
      <S.ContentContainer>
        <S.ContentBox>
          <S.BadgeBox>
            <S.SkeletonBadge />
            <S.SkeletonBadge />
          </S.BadgeBox>
          <S.SkeletonTitle />
        </S.ContentBox>
        <div />
      </S.ContentContainer>
    </S.ChatbotWrapper>
  );
}
