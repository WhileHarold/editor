// Monaco Editor를 사용하여 사용자 정의 테마를 정의하는 함수
const defineCustomTheme = (monacoInstance) => {
  console.log("Defining custom theme"); // 로그 추가: 사용자 정의 테마를 정의 중임을 알림

  // 사용자 정의 테마 정의
  monacoInstance.editor.defineTheme("colorBlindFriendlyTheme", {
    base: "vs-dark", // 기본 테마는 "vs-dark"를 상속받음
    inherit: true, // 상위 테마의 설정을 상속받음

    // 특정 토큰에 대한 색상 및 스타일 규칙
    rules: [
      { token: "comment", foreground: "#800080", fontStyle: "italic" }, // 주석: 보라색, 이탤릭
      { token: "keyword", foreground: "#0000FF", fontStyle: "bold" }, // 키워드: 파란색, 볼드
      { token: "number", foreground: "#000000", fontStyle: "bold" }, // 숫자: 검은색, 볼드
      { token: "string", foreground: "#8B4513", fontStyle: "bold" }, // 문자열: 갈색, 볼드
      { token: "delimiter", foreground: "#808080", fontStyle: "bold" }, // 구분자: 회색, 볼드
      { token: "operator", foreground: "#000000", fontStyle: "bold" }, // 연산자: 검은색, 볼드
      { token: "function", foreground: "#FFA500", fontStyle: "bold" }, // 함수: 주황색, 볼드
      { token: "variable", foreground: "#808080", fontStyle: "bold" }, // 변수: 회색, 볼드
    ],

    // 에디터 UI 요소의 색상
    colors: {
      "editor.foreground": "#000000", // 텍스트: 검은색
      "editor.background": "#FFFFFF", // 배경: 흰색
      "editorCursor.foreground": "#FF0000", // 커서: 빨간색
      "editor.lineHighlightBackground": "#000000", // 현재 줄 하이라이트: 검은색
      "editorLineNumber.foreground": "#000000", // 라인 번호: 검은색
      "editor.selectionBackground": "#0000FF", // 선택 영역: 파란색
      "editor.inactiveSelectionBackground": "#0000FF", // 비활성 선택 영역: 파란색
      "editor.selectionHighlightBackground": "#FF0000", // 선택 강조: 빨간색
      "editor.wordHighlightBackground": "#FF0000", // 단어 강조: 빨간색
      "editor.findMatchBackground": "#FFA500", // 찾기 일치: 주황색
      "editor.findMatchHighlightBackground": "#FF0000", // 찾기 일치 강조: 빨간색
      "editor.hoverHighlightBackground": "#FF0000", // 호버 강조: 빨간색
      "editorLink.activeForeground": "#0000FF", // 활성 링크: 파란색
      "editor.rangeHighlightBackground": "#FF0000", // 범위 강조: 빨간색
      "editorWhitespace.foreground": "#000000", // 공백 문자: 검은색
      "editorIndentGuide.background": "#808080", // 들여쓰기 가이드: 회색
      "editorIndentGuide.activeBackground": "#000000", // 활성 들여쓰기 가이드: 검은색
    },
  });
};

export default defineCustomTheme; // 함수 내보내기
