import { createGlobalStyle } from "styled-components";

// 추후 모바일 환경 관련 Global css 추가 필요
const GlobalStyle = createGlobalStyle`
  :root {
    // Text Styles
    // font-size
    --Heading-xl-font-size: 20px;
    --Heading-lg-font-size: 18px;
    --Heading-md-font-size: 16px;
    --Heading-sm-font-size: 14px;
    --Body-lg-font-size: 16px;
    --Body-md-font-size: 14px;
    --Body-sm-font-size: 12px;

    // line-height
    --Heading-xl-line-height: 30px;
    --Heading-lg-line-height: 27px;
    --Heading-md-line-height: 24px;
    --Heading-sm-line-height: 21px;
    --Body-lg-line-height: 24px;
    --Body-md-line-height: 21px;
    --Body-sm-line-height: 18px;

    // letter-spacing
    // 0 아니면 이 변수만 씁니다
    --letter-spacing: -0.20000000298023224px;

    // Effect Styles
    --shadow-default: 2px 2px 4px 0 rgba(163, 161, 161, 0.20);

    // Border
    // border-radius
    --border-radius-rounded: 99999px;
    --border-radius-2xl: 16px;
    --border-radius-xl: 12px;
    --border-radius-lg: 8px;
    --border-radius-md: 4px;
    --border-radius-sm: 2px;
    
    // border-width
    --border-width-lg: 4px;
    --border-width-md: 2px;
    --border-width-sm: 1px;

    // Colors
    // 작업 수월하도록 색상 중복되더라도 컬러팔레트 이름에 맞게 다 넣어놨습니다
    --color-base-black: #191919;
    --color-base-white: #fefefe;

    --color-text-danger: #ef4444;
    --color-text-primary: #191919;
    --color-text-primary-brand: #2769ff;
    --color-text-primary-subtitle: #a3a1a1;
    --color-text-secondary: #a3a1a1;
    --color-text-tertiary: #d6d4d4;

    --color-neutral-primary: #fefefe;
    --color-neutral-secondary: #a3a1a1;
    --color-neutral-tertiary: #d6d4d4;
    --color-neutral-brand-primary: #2769ff;
    --color-neutral-brand-sub-pink: #e892fc;
    --color-neutral-brand-sub-teal: #45decf;

    --color-blue-secondary: #bbd2ff;
    --color-pink-secondary: #fbd5ff;
    --color-teal-secondary: #b0fff6;

    --color-blue-50:#e2ebff;
    --color-blue-100: #bbd2ff;
    --color-blue-200: #7dabfe;
    --color-blue-300: #4F84ff;
    --color-blue-400-main: #2769ff;
    --color-blue-500: #1a50f2;
    --color-blue-600: #0e3fe0;
    --color-blue-700: #0229c3;
    --color-blue-800: #0c14a0;
    --color-blue-900: #030e72;

    --color-neutral-50: #fefefe;
    --color-neutral-100: #f4f1f1;
    --color-neutral-200: #e5e2e2;
    --color-neutral-300: #d6d4d4;
    --color-neutral-400: #a3a1a1;
    --color-neutral-500: #737171;
    --color-neutral-600: #555353;
    --color-neutral-700: #403f3f;
    --color-neutral-800: #242424;
    --color-neutral-900: #191919;

    --color-pink-50: #ffeefe;
    --color-pink-100: #fbd5ff;
    --color-pink-200: #f6bdff;
    --color-pink-300: #f0a8ff;
    --color-pink-400-sub: #e892fc;
    --color-pink-500: #d784ee;
    --color-pink-600: #bc58e3;
    --color-pink-700: #9839c4;
    --color-pink-800: #791aa2;
    --color-pink-900: #5c0681;

    --color-teal-50: #dcfff9;
    --color-teal-100: #b0fff6;
    --color-teal-200: #7bfef1;
    --color-teal-300: #57eedf;
    --color-teal-400-sub: #45decf;
    --color-teal-500: #22d4c2;
    --color-teal-600: #00c4b7;
    --color-teal-700: #00a1a1;
    --color-teal-800: #006770;
    --color-teal-900: #003a48;
  }

  html {
    box-sizing: border-box;
    /* 스크롤 안 보이게 하는 설정  : 이 부분만 주석처리 해주시면 됩니다! */
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  html::-webkit-scrollbar {
    display: none;
  }

  body {
    margin: 0;
    padding: 0;
    background-color: var(--color-base-white);
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
    /* 클릭하면 배경 파래지는 거 수정 */
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    outline: none;
  }

  ol, ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  a, button {
    cursor: pointer;
  }

  input, button {
    margin: 0;
    padding: 0;
    border: none;
    background-color: transparent;
  }
`;

export default GlobalStyle;
