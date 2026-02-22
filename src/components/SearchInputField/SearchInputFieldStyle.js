import styled from "styled-components";
import searchIcon from "../../assets/search.svg";

export const SearchInputForm = styled.form`
  width: 100%;
  // 전체 홈 화면에 좌우 패딩 16px 줄 거 감안하고 width 100%로 줌
  max-width: 362px;
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  border-radius: var(--border-radius-rounded);
  border: ${({ $border }) =>
    $border === "blue"
      ? "0.5px solid var(--color-blue-100);"
      : "0.5px solid var(--color-neutral-secondary)"};
  background-color: var(--color-base-white);
  box-shadow: var(--shadow-default);
  gap: 5px;

  &:focus-within {
    border: 0.5px solid var(--color-blue-400-main);
  }

  transition: border 0.2s ease-in-out;
`;

export const SearchInput = styled.input`
  width: 100%;
  color: var(--color-base-black);
  font-size: var(--Body-md-font-size);
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.1px;
  border: none;

  &::placeholder {
    color: var(--color-text-primary-subtitle);
  }
`;

export const SearchBtn = styled.button`
  width: 24px;
  height: 24px;
  aspect-ratio: 1/1;
  border: none;
  background-color: transparent;
  background-image: url(${searchIcon});
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
`;
