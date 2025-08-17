import styled from "styled-components";
import character from "../../assets/Character.png";

// 제목 부분 전체를 감싸는 컨테이너
export const TitleContainer = styled.div`
  background: linear-gradient(
    180deg,
    var(--color-blue-50) 85.04%,
    var(--color-pink-50) 111.61%
  );
  // 전체 컨테이너의 padding 무시하고 배경 덮기
  margin: 0 -16px;
  // 헤더까지 배경 덮기
  padding: 66px 24px 24px;
  display: flex;
  flex-direction: column;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const Character = styled.div`
  width: 90px;
  height: 82.688px;
  aspect-ratio: 90/82.69;
  background-image: url(${character});
`;

export const TitleBox = styled.div`
  display: flex;
  padding: 0 8px;
  align-items: center;
  gap: 10px;
`;

export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

export const Username = styled.div`
  color: var(--color-base-black);
  font-size: var(--Heading-lg-font-size);
  font-weight: 700;
  line-height: var(--Heading-lg-line-height);
  letter-spacing: var(--letter-spacing);
`;

export const Text = styled.span`
  color: var(--color-base-black);
  font-size: var(--Heading-sm-font-size);
  font-weight: 600;
  line-height: var(--Heading-sm-line-height);
  letter-spacing: var(--letter-spacing);

  strong {
    color: var(--color-neutral-brand-primary);
    font-weight: 600;
  }
`;

export const BadgeWrapper = styled.div`
  display: flex;
  padding: 12px;
  align-items: flex-start;
  gap: 8px;
  border-radius: var(--border-radius-2xl);
  border: 1px solid var(--color-blue-50);
  background: var(--color-base-white);
  flex-wrap: wrap;
  transform: translateY(-50%);
`;

// 뱃지 색이 기존 컴포넌트와 달라 임의로 추가했습니다
export const MyPageBadge = styled.span`
  display: inline-flex;
  padding: 4px 12px;
  justify-content: center;
  align-items: center;
  border-radius: var(--border-radius-rounded);
  font-size: var(--Body-sm-font-size);
  font-weight: 600;
  line-height: var(--Body-sm-line-height);
  background-color: ${({ $variant }) =>
    $variant === "region" ? "var(--color-blue-50)" : "var(--color-teal-50)"};
  color: ${({ $variant }) =>
    $variant === "region"
      ? "var(--color-blue-400-main)"
      : "var(--color-teal-600)"};
  flex-shrink: 0;
`;

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const NoScraped = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  height: 15vh;

  > div:first-child {
    color: var(--color-base-black, #191919);
    text-align: center;
    font-size: var(--Heading-sm-font-size);
    font-weight: 600;
    line-height: var(--Heading-sm-line-height);
    letter-spacing: var(--letter-spacing);
  }

  > div:last-child {
    color: var(--color-neutral-secondary, #a3a1a1);
    text-align: center;
    font-size: var(--Body-sm-font-size);
    font-weight: 500;
    line-height: var(--Body-sm-line-height);
  }
`;
