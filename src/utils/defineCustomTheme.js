// Monaco Editor를 사용하여 사용자 정의 테마를 정의하는 함수
const defineCustomTheme = (monacoInstance) => {
  console.log("Defining custom theme"); // 로그 추가: 사용자 정의 테마를 정의 중임을 알림

  // 사용자 정의 테마 정의
  monacoInstance.editor.defineTheme("colorBlindFriendlyTheme", {
    base: "vs", // 기본 테마는 "vs"를 상속받음
    inherit: true, // 상위 테마의 설정을 상속받음

    // 특정 토큰에 대한 색상 및 스타일 규칙
    rules: [
      { token: "comment", foreground: "#8A2BE2", fontStyle: "italic" }, // 주석: 보라색, 이탤릭
      { token: "keyword", foreground: "#483D8B" }, // 키워드: 다크 슬레이트 블루
      { token: "number", foreground: "#8B0000" }, // 숫자: 다크 레드
      { token: "string", foreground: "#00008B" }, // 문자열: 다크 블루, 이탤릭
      { token: "delimiter", foreground: "#2F4F4F" }, // 구분자: 다크 슬레이트 그레이
      { token: "operator", foreground: "#FF8C00" }, // 연산자: 다크 오렌지
      { token: "function", foreground: "#8B008B" }, // 함수: 다크 마젠타
      { token: "variable", foreground: "#9932CC" }, // 변수: 다크 오키드
    ],

    // 에디터 UI 요소의 색상
    colors: {
      "editor.foreground": "#000000", // 텍스트: 검은색
      "editor.background": "#FFFFFF", // 배경: 흰색
      "editorCursor.foreground": "#000000", // 커서: 검은색
      "editor.lineHighlightBackground": "#ADD8E6", // 현재 줄 하이라이트: 연한 파란색
      "editorLineNumber.foreground": "#000000", // 라인 번호: 검은색
      "editor.selectionBackground": "#D3D3D3", // 선택 영역: 밝은 회색
      "editor.inactiveSelectionBackground": "#D3D3D3", // 비활성 선택 영역: 밝은 회색
      "editor.selectionHighlightBackground": "#4682B4", // 선택 강조: 스틸 블루
      "editor.wordHighlightBackground": "#4682B4", // 단어 강조: 스틸 블루
      "editor.findMatchBackground": "#FFA07A", // 찾기 일치: 라이트 살몬
      "editor.findMatchHighlightBackground": "#FF6347", // 찾기 일치 강조: 토마토
      "editor.hoverHighlightBackground": "#FFA07A", // 호버 강조: 라이트 살몬
      "editorLink.activeForeground": "#BA55D3", // 활성 링크: 미디엄 오키드
      "editor.rangeHighlightBackground": "#9370DB", // 범위 강조: 미디엄 퍼플
      "editorWhitespace.foreground": "#A9A9A9", // 공백 문자: 어두운 회색
      "editorIndentGuide.background": "#D3D3D3", // 들여쓰기 가이드: 밝은 회색
      "editorIndentGuide.activeBackground": "#A9A9A9", // 활성 들여쓰기 가이드: 어두운 회색
    },
  });
};

export default defineCustomTheme; // 함수 내보내기
