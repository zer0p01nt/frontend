import styled from "styled-components";

export const NavContainer = styled.div`
  border-top: 1px solid var(--color-neutral-tertiary);
  display: flex;
  padding: 6px 16px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 393px;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--color-base-white);

  z-index: 100;
`;

export const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 17.3%;
  max-width: 68px;
  gap: 4px;
  flex-shrink: 0;
  color: ${({ selected }) =>
    selected
      ? "var(--color-neutral-brand-primary)"
      : "var(--color-neutral-secondary)"};
  font-size: var(--Body-sm-font-size);
  font-weight: 600;
  text-align: center;
  line-height: var(--Body-sm-line-height);
  cursor: pointer;
`;

export const NavIcon = styled.div`
  width: 24px;
  height: 24px;
  aspect-ratio: 1/1;
  background-image: url(${({ $icon }) => $icon});
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
`;
