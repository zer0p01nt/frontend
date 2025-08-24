import styled, { css } from "styled-components";

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const CardImage = styled.div`
  flex-shrink: 0;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  background: ${({ $hasRealImage }) =>
    $hasRealImage
      ? "transparent"
      : "linear-gradient(180deg, #e2ebff 85.04%, var(--color-pink-50, #ffeefe) 111.61%)"};

  img {
    ${({ $hasRealImage }) =>
      $hasRealImage
        ? css`
            width: 100%;
            height: 100%;
            object-fit: cover;
          `
        : css`
            max-width: 65%;
            max-height: 65%;
            object-fit: contain;
          `}
  }
`;

export const UnreadMark = styled.div`
  width: 6px;
  height: 6px;
  background-color: var(--color-blue-400-main);
  border-radius: 50%;
  margin-left: 8px;
`;

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

export const BadgeWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 12px;
`;

const variants = {
  list: css`
    ${baseListStyles}
    padding: 12px 8px;
  `,
  notification: css`
    ${baseListStyles}
    padding: 12px 24px;
  `,
  recommend: css`
    // 새로운 variant 추가
    ${baseListStyles}
    padding: 12px 0px; // 좌우 패딩 제거
  `,
  card: css`
    display: flex;
    flex-direction: column;
    width: 210px;
    padding: 10px 8px;
    gap: 8px;
    flex-shrink: 0;
    border-radius: var(--border-radius-2xl);

    ${BadgeWrapper} {
      flex-wrap: wrap;
      margin-bottom: 0;
    }

    ${CardImage} {
      width: 100%;
      height: 100px;

      img {
        ${({ $hasRealImage }) =>
          !$hasRealImage &&
          css`
            max-width: 80%;
            max-height: 50%;
          `}
      }
    }

    ${ContentWrapper} {
      width: 100%;
      gap: 4px;
    }
  `,
};

export const CardContainer = styled.div`
  display: flex;
  background: var(--color-base-white);
  ${({ $variant }) => variants[$variant]}
  cursor: pointer;
`;

export { ContentWrapper, CardImage };

export const Title = styled.h3`
  font-size: var(--Body-md-font-size);
  color: var(--color-text-primary);
  font-weight: 600;
  margin: 0;
  white-space: normal;
  margin-bottom: 5px;
  display: flex;
  align-items: center;

  ${({ $variant }) =>
    $variant === "card" &&
    css`
      line-height: 1.4;
      height: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      margin-bottom: 0;
    `}
`;

export const Date = styled.p`
  font-size: var(--Body-sm-font-size);
  color: var(--color-text-secondary);
  font-weight: 400;
  line-height: 18px;
  margin: 0;
`;
