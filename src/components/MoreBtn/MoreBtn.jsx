import * as S from "./MoreBtnStyle";

import MoreIcon from "../../assets/chev-right.svg";
import MyPageMore from "../../assets/MyPageMore.svg";

/**
 * 홈 화면 및 마이페이지에서 사용되는 더보기 버튼 컴포넌트
 * @param {object} props
 * @param {string} props.value - 버튼에 표시될 텍스트
 * @param {Function} props.onClick - 버튼 클릭 시 호출되는 함수
 * @param {boolean} props.atMyPage - 마이페이지에서 사용되는 경우 true (기본값 false)
 */
export default function MoreBtn({ value, onClick, atMyPage = false }) {
  return (
    <S.Btn onClick={onClick} $atMyPage={atMyPage}>
      <span>{value}</span>
      <img src={atMyPage ? MyPageMore : MoreIcon} />
    </S.Btn>
  );
}
