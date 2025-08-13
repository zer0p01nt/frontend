import * as S from "./MoreBtnStyle";
import MoreIcon from "../../assets/chev-right.svg";

export default function MoreBtn({ value, onClick }) {
  return (
    <S.Btn onClick={onClick}>
      <span>{value}</span>
      <img src={MoreIcon} />
    </S.Btn>
  );
}
