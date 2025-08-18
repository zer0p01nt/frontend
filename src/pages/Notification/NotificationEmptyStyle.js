import styled from "styled-components";
import noti_img from "../../assets/noti_img.png";

export const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 80px;
  width: 100%;
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
  margin-top: 16px;
  margin-bottom: 4px;
`;

export const EmptySubText = styled.p`
  color: var(--color-text-secondary);
  font-size: var(--Body-md-font-size);
  font-weight: 500;
  line-height: var(--Body-md-line-height);
  margin: 0;
`;
