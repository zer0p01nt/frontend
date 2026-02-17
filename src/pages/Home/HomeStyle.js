import styled from "styled-components";
import searchIcon from "../../assets/search.svg";
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
  margin-top: -22.5px;
  position: relative;

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
  padding: 0 16px;
  display: flex;
  flex-direction: column;
`;

export const TitleContainer = styled.div`
  background: linear-gradient(
    180deg,
    var(--color-blue-400-main) 85.04%,
    #4298fa 111.61%
  );

  width: calc(100% + 32px);
  margin: 0 -16px;
  padding: 54px 16px 38px;
  display: flex;
  flex-direction: column;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 20px 0 10px;
`;

export const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Character = styled.div`
  width: 30%;
  background: url(${homeCharacter}) no-repeat;
  background-size: contain;
  width: 106.855px;
  height: 86.842px;
  aspect-ratio: 106.85/86.84;
  align-self: flex-end;
  transform: translateY(16px);
`;

export const Title = styled.div`
  font-size: var(--Heading-md-font-size);
  color: var(--color-base-white);
  margin: 0;
  font-weight: 600;
  line-height: var(--Heading-md-line-height);
  padding: 0 8px;
  letter-spacing: var(--letter-spacing);

  div {
    font-weight: 500;
    font-size: var(--Body-md-font-size);
    color: var(--color-base-white);
  }
  strong {
    font-weight: 500;
    color: var(--color-neutral-brand-sub-teal, #45decf);
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

  & > div {
    color: #ffffff;
  }
`;

export const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 12px;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px 12px;
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
  gap: 16px;
  overflow-x: auto;
  align-items: flex-start;

  margin: 0 -16px;
  padding: 0 16px;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
