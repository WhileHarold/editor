import React from "react";
import Editor from "@monaco-editor/react";

export default function MainContent({
  file,
  files,
  setFiles,
  fileName,
  executeCode,
}) {
  console.log("MainContent file:", file); // 디버깅용 로그
  return (
    <main
      className="flex-grow flex flex-col overflow-auto"
      style={{ backgroundColor: "#FAFFF9" }}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-300">
        <span>{fileName}</span>
        <button
          className="text-white py-2 px-4 rounded"
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
          theme="vs-dark"
          onChange={(value) => {
            console.log("Editor onChange value:", value); // 디버깅용 로그
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
