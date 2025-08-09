import * as S from "./SearchInputFieldStyle";

// 현재 값, 값이 바뀔 때 적용하는 함수, submit 함수를 prop으로 받음
export default function SearchInputField({ value, onChange, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // event 막음
    onSubmit?.(value.trim());
    // 현재 값에 대해 submit 함수 실행
  };
  return (
    <>
      <S.SearchInputForm onSubmit={handleSubmit}>
        <S.SearchInput
          placeholder='필요한 정보가 있으신가요?'
          value={value}
          onChange={onChange}
        />
        <S.SearchBtn />
      </S.SearchInputForm>
    </>
  );
}
