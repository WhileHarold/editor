import React from "react";
import Editor from "@monaco-editor/react";

export default function MainContent({
  file,
  files,
  setFiles,
  fileName,
  executeCode,
}) {
  const handleEditorChange = (value) => {
    const newFiles = {
      ...files,
      [fileName]: { ...files[fileName], value },
    };
    setFiles(newFiles);
  };

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
          onChange={handleEditorChange}
        />
      </div>
    </main>
  );
}
