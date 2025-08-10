import styled from "styled-components";

// 그라데이션 배경
export const GradientBg = styled.div`
  background: linear-gradient(
    180deg,
    var(--color-blue-100) 84%,
    var(--color-pink-50) 100%
  );
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 260px;
  opacity: 0.5;
  z-index: 1;
`;

// 모든 콘텐츠를 감싸는 컨테이너
export const ContentContainer = styled.div`
  position: relative;
  z-index: 2;
  padding: 24px 16px 80px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

// 홈 페이지 전체를 감싸는 스타일
export const HomeWrapper = styled.div`
  position: relative;
`;

// "사용자님!" 과 같은 큰 제목 스타일
export const Title = styled.h1`
  font-size: var(--Heading-md-font-size);
  color: var(--color-text-primary);
  margin: 0;
  font-weight: 600;
  line-height: var(--Heading-xl-line-height);

  span {
    font-weight: 400; /* 일반 굵기 */
  }
  strong{
    color: var(--color-blue-500);
  }
`;

// "관심 분야" 섹션을 들여쓰기 위한 스타일
export const InterestSection = styled.div`
  padding-left: 16px;
`;

// "관심 분야" 같은 부제목 스타일
export const Subtitle = styled.p`
  font-size: var(--Heading-sm-font-size);
  color: var(--color-text-primary);
  margin: 0;
  margin-top: 16px;
  font-weight: bold;
`;

// 뱃지를 감싸는 영역
export const BadgeWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

// "관심 분야의 최근 알림" 같은 섹션 제목 스타일
export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const SectionTitle = styled.h2`
  font-size: var(--Heading-lg-font-size);
  color: var(--color-text-primary);
  margin: 0;
  font-weight: 600;
`;

// "더보기" 링크 스타일
export const MoreLink = styled.a`
  font-size: var(--Body-md-font-size);
  color: var(--color-text-secondary);
  text-decoration: none;
`;

// 세로 목록을 위한 Wrapper (밑줄 목록용)
export const CardListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

// 가로 스크롤을 위한 Wrapper (카드 목록용)
export const HorizontalScrollWrapper = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;