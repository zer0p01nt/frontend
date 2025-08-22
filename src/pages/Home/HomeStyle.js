import styled from "styled-components";
import searchIcon from "../../assets/search.svg"; // searchIcon import 추가
import homeCharacter from "../../assets/homeCharacter.png";

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
  transform: translateY(-50%);

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

export const ContentContainer = styled.div`
  position: relative;
  /* 하단 패딩 : main.jsx에 관련 로직이 이미 있어서 일단 제외 */
  padding: 0 16px;
  display: flex;
  flex-direction: column;
`;

export const TitleContainer = styled.div`
  background: linear-gradient(
    180deg,
    var(--color-blue-50) 85.04%,
    var(--color-pink-50) 111.61%
  );
  // 전체 컨테이너의 padding 무시하고 배경 덮기
  width: calc(100% + 16 * 2);
  margin: 0 -16px;
  // 헤더까지 배경 덮기
  padding: 54px 16px 38px;
  display: flex;
  flex-direction: column;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 28px 0 8px;
`;

export const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Character = styled.div`
  width: 30%;
  background: url(${homeCharacter}) no-repeat;
  background-size: contain; /* 이미지가 보이도록 이 부분을 추가했습니다. */
  width: 106.855px;
  height: 86.842px;
  aspect-ratio: 106.85/86.84;
  align-self: flex-end;
  transform: translateY(16px);
`;

export const Title = styled.div`
  font-size: var(--Heading-md-font-size);
  color: var(--color-text-primary);
  margin: 0;
  font-weight: 600;
  line-height: var(--Heading-md-line-height);
  padding: 0 8px;
  letter-spacing: var(--letter-spacing);

  div {
    font-weight: 500;
    font-size: var(--Body-md-font-size);
  }
  strong {
    font-weight: 500;
    color: var(--color-blue-500);
  }
`;

export const InterestSection = styled.div`
  padding-left: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const BadgeWrapper = styled.div`
  display: flex;
  gap: 4px;
`;

export const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

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
  align-items: flex-start; /* 카드의 높이가 달라도 위쪽 기준으로 정렬 */

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