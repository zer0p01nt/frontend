import styled, { css } from "styled-components";

// 공통으로 사용할 스타일 컴포넌트를 먼저 정의
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const CardImage = styled.div`
  flex-shrink: 0;
  border-radius: var(--border-radius-md);
  background-color: var(--color-neutral-200);
  background-image: url(${({ $img }) => $img});
`;

const variants = {
  list: css`
    padding: 12px 8px;
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
  card: css`
    padding: 10px 8px;
    border-radius: var(--border-radius-lg);
    width: 210px;
    flex-shrink: 0;
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

export const CardContainer = styled.div`
  display: flex;
  background: var(--color-base-white);
  gap: 12px;
  /* variant prop에 따라 다른 스타일 블록을 적용 */
  ${({ $variant }) => variants[$variant]}
`;

export { ContentWrapper, CardImage };

export const BadgeWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 12px;
`;

export const Title = styled.h3`
  font-size: var(--Body-md-font-size);
  color: var(--color-text-primary);
  font-weight: 600;
  margin: 0;
  white-space: normal;
  margin-bottom: 5px;
`;

export const Date = styled.p`
  font-size: var(--Body-sm-font-size);
  color: var(--color-text-secondary);
  font-weight: 400;
  line-height: 18px;
  margin: 0;
`;
