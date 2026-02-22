import * as S from "./DisableToastStyle";

/**
 * 활성화되지 않은 기능에 대한 토스트 메시지 컴포넌트
 * @param {object} props
 * @param {boolean} props.isVisible - 토스트 메시지의 표시 여부
 */
export default function DisableToast({ isVisible }) {
  return (
    <S.ToastContainer $isVisible={isVisible}>
      <S.CheckIcon />
      <S.TextBox>
        <S.TextTitle>추후 개발 예정이에요</S.TextTitle>
        <S.TextContent>도봉구, 종로구만 선택이 가능해요</S.TextContent>
      </S.TextBox>
    </S.ToastContainer>
  );
}
