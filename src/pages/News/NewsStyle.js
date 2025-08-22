// src/pages/News/NewsStyle.js

import styled, { css } from "styled-components";
import { dummyImages } from "../../constants/dummyImages";
import { BadgeContainer } from "../../components/Badge/BadgeStyle";

export const NewsContainer = styled.div`
  padding-top: 42px;
`;


export const TopSection = styled.div`
  position: relative;
  z-index: 20;
  background-color: var(--color-base-white);
`;


export const ListSection = styled.div`
  position: relative;
  z-index: 15;
  background-color: var(--color-base-white);
`;

export const BannerSection = styled.section`
  position: relative;
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
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  width: auto;
  min-width: 100%;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const BannerSlide = styled.div`
  flex: 0 0 100%;
  min-width: 100%;
  scroll-snap-align: start;
  height: 100%;
  padding: 16px 24px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 8px;

  ${BadgeContainer} {
    color: var(--color-base-black);
  }

  ${({ $image, $type }) =>
    $image
      ? css`
          background: linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.2),
              rgba(0, 0, 0, 0.2)
            ),
            url(${$image}) center no-repeat;
          background-size: cover;
        `
      : css`
          background-image: url(${$type ? dummyImages[$type] : "transparent"}),
            linear-gradient(
              180deg,
              #e2ebff 85.04%,
              var(--color-pink-50, #ffeefe) 111.61%
            );
          background-repeat: no-repeat;
          background-position: center 66%, center;
          background-size: 80px, cover;
        `}
`;

export const BadgeWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

export const SlideTitle = styled.h3`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 50px;
  color: var(--color-base-black);
  font-size: var(--Heading-md-font-size);
  font-weight: 600;
  margin: 0;
`;

export const Pager = styled.div`
  position: absolute;
  bottom: 16px;
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

export const FilterWrapper = styled.div`
  position: relative;
  z-index: 20;
`;