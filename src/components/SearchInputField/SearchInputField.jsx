import * as S from "./SearchInputFieldStyle";

/**
 * 검색 페이지 입력창 필드 컴포넌트
 * @param {object} props
 * @param {string} props.value - 입력창의 현재 값
 * @param {Function} props.onChange - 입력값이 변경될 때 호출되는 함수
 * @param {Function} props.onSubmit - 입력값이 제출될 때 호출되는 함수
 * @param {string} props.placeholder - 입력창에 표시될 placeholder 텍스트
 * @param {string} props.border - 입력창의 테두리 색상 (기본값: 'blue')
 */
export default function SearchInputField({
  value,
  onChange,
  onSubmit,
  placeholder,
  border = "blue",
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(value.trim());
    // 현재 값에 대해 submit 함수 실행
  };
  return (
    <>
      <S.SearchInputForm $border={border} onSubmit={handleSubmit}>
        <S.SearchInput
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <S.SearchBtn type='submit' />
      </S.SearchInputForm>
    </>
  );
}
