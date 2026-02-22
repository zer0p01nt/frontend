import * as S from "./ButtonStyle";

/**
 * 필터 등의 버튼 컴포넌트
 * @param {object} props
 * @param {String} props.label - 버튼 안에 들어갈 텍스트
 * @param {boolean} props.checked - 버튼의 선택 상태
 * @param {Function} props.onChange - 버튼 클릭 시 선택 상태를 바꾸는 함수
 */
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
