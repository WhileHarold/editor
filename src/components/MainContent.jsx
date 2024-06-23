import React, { useEffect } from "react";
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
  useEffect(() => {
    console.log("Defining custom theme...");
    defineCustomTheme(monaco);
    console.log("Custom theme defined");
    if (monaco) {
      console.log("Setting custom theme...");
      monaco.editor.setTheme("colorBlindFriendlyTheme");
      console.log("Custom theme set");
    } else {
      console.error("Monaco Editor is not loaded");
    }
  }, []);

  return (
    <main
      className="flex-grow flex flex-col overflow-auto"
      style={{ backgroundColor: "#FAFFF9" }}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-300 mt-2">
        <span>{fileName}</span>
        <button
          className="text-white px-4 rounded "
          style={{ backgroundColor: "#457D61" }}
          onClick={executeCode}
        >
          Run
        </button>
      </div>
      <div className="flex-grow p-4">
        <Editor
          height="100%"
          language={file.language}
          value={file.value}
          theme="colorBlindFriendlyTheme"
          beforeMount={(monacoInstance) => {
            console.log("Before mount");
            defineCustomTheme(monacoInstance);
            console.log("Custom theme defined before mount");
          }}
          onMount={(editor, monacoInstance) => {
            console.log("Editor mounted");
            monacoInstance.editor.setTheme("colorBlindFriendlyTheme");
            console.log("Custom theme set after mount");
          }}
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
