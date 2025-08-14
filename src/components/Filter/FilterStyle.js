import chevUp from "../../assets/Filter/chev-up.svg";
import chevDown from "../../assets/Filter/chev-down.svg";
import styled from "styled-components";

export const ContentContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 393px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: var(--color-base-white);
  box-sizing: border-box;
`;

export const FilterContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 393px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
`;

export const NormalFilterWrapper = styled.div`
  width: 100%;
  max-width: 393px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  flex: 1 0 0;
  overflow-x: auto;
  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const chevronBtn = styled.button`
  background-image: url(${({ $expanded }) => ($expanded ? chevUp : chevDown)});
  width: 24px;
  height: 24px;
  aspect-ratio: 1/1;
  padding: 12px 0;
`;

export const FilterOverlay = styled.div`
  width: 100%;
  max-width: 393px;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 100dvh;
  background-color: rgba(115, 113, 113, 0.4);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  z-index: -1;

  opacity: ${({ $expanded }) => ($expanded ? 1 : 0)};
  pointer-events: ${({ $expanded }) => ($expanded ? "auto" : "none")};
  transition: opacity 180ms ease;
`;

export const DetailFilterWrapper = styled.div`
  display: flex;
  padding: 4px 16px 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
  max-width: 393px;
`;

export const DetailFilter = styled.div`
  width: 100%;
  max-width: 393px;
  display: flex;
  align-items: center;
  gap: 12px;
  overflow-x: auto;
  /* 스크롤바 숨기기 */
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  span {
    box-shadow: none;
  }
`;
