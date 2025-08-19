import styled from "styled-components";

export const ProfileContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 393px;
  flex-direction: column;
  gap: 36px;
  padding: 42px 24px 0;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SectionTitle = styled.div`
  display: flex;
  padding: 12px 0;
  align-items: center;
  gap: 10px;
  color: var(--color-base-black);
  font-size: var(--Heading-lg-font-size);
  font-weight: 700;
  line-height: var(--Heading-lg-line-height);
  letter-spacing: var(--letter-spacing);
`;

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SectionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const MiniTitle = styled.div`
  color: var(--color-base-black);
  font-size: var(--Body-md-font-size);
  font-weight: 600;
  line-height: var(--Body-md-line-height);
`;

export const MiniContent = styled.div`
  color: var(--color-text-secondary);
  font-size: var(--Body-md-font-size);
  font-weight: 400;
  line-height: var(--Body-md-line-height);
`;

export const DetailBox = styled.div`
  display: flex;
  gap: 14px;

  & > div {
    width: calc(50% - 14px);
  }
`;

export const InterestContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export const ContentBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const SearchBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin-top: 16px;
`;

export const SearchResultBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SearchResult = styled.div`
  display: flex;
  padding: 12px 8px;
  align-items: center;
  gap: 16px;
  width: 100%;
  justify-content: space-between;
`;

export const ResultTitle = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  color: var(--color-base-black);
  text-overflow: ellipsis;
  font-size: var(--Body-md-font-size);
  font-weight: 600;
  line-height: var(--Body-md-line-height);
`;

export const DetailTitle = styled.div`
  width: 100%;
  display: flex;
  padding: 12px 0;
  justify-content: space-between;
  align-items: center;

  div {
    color: var(--color-base-black);
    font-size: var(--Heading-md-font-size);
    font-weight: 600;
    line-height: var(--Heading-md-line-height);
    letter-spacing: var(--letter-spacing);

    div {
      color: var(--color-neutral-secondary);
      font-size: var(--Body-md-font-size);
      font-weight: 400;
      line-height: var(--Body-md-line-height);
    }
  }

  button {
    display: flex;
    padding: 8px 0;
    align-items: center;
    color: var(--color-text-secondary);
    font-size: var(--Body-sm-font-size);
    font-weight: 400;
    line-height: var(--Body-sm-line-height);
  }
`;

export const BtnList = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const OpenBtnList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

export const SelectedList = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  flex-wrap: wrap;
`;

export const UnSelectedList = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  flex-wrap: wrap;
`;
