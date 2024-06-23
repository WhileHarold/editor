import * as monaco from "monaco-editor";

const defineCustomTheme = () => {
  monaco.editor.defineTheme("colorBlindFriendlyTheme", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "800080", fontStyle: "italic" }, // 보라색
      { token: "keyword", foreground: "0000FF" }, // 파란색
      { token: "number", foreground: "008080" }, // 청록색
      { token: "string", foreground: "8B4513" }, // 갈색
      { token: "delimiter", foreground: "808080" }, // 회색
      { token: "operator", foreground: "000000" }, // 검은색
      { token: "function", foreground: "FFA500", fontStyle: "bold" }, // 주황색
      { token: "variable", foreground: "808080" }, // 회색
    ],
    colors: {
      "editor.foreground": "#000000", // 검은색
      "editor.background": "#FFFFFF", // 흰색
      "editorCursor.foreground": "#000000", // 검은색
      "editor.lineHighlightBackground": "#F0F0F0", // 밝은 회색
      "editorLineNumber.foreground": "#A9A9A9", // 어두운 회색
      "editor.selectionBackground": "#ADD8E6", // 연한 청색
      "editor.inactiveSelectionBackground": "#ADD8E6", // 연한 청색
      "editor.selectionHighlightBackground": "#FFD70030", // 연한 황색
      "editor.wordHighlightBackground": "#FF00FF30", // 연한 스카이블루
      "editor.findMatchBackground": "#FFA50030", // 연한 주황색
      "editor.findMatchHighlightBackground": "#00BFFF30", // 연한 청색
      "editor.hoverHighlightBackground": "#87CEFA30", // 연한 라이트 스카이블루
      "editorLink.activeForeground": "#1E90FF", // 파란색
      "editor.rangeHighlightBackground": "#1E90FF20", // 연한 파란색
      "editorWhitespace.foreground": "#BEBEBE", // 밝은 회색
      "editorIndentGuide.background": "#D3D3D3", // 연한 회색
      "editorIndentGuide.activeBackground": "#A9A9A9", // 어두운 회색
    },
  });
};

export default defineCustomTheme;
