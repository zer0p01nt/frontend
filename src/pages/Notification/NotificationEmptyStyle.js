import styled from "styled-components";
import noti_img from "../../assets/noti_img.png";

export const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* ▼▼▼ 화면의 높이를 기준으로 중앙 정렬되도록 수정 ▼▼▼ */
  height: calc(100vh - 150px); /* 헤더, 카테고리바 등의 높이를 제외 */
`;

export const EmptyIcon = styled.div`
  width: 159px;
  height: 163px;
  background-image: url(${noti_img});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export const EmptyText = styled.p`
  color: var(--color-base-black);
  font-size: var(--Heading-lg-font-size);
  font-weight: 700;
  line-height: var(--Heading-lg-line-height);
  margin-top: 12px;
  margin-bottom: 4px;
`;

export const EmptySubText = styled.p`
  color: var(--color-text-secondary);
  font-size: var(--Body-md-font-size);
  font-weight: 500;
  line-height: var(--Body-md-line-height);
  margin: 0;
`;