import * as S from "./DisableToastStyle";

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
