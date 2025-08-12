import { useState } from 'react';
import * as S from "./ChatbotInputFieldStyle";

export default function ChatbotInputField({ $isLoading, onSubmit }) {
  const defaultPlaceholder = "궁금한 건 뭐든 물어보세요"
  const [placeholder, setPlaceholder] = useState(defaultPlaceholder);
  const [value, setValue] = useState("");

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
    setValue("")
  }

  return (
    <S.ChatbotInputForm onSubmit={handleSubmit}>
      <S.ChatbotInputField placeholder={$isLoading ? "정보를 정리하고 있어요..." : placeholder} disabled={$isLoading} onChange={(e) => setValue(e.target.value)} onFocus={handleFocus} onBlur={handleBlur} value={value} required />
      <S.ChatbotBtn type="submit" $isLoading={$isLoading}></S.ChatbotBtn>
    </S.ChatbotInputForm>
  );
}
