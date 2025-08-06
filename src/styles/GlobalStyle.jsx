import { createGlobalStyle } from "styled-components";

// 추후 모바일 환경 관련 Global css 추가 필요
const GlobalStyle = createGlobalStyle`
  html {
  box-sizing: border-box;
  }

  body {
  margin: 0;
  padding: 0;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  ol, ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  a, button {
    cursor: pointer;
  }

  a, button, input, textarea {
    /* 클릭하면 배경 파래지는 거 수정 */
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    outline: none;
  }
`;

export default GlobalStyle;
