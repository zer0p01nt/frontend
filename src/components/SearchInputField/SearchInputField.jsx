import * as S from "./SearchInputFieldStyle";

// 현재 값, 값이 바뀔 때 적용하는 함수, submit 함수를 prop으로 받음
export default function SearchInputField({
  value,
  onChange,
  onSubmit,
  placeholder,
  border = "blue",
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // event 막음
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
