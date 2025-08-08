import * as S from "./NavigatorStyle";
import { navItems } from "./NavigatorIcons";

export default function Navigator() {
  let isSelected = false; // 테스트용

  return (
    <S.NavContainer>
      {navItems.map((item) => (
        <S.NavItem key={item.key} selected={isSelected}>
          <S.NavIcon icon={item.icons[isSelected.toString()]} selected={true} />
          <span>{item.label}</span>
        </S.NavItem>
      ))}
    </S.NavContainer>
  );
}
