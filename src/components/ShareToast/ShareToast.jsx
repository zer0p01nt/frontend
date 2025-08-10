import * as S from "./ShareToastStyle";

export default function ShareToast() {
  return (
    <S.ToastContainer>
      <S.CheckIcon />
      <S.TextBox>
        <S.TextTitle>링크가 복사됐어요!</S.TextTitle>
        <S.TextContent>원하는 곳에 붙여 넣어 공유해 보세요.</S.TextContent>
      </S.TextBox>
    </S.ToastContainer>
  );
}
