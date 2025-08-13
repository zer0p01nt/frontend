import styled from "styled-components";
import searchIcon from "../../assets/search.svg"; // searchIcon import 추가

// ▼▼▼ 이 두 개의 스타일 정의를 파일 최상단에 추가해주세요 ▼▼▼
export const HomeWrapper = styled.div`
  position: relative;
`;

export const FakeSearchInputWrapper = styled.div`
  width: 100%;
  max-width: 362px;
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  border-radius: var(--border-radius-rounded);
  border: 0.5px solid var(--color-blue-100);
  background-color: var(--color-base-white);
  box-shadow: var(--shadow-default);
  gap: 5px;
  cursor: pointer;

  span {
    color: var(--color-text-primary-subtitle);
    font-size: var(--Body-md-font-size);
  }

  div {
    width: 24px;
    height: 24px;
    background-image: url(${searchIcon});
    background-size: cover;
  }
`;
// ▲▲▲ 여기까지 추가 ▲▲▲

// --- 아래는 기존에 있던 코드입니다 (수정 없음) ---

export const ContentContainer = styled.div`
  position: relative;
  padding: 0 16px 80px;
  display: flex;
  flex-direction: column;
`;

// (이하 나머지 코드는 그대로입니다)
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

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 12px 0 8px;
`

export const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 12px; 
`

export const Character = styled.div`
  width: 30%;
  background: #D9D9D9;
`

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

export const InterestSection = styled.div`
  padding-left: 12px;
`;

export const Subtitle = styled.p`
  font-size: var(--Heading-sm-font-size);
  color: var(--color-text-primary);
  margin: 0;
  font-weight: bold;
`;

export const BadgeWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

export const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
`

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

export const MoreLink = styled.a`
  font-size: var(--Body-sm-font-size);
  color: var(--color-text-secondary);
  text-decoration: none;
`;

export const CardListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

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