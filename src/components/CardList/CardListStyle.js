import styled, { css } from "styled-components";

// 텍스트 내용 전체를 감싸는 래퍼
export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
`;

// 오른쪽에 들어갈 이미지
export const CardImage = styled.div`
  flex-shrink: 0;
  border-radius: var(--border-radius-md);
  background-color: var(--color-neutral-200);
`;

// variant에 따라 다른 스타일을 적용하는 css 헬퍼
const variants = {
  // 밑줄 스타일 (기본값)
  list: css`
    padding: 16px 0;
    border-bottom: 1px solid var(--color-neutral-200);
    flex-direction: row; /* 좌우 배치 */
    align-items: center;

    ${ContentWrapper} {
      flex: 1;
      min-width: 0;
    }
    ${CardImage} {
      width: 60px;
      height: 60px;
    }
  `,
  // 카드 스타일 (가로 스크롤용)
  card: css`
    padding: 12px;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-default);
    width: 196px;
    flex-direction: column; /* 위아래 배치 */
    gap: 8px;

    ${ContentWrapper} {
      width: 100%;
    }
    ${CardImage} {
      width: 100%;
      height: 120px;
    }
  `,
};

// 카드 하나를 감싸는 전체 컨테이너
export const CardContainer = styled.div`
  display: flex;
  background: var(--color-base-white);
  gap: 12px;

  /* variant prop에 따라 다른 스타일 블록을 적용 */
  ${({ variant }) => variants[variant]}
`;

// "도봉구", "시설" 같은 뱃지가 들어갈 영역
export const BadgeWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 4px;
  flex-wrap: wrap;
`;

// 카드 제목
export const Title = styled.h3`
  font-size: var(--Body-md-font-size);
  color: var(--color-text-primary);
  font-weight: 600;
  margin: 0;
  white-space: normal;
`;

// 날짜
export const Date = styled.p`
  font-size: var(--Body-sm-font-size);
  color: var(--color-text-secondary);
  margin: 0;
`;