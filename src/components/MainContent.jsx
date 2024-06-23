import React, { useRef, useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import defineCustomTheme from "../utils/defineCustomTheme"; // defineCustomTheme 모듈 경로 수정

export default function MainContent({
  file,
  files,
  setFiles,
  fileName,
  executeCode,
}) {
  const editorRef = useRef(null);
  const monacoRef = useRef(null); // monaco 인스턴스를 저장할 ref
  const [isCustomTheme, setIsCustomTheme] = useState(false); // 테마 상태 관리

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco; // monaco 인스턴스를 저장
    defineCustomTheme(monaco); // 테마 정의 함수 호출

    // 초기 폰트 크기 및 굵기 설정
    if (isCustomTheme) {
      editor.updateOptions({ fontSize: 20, fontWeight: "bold" });
    } else {
      editor.updateOptions({ fontSize: 14, fontWeight: "normal" });
    }
  };

  useEffect(() => {
    if (editorRef.current) {
      if (isCustomTheme) {
        editorRef.current.updateOptions({ fontSize: 20, fontWeight: "bold" }); // 커스텀 폰트 크기 및 굵기 설정
      } else {
        editorRef.current.updateOptions({ fontSize: 14, fontWeight: "normal" }); // 초기 폰트 크기 및 굵기 설정
      }
    }
  }, [isCustomTheme]);

  useEffect(() => {
    if (editorRef.current) {
      const observer = new MutationObserver(() => {
        if (isCustomTheme) {
          editorRef.current.updateOptions({ fontSize: 20, fontWeight: "bold" });
        } else {
          editorRef.current.updateOptions({
            fontSize: 14,
            fontWeight: "normal",
          });
        }
      });
      observer.observe(editorRef.current.getDomNode(), {
        childList: true,
        subtree: true,
      });
      return () => observer.disconnect();
    }
  }, [isCustomTheme]);

  const applyCustomTheme = () => {
    if (monacoRef.current) {
      if (isCustomTheme) {
        monacoRef.current.editor.setTheme("vs"); // 초기 테마로 설정
      } else {
        monacoRef.current.editor.setTheme("colorBlindFriendlyTheme"); // 커스텀 테마로 설정
      }
      setIsCustomTheme(!isCustomTheme); // 테마 상태 토글
    }
  };

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
            className="text-white px-4 rounded"
            style={{ backgroundColor: "#457D61" }}
            onClick={applyCustomTheme}
          >
            {isCustomTheme ? "기본 모드" : "적록 색약 모드"}
          </button>
        </div>
      </div>
      <div className="flex-grow p-4">
        <Editor
          height="100%"
          language={file.language}
          value={file.value}
          theme="vs"
          onMount={handleEditorDidMount} // 에디터가 마운트될 때 호출
          options={{ fontSize: 14, fontWeight: "normal" }} // 초기 폰트 크기 및 굵기 설정
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
