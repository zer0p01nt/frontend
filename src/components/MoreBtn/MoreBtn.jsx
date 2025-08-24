import * as S from "./MoreBtnStyle";
import MoreIcon from "../../assets/chev-right.svg";
import MyPageMore from "../../assets/MyPageMore.svg"

export default function MoreBtn({ value, onClick, atMyPage = false }) {
  return (
    <S.Btn onClick={onClick} $atMyPage={atMyPage}>
      <span>{value}</span>
      <img src={atMyPage ? MyPageMore : MoreIcon} />
    </S.Btn>
  );
}
