import styled from "styled-components";
import backIcon from "../../assets/Header/chev-left.svg";
import scrapTrue from "../../assets/Header/bookmark_true.svg";
import scrapFalse from "../../assets/Header/bookmark_false.svg";
import homeIcon from "../../assets/homeIcon.svg";

export const HeaderContainer = styled.div`
  width: 100%;
  max-width: 393px;
  position: fixed;
  top: 0;
  right: max(calc(50vw - 393px / 2), 0px);
  left: auto;
  background-color: ${({ $scrolled, $isTransparent }) =>
    $isTransparent
      ? $scrolled
        ? "var(--color-blue-400-main)" // 스크롤 시 고정 색 (고정 색은 어떤 색으로?)
        : "transparent"
      : "var(--color-base-white)"}; // 투명 모드 아니면 항상 고정 색
  display: grid;
  padding: ${({ $atHome }) => ($atHome ? "10px 24px" : "6px 24px")};
  align-items: center;
  /* BackBtn, ScrapBtn 여부에 따른 레이아웃 변동 */
  grid-template-columns: ${({ $hasBack, $hasScrap }) => {
    const cols = [];
    if ($hasBack) cols.push("24px");
    cols.push("1fr");
    if ($hasScrap) cols.push("24px");
    return cols.join(" ");
  }};
  z-index: 100;
  color: ${({ $isTransparent }) => $isTransparent ? "var(--color-base-white)" : "var(--color-base-black)"};
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
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: var(--Heading-xl-font-size);
  font-weight: 700;
  line-height: var(--Heading-xl-line-height);
  letter-spacing: var(--letter-spacing);
`;

export const HeaderScrap = styled.button`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  background-image: url(${({ $isScrap }) => $isScrap ? scrapTrue : scrapFalse});
  background-repeat: no-repeat;
`;

export const HomeIcon = styled.div`
  background-image: url(${homeIcon});
  width: 31.145px;
  flex: 1 0 0;
  aspect-ratio: 31.15/22;
`;
