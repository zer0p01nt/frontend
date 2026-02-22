import * as S from "./ShareToastStyle";

/**
 * 공유하기 완료 시 나타나는 토스트 컴포넌트
 * @param {object} props
 * @param {boolean} props.isVisible - 토스트가 보이는지 여부
 * @param {string} props.title - 토스트 제목
 * @param {string} props.content - 토스트 내용
 */
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
