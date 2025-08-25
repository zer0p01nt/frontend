import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  background: var(--color-base-white);
  padding: 12px 24px;
  gap: 16px;
  align-items: center;
  border-bottom: 0.5px solid var(--color-neutral-200);
  cursor: pointer;

  &:active {
    background-color: var(--color-neutral-100);
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex: 1;
  min-width: 0;
`;

export const BadgeWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
`;

export const Title = styled.h3`
  font-size: var(--Body-md-font-size);
  color: var(--color-text-primary);
  font-weight: 600;
  margin: 0 0 5px 0;
  white-space: normal;
`;

export const Date = styled.p`
  font-size: var(--Body-sm-font-size);
  color: var(--color-text-secondary);
  font-weight: 400;
  line-height: 18px;
  margin: 0;
`;

export const CardImage = styled.div`
  width: 72px;
  height: 72px;
  flex-shrink: 0;
  border-radius: var(--border-radius-md);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

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
