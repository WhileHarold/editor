import * as monaco from "monaco-editor";

const defineCustomTheme = () => {
  console.log("Defining custom theme"); // 로그 추가
  monaco.editor.defineTheme("colorBlindFriendlyTheme", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "#800080", fontStyle: "italic" },
      { token: "keyword", foreground: "#0000FF", fontStyle: "bold" },
      { token: "number", foreground: "#000000", fontStyle: "bold" },
      { token: "string", foreground: "#8B4513", fontStyle: "bold" },
      { token: "delimiter", foreground: "#808080", fontStyle: "bold" },
      { token: "operator", foreground: "#000000", fontStyle: "bold" },
      { token: "function", foreground: "#FFA500", fontStyle: "bold" },
      { token: "variable", foreground: "#808080", fontStyle: "bold" },
    ],
    colors: {
      "editor.foreground": "#000000",
      "editor.background": "#FFFFFF",
      "editorCursor.foreground": "#000000",
      "editor.lineHighlightBackground": "#D3D3D3",
      "editorLineNumber.foreground": "#696969",
      "editor.selectionBackground": "#4682B4",
      "editor.inactiveSelectionBackground": "#4682B4",
      "editor.selectionHighlightBackground": "#FFD700",
      "editor.wordHighlightBackground": "#FF00FF",
      "editor.findMatchBackground": "#FFA500",
      "editor.findMatchHighlightBackground": "#1E90FF",
      "editor.hoverHighlightBackground": "#1E90FF",
      "editorLink.activeForeground": "#1E90FF",
      "editor.rangeHighlightBackground": "#1E90FF",
      "editorWhitespace.foreground": "#696969",
      "editorIndentGuide.background": "#A9A9A9",
      "editorIndentGuide.activeBackground": "#696969",
    },
  });
};

export default defineCustomTheme;
