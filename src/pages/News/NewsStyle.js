import styled from "styled-components";
import {
  Container as PostCardContainer,
  Title as PostCardTitle,
  Date as PostCardDate,
} from "../../components/PostCard/PostCardStyle";

export const NewsContainer = styled.div`
  padding-top: 42px;
`;

export const BannerSection = styled.section`
  position: relative;
  background: #d9d9d9;
  height: 160px;
  padding: 0;
  margin: 0;
`;

export const SectionTitle = styled.h2`
  font-size: var(--Heading-lg-font-size);
  font-weight: 700;
  margin: 0;
  padding: 16px 24px 8px;
  color: var(--color-base-black);
  background: var(--color-base-white);
`;

export const BannerWrapper = styled.div`
  display: flex;
  height: 100%;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const BannerSlide = styled.div`
  flex: 0 0 100%;
  scroll-snap-align: start;
  height: 100%;
  padding: 20px 24px;
  background: transparent;
  border-radius: 0;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 10px;
`;

export const BadgeWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

export const SlideTitle = styled.h3`
  font-size: var(--Heading-md-font-size);
  color: var(--color-text-primary);
  font-weight: 600;
  margin: 0;
  white-space: normal;
`;

export const Pager = styled.div`
  position: absolute;
  bottom: 20px;
  right: 24px;
  background: rgba(254, 254, 254, 0.4);
  border: 1px solid var(--color-base-white);
  color: var(--color-neutral-secondary);
  padding: 2px 10px;
  line-height: var(--Body-sm-line-height);
  border-radius: var(--border-radius-rounded);
  font-size: var(--Body-sm-font-size);
  font-weight: 500;
`;

export const ContentSection = styled.div`
  position: relative;
  z-index: 15;
  background-color: var(--color-base-white);
`;

export const FilterWrapper = styled.div`
  position: relative;
  z-index: 20;
  transform: translateZ(0);
`;