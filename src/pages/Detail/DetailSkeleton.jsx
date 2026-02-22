// DetailSkeleton.jsx
import * as S from "./DetailStyle";

export default function DetailSkeleton() {
  return (
    <S.DetailContainer>
      <S.InfoBox>
        <S.BadgeWrapper>
          <S.SkeletonBadge />
          <S.SkeletonBadge />
        </S.BadgeWrapper>
        <S.SkeletonTitle />
        <S.MetaInfo>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              width: "100%",
            }}
          >
            <S.SkeletonLine $width='40%' $height='14px' />
            <S.SkeletonLine $width='60%' $height='14px' />
          </div>
        </S.MetaInfo>
      </S.InfoBox>

      <S.AIBox>
        <S.SkeletonLine $width='80px' $height='22px' />
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <S.SkeletonLine $width='100%' />
          <S.SkeletonLine $width='100%' />
          <S.SkeletonLine $width='70%' />
        </div>
      </S.AIBox>

      <S.ContentBox>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <S.SkeletonLine $width='100%' />
          <S.SkeletonLine $width='100%' />
          <S.SkeletonLine $width='100%' />
          <S.SkeletonLine $width='90%' />
          <S.SkeletonBox $height='200px' />
        </div>
      </S.ContentBox>
    </S.DetailContainer>
  );
}
