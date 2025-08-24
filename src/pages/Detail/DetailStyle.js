import styled from "styled-components";
import summaryCharacter from "../../assets/summaryCharacter.png";

// 전체 컨테이너
export const DetailContainer = styled.div`
  margin: 42px 0 36px;
  width: 100%;
  max-width: 393px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;
`;

// info 부분
export const InfoBox = styled.div`
  display: flex;
  width: 100%;
  padding: 16px 24px;
  flex-direction: column;
  gap: 8px;
  background-color: var(--color-base-white);
  box-shadow: 0px 2px 4px 0 rgba(163, 161, 161, 0.2);
`;

export const BadgeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Title = styled.div`
  color: var(--color-base-black);
  font-size: var(--Heading-lg-font-size);
  font-weight: 700;
  line-height: var(--Heading-lg-line-height);
  letter-spacing: var(--letter-spacing);
  padding: 0;
`;
export const RecommendTitle = styled.div`
  color: var(--color-base-black);
  font-size: var(--Heading-lg-font-size);
  font-weight: 700;
  line-height: var(--Heading-lg-line-height);
  letter-spacing: var(--letter-spacing);
  padding: 12px 0;
`;
export const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const MetaInfoLabel = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 3px;

  & > li {
    color: var(--color-text-secondary);
    font-size: var(--Heading-sm-font-size);
    line-height: var(--Heading-sm-line-height);
    font-weight: 500;
  }
`;

export const MetaInfoData = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 3px;

  & > li {
    color: var(--color-base-black);
    font-size: var(--Body-md-font-size);
    line-height: var(--Body-md-line-height);
    font-weight: 400;
  }
`;

// AI 요약 부분
export const AIBox = styled.div`
  width: calc(100% - 32px);
  margin: 0 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: var(--border-radius-xl);
  border: 1px solid rgba(79, 132, 255, 0.4);
  background: linear-gradient(
      to bottom,
      rgba(254, 254, 254, 0.4) 16%,
      rgba(187, 210, 255, 0.4) 84%,
      rgba(255, 238, 254, 0.4) 100%
    ),
    var(--color-base-white);
  position: relative;
  z-index: 0;
`;

export const AICharacter = styled.div`
  width: 171.592px;
  aspect-ratio: 131/112;
  opacity: 0.7; 
  background-image: url(${summaryCharacter});
  background-repeat: no-repeat;
  position: absolute;
  right: 8.91px;
  bottom: 0;
  z-index: 0;
  mix-blend-mode: overlay;
`;

export const AIHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  z-index: 1;
`;

export const AITitle = styled.div`
  color: var(--color-neutral-brand-primary);
  font-size: var(--Heading-lg-font-size);
  font-weight: 700;
  line-height: var(--Heading-lg-line-height);
  letter-spacing: var(--letter-spacing);
  z-index: 1;
`;

export const Content = styled.div`
  color: var(--color-base-black);
  font-size: var(--Body-md-font-size);
  line-height: var(--Body-md-line-height);
  font-weight: 500;
  white-space: pre-line;
  z-index: 1;
`;

export const ContentBox = styled.div`
  width: 100%;
  display: flex;
  padding: 0 24px;
  flex-direction: column;
  gap: 18px;
`;

export const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  padding: 0 24px;
  flex-direction: column;
  gap: 12px;
`;

export const LinkBtn = styled.a`
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  border-radius: var(--border-radius-xl);
  background-color: var(--color-neutral-brand-primary);
  color: var(--color-base-white);
  font-size: var(--Body-lg-font-size);
  font-weight: 600;
  line-height: var(--Body-lg-line-height);
  letter-spacing: var(--letter-spacing);
  text-decoration: none;
`;

export const SecondBtnBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const SecondBtn = styled.button`
  display: flex;
  padding: 6px 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex: 1 0 0;
  border-radius: var(--border-radius-xl);
  background-color: var(--color-pink-50);
  color: var(--color-pink-600);
  font-size: var(--Body-md-font-size);
  line-height: var(--Body-md-line-height);
  font-weight: 600;
`;

export const RecommendBox = styled.div`
  width: 100%;
  display: flex;
  padding: 0 24px;
  flex-direction: column;
  /* align-items: center; */
`;