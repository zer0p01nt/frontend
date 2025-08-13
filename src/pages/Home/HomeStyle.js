import styled from "styled-components";

// 모든 콘텐츠를 감싸는 컨테이너
export const ContentContainer = styled.div`
  position: relative;
  padding: 0 16px 80px;
  display: flex;
  flex-direction: column;
`;

// 제목 부분 전체를 감싸는 컨테이너 (배경을 여기로 옮겼습니다)
export const TitleContainer = styled.div`
  background: linear-gradient(180deg, var(--color-blue-50) 85.04%, var(--color-pink-50) 111.61%);
  // 전체 컨테이너의 padding 무시하고 배경 덮기
  width: calc(100% + 16 * 2); 
  margin: 0 -16px;
  // 헤더까지 배경 덮기
  padding: 42px 16px 16px;
  display: flex;
  flex-direction: column; 
`;

// 제목 부분에서 검색창만 제외한 래퍼
export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 12px 0 8px;
`

// 제목 부분에서 검색창, 캐릭터 이미지 제외한 텍스트 부분
export const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 12px; 
`

// 캐릭터 이미지가 들어올 자리
export const Character = styled.div`
  width: 30%;
  background: #D9D9D9;
`

// "사용자님!" 과 같은 큰 제목 스타일
export const Title = styled.h1`
  font-size: var(--Heading-md-font-size);
  color: var(--color-text-primary);
  margin: 0;
  font-weight: 600;
  line-height: var(--Heading-xl-line-height);
  padding: 0 8px;

  div {
    font-weight: 500;
    font-size: var(--Body-md-font-size);
  }
  strong{
    font-weight: 500;
    color: var(--color-blue-500);
  }
`;

// "관심 분야" 섹션을 들여쓰기 위한 스타일
export const InterestSection = styled.div`
  padding-left: 12px;
`;

// "관심 분야" 같은 부제목 스타일
export const Subtitle = styled.p`
  font-size: var(--Heading-sm-font-size);
  color: var(--color-text-primary);
  margin: 0;
  font-weight: bold;
`;

// 뱃지를 감싸는 영역
export const BadgeWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

// Section 간 간격을 위해 Wrapper를 하나 추가했습니다
export const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
`

// "관심 분야의 최근 알림" 같은 섹션 제목 스타일
export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 8px;
`;

export const SectionTitle = styled.h2`
  font-size: var(--Heading-lg-font-size);
  color: var(--color-text-primary);
  margin: 0;
  font-weight: bold;
`;

// "더보기" 링크 스타일
export const MoreLink = styled.a`
  font-size: var(--Body-sm-font-size);
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
  gap: 16px; /* 카드 사이 간격을 약간 조정 */
  overflow-x: auto;
  
  
  margin: 0 -16px; 
  padding: 0 16px; 
  scroll-snap-type: x mandatory;

  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;