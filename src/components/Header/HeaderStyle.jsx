import styled from "styled-components";
import backIcon from "../../assets/Header/chev-left.svg";
import scrapTrue from "../../assets/Header/bookmark_true.svg";
import scrapFalse from "../../assets/Header/bookmark_false.svg";

export const HeaderContainer = styled.div`
  width: 100%;
  max-width: 393px;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--color-base-white);
  display: grid;
  padding: 6px 24px;
  align-items: center;
  /* BackBtn, ScrapBtn 여부에 따른 레이아웃 변동 */
  grid-template-columns: ${({ $hasBack, $hasScrap }) => {
    const cols = [];
    if ($hasBack) cols.push('24px');
    cols.push('1fr');
    if ($hasScrap) cols.push('24px');
    return cols.join(' ');
  }};
`;

export const HeaderBack = styled.button`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  background-image: url(${backIcon});
  background-repeat: no-repeat;
`;

export const HeaderTitle = styled.div`
  min-width: 0;
  width: 100%;
  color: var(--color-base-black);
  overflow: hidden;
  white-space: nowrap;  
  text-overflow: ellipsis;
  font-size: var(--Heading-xl-font-size);
  font-weight: 700;
  line-height: var(--Heading-xl-line-height);
  letter-spacing: var(--letter-spacing);
  text-align: center;
`;

export const HeaderScrap = styled.button`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  background-image: url(${({ $isScrap }) => ($isScrap ? scrapTrue : scrapFalse)});
  background-repeat: no-repeat;
`;
