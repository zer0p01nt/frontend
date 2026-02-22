import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./NavigatorStyle";
import { navItems } from "./NavigatorIcons";

export default function Navigator() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <S.NavContainer>
      {navItems.map((item) => {
        const isSelected = location.pathname === item.path;
        return (
          <S.NavItem
            key={item.key}
            selected={isSelected}
            onClick={() => navigate(item.path)}
          >
            <S.NavIcon
              $icon={item.icons[isSelected.toString()]}
              selected={isSelected}
            />
            <span>{item.label}</span>
          </S.NavItem>
        );
      })}
    </S.NavContainer>
  );
}
