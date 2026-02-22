import { useRef, useState } from "react";
import * as S from "./ChatbotInputFieldStyle";

/**
 * 챗봇 컴포넌트 내 입력 필드 컴포넌트
 * @param {object} props
 * @param {boolean} props.$isLoading - 챗봇 입력 필드 로딩 상태
 * @param {Function} props.onSubmit - 입력된 메시지를 처리하는 함수
 */
export default function ChatbotInputField({ $isLoading, onSubmit }) {
  const defaultPlaceholder = "궁금한 건 뭐든 물어보세요";
  const [placeholder, setPlaceholder] = useState(defaultPlaceholder);
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  // focus 시 placeholder
  const handleFocus = () => {
    if (!$isLoading) setPlaceholder("");
  };

  // focus 해제 시 placeholder
  const handleBlur = () => {
    if (!$isLoading) {
      setPlaceholder(defaultPlaceholder);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = value.trim();
    if (!msg || $isLoading) return;
    onSubmit?.(msg);
    setValue("");
    setPlaceholder(defaultPlaceholder);
    inputRef.current?.blur();
  };

  return (
    <S.ChatbotInputForm onSubmit={handleSubmit}>
      <S.ChatbotInputField
        placeholder={$isLoading ? "정보를 정리하고 있어요..." : placeholder}
        readOnly={$isLoading}
        onChange={(e) => setValue(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        required
      />
      <S.ChatbotBtn type='submit' $isLoading={$isLoading}></S.ChatbotBtn>
    </S.ChatbotInputForm>
  );
}
