import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import defineCustomTheme from "../utils/defineCustomTheme";
import * as monaco from "monaco-editor";

export default function MainContent({
  file,
  files,
  setFiles,
  fileName,
  executeCode,
}) {
  const [isColorBlindMode, setIsColorBlindMode] = useState(false);

  const handleColorBlindModeToggle = () => {
    console.log("Toggling color blind mode"); // 디버깅 메시지
    setIsColorBlindMode((prev) => !prev);
  };

  useEffect(() => {
    if (isColorBlindMode) {
      console.log("Setting custom theme"); // 디버깅 메시지
      defineCustomTheme();
      monaco.editor.setTheme("colorBlindFriendlyTheme");
    } else {
      console.log("Setting default theme"); // 디버깅 메시지
      monaco.editor.setTheme("vs-dark");
    }
  }, [isColorBlindMode]);

  return (
    <main
      className="flex-grow flex flex-col overflow-auto"
      style={{ backgroundColor: "#FAFFF9" }}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-300">
        <span>{fileName}</span>
        <div className="flex space-x-4">
          <button
            className="text-white px-4 rounded"
            style={{ backgroundColor: "#457D61" }}
            onClick={executeCode}
          >
            Run
          </button>
          <button
            className="text-white  px-4 rounded"
            style={{ backgroundColor: "#457D61" }}
            onClick={handleColorBlindModeToggle}
          >
            Color Blind Mode
          </button>
        </div>
      </div>
      <div className="flex-grow p-4">
        <Editor
          height="100%"
          language={file.language}
          value={file.value}
          theme={isColorBlindMode ? "colorBlindFriendlyTheme" : "vs-dark"}
          onChange={(value) => {
            const newFiles = {
              ...files,
              [fileName]: { ...files[fileName], value },
            };
            setFiles(newFiles);
          }}
        />
      </div>
    </main>
  );
}
