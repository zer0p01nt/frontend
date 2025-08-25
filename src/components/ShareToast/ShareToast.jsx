import * as S from "./ShareToastStyle";

export default function ShareToast({ isVisible, title, content }) {
  return (
    <S.ToastContainer $isVisible={isVisible}>
      <S.CheckIcon />
      <S.TextBox>
        <S.TextTitle>{title}</S.TextTitle>
        <S.TextContent>{content}</S.TextContent>
      </S.TextBox>
    </S.ToastContainer>
  );
}
