import styled, { css } from "styled-components";

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
`;

export const UnreadMark = styled.div`
  width: 6px;
  height: 6px;
  background-color: var(--color-blue-400-main);
  border-radius: 50%;
  margin-left: 8px;
`;

// ▼▼▼ Title과 Date 정의를 이 위치로 옮겼습니다 ▼▼▼
export const Title = styled.h3`
  font-size: var(--Body-md-font-size);
  color: var(--color-text-primary);
  font-weight: 600;
  margin: 0;
  white-space: normal;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
`;

export const Date = styled.p`
  font-size: var(--Body-sm-font-size);
  color: var(--color-text-secondary);
  font-weight: 400;
  line-height: 18px;
  margin: 0;
`;
// ▲▲▲ 여기까지 ▲▲▲

// 공통 리스트 스타일 
const baseListStyles = css`
  border-bottom: 0.5px solid var(--color-neutral-200);
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
`;

const variants = {
  // 배너를 위한 새로운 variant
  banner: css`
    ${baseListStyles}
    padding: 16px;
    border-radius: var(--border-radius-xl);
    background: rgba(254, 254, 254, 0.40);
    border: 1px solid var(--color-base-white);
    
    border-bottom: none;

    /* 이제 Title이 먼저 정의되었으므로 여기서 사용해도 오류가 나지 않습니다. */
    ${Title} {
      color: var(--color-base-white);
      text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    }
  `,
  // 홈 화면을 위한 기본 list variant
  list: css`
    ${baseListStyles}
    padding: 12px;
  `,
  // 알림 페이지를 위한 notification variant
  notification: css`
    ${baseListStyles}
    padding: 12px 24px;
  `,
  // 기존 card variant
  card: css`
    padding: 10px 8px;
    border-radius: var(--border-radius-lg);
    width: 210px;
    gap: 0px;
    flex-shrink: 0;
    flex-direction: column;

    ${ContentWrapper} {
      width: 100%;
    }
    ${CardImage} {
      width: 100%;
      height: 120px;
      margin-bottom: 12px;
    }
  `,
};

export const CardContainer = styled.div`
  display: flex;
  background: var(--color-base-white);
  gap: 12px;
  ${({ variant }) => variants[variant]}
`;

export { ContentWrapper, CardImage };

export const BadgeWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 12px;
`;