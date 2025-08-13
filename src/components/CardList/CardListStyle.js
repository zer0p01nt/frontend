import styled, { css } from "styled-components";

// 공통으로 사용할 스타일 컴포넌트를 먼저 정의
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
`;

const CardImage = styled.div`
  flex-shrink: 0;
  border-radius: var(--border-radius-md);
  background-color: var(--color-neutral-200);
  background-image: url(${({ $img }) => $img});
`;

// variant에 따라 다른 스타일을 적용하기 위한 css 헬퍼
const variants = {
  // 밑줄 스타일 (기본값)
  list: css`
    padding: 16px 8px;
    border-bottom: 1px solid var(--color-neutral-200);
    flex-direction: row;
    align-items: center;
    gap: 16px;

    ${ContentWrapper} {
      flex: 1;
      min-width: 0;
    }
    ${CardImage} {
      width: 72px;
      height: 72px;
      order: 2;
    }
  `,
  // 카드 스타일 (가로 스크롤용)
  card: css`
    padding: 10px 8px;
    border-radius: var(--border-radius-lg);
    width: 210px; /* 사용자가 지정한 너비 */
    flex-shrink: 0; /* 카드가 찌그러지지 않고 지정한 너비를 유지하도록 함 */
    flex-direction: column;

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
  ${({ $variant }) => variants[$variant]}
`;

// 위에서 정의한 스타일 컴포넌트들을 export
export { ContentWrapper, CardImage };

export const BadgeWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 4px;
  flex-wrap: wrap;
`;

export const Title = styled.h3`
  font-size: var(--Body-md-font-size);
  color: var(--color-text-primary);
  font-weight: 600;
  margin: 0;
  white-space: normal;
`;

export const Date = styled.p`
  font-size: var(--Body-sm-font-size);
  color: var(--color-text-secondary);
  margin: 0;
`;
