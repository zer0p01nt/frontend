import * as S from "./ButtonStyle";

// 각 버튼이 3개의 prop을 받습니다
// label : 버튼의 내부 텍스트
// checked : 선택 상태
// onChange : 버튼 누를 때 실행될 함수
export default function Button({ label, checked, onChange }) {
  return (
    <>
      <S.HiddenLabel>
        <S.HiddenCheckbox
          type='checkbox'
          checked={checked}
          onChange={onChange}
        />
        <S.SelectedBtnContainer $checked={checked}>
          {label}
        </S.SelectedBtnContainer>
      </S.HiddenLabel>
    </>
  );
}
