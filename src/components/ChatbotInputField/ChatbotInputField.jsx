import { useState } from 'react';
import * as S from "./ChatbotInputFieldStyle";

export default function ChatbotInputField({ $isLoading }) {
  const defaultPlaceholder = "궁금한 건 뭐든 물어보세요"
  const [placeholder, setPlaceholder] = useState(defaultPlaceholder);
  // const [value, setValue] = useState("");

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

  // value 관련 로직 추가 필요

  return (
    <S.ChatbotInputForm>
      <S.ChatbotInputField placeholder={$isLoading ? "정보를 정리하고 있어요..." : placeholder} disabled={$isLoading} onFocus={handleFocus} onBlur={handleBlur} />
      <S.ChatbotBtn $isLoading={$isLoading}></S.ChatbotBtn>
    </S.ChatbotInputForm>
  );
}
