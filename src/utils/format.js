const decodeEntities = (() => {
  const ta = document.createElement("textarea");
  return (input) => {
    if (input == null) return "";
    ta.innerHTML = String(input);
    return ta.value;
  };
})();

export function formatText(raw) {
  let s = decodeEntities(raw || "");

  // 개행 정규화
  s = s.replace(/\r\n/g, "\n");

  // HTML 기반 줄바꿈 복원
  s = s
    .replace(/<(br|br\/)\s*>/gi, "\n")
    .replace(/<\/(p|div|li|h[1-6])\s*>/gi, "\n")
    .replace(/<li[^>]*>/gi, "• ");

  // 남은 태그 제거
  s = s.replace(/<[^>]+>/g, "");

  s = s.replace(".", ". ");

  return s.trim();
}
