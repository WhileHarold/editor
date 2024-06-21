import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./index.css";
import {
  getFilesByProjectId as fetchFilesAPI,
  updateFile as updateFileAPI,
  executeFile as executeFileAPI,
  createFile as createFileAPI,
} from "./utils/api";

const getFileLanguage = (fileType) => {
  switch (fileType) {
    case "js":
      return "javascript";
    case "css":
      return "css";
    case "html":
      return "html";
    case "ts":
      return "typescript";
    case "json":
      return "json";
    case "java":
      return "java";
    case "py":
      return "python";
    default:
      return "plaintext";
  }
};

export default function App() {
  const [files, setFiles] = useState({});
  const [fileName, setFileName] = useState("");
  const [newFileName, setNewFileName] = useState("");
  const [output, setOutput] = useState("");
  const projectId = 2;

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const fetchedFiles = await fetchFilesAPI(projectId);
        console.log("Fetched files:", fetchedFiles);
        const filesObject = fetchedFiles.reduce((acc, file) => {
          acc[file.file_name] = {
            name: file.file_name,
            language: getFileLanguage(file.file_type),
            value: file.content,
            id: file.id,
          };
          return acc;
        }, {});
        console.log("Files object:", filesObject);
        setFiles(filesObject);
        if (Object.keys(filesObject).length > 0) {
          setFileName(Object.keys(filesObject)[0]);
        }
      } catch (error) {
        console.error("Failed to fetch files:", error);
      }
    };
    fetchFiles();
  }, [projectId]);

  useEffect(() => {
    localStorage.setItem("files", JSON.stringify(files));
  }, [files]);

  const file = files[fileName] || { language: "", value: "" };
  console.log("App file:", file);

  const createFileLocal = async (newFileName) => {
    const [name, extension] = newFileName.split(".");
    const newFileLanguage = getFileLanguage(extension);

    try {
      // 서버에 파일 생성 요청 전에 중복 확인
      if (files[newFileName]) {
        console.error("이미 존재하는 파일 이름입니다.");
        return;
      }

      // 서버에 파일 생성 요청
      const createdFile = await createFileAPI(projectId, name, extension);

      // 파일 목록을 다시 불러옴
      const fetchedFiles = await fetchFilesAPI(projectId);
      const filesObject = fetchedFiles.reduce((acc, file) => {
        acc[file.file_name] = {
          name: file.file_name,
          language: getFileLanguage(file.file_type),
          value: file.content,
          id: file.id,
        };
        return acc;
      }, {});

      setFiles(filesObject);
      setFileName(newFileName);
    } catch (error) {
      console.error("Failed to create file:", error);
    }
  };

  const deleteFileLocal = (name) => {
    if (Object.keys(files).length === 1) return;

    const newFiles = { ...files };
    delete newFiles[name];

    const remainingFileNames = Object.keys(newFiles);
    setFiles(newFiles);
    setFileName(remainingFileNames[0]);
  };

  const executeCode = async () => {
    console.log("executeCode 함수 호출됨");
    const currentFile = files[fileName];
    console.log("Current file for execution:", currentFile);

    if (!currentFile.id) {
      console.error("파일 ID가 없습니다:", currentFile);
      return;
    }

    try {
      console.log("파일 업데이트 요청:", currentFile);
      await updateFileAPI(projectId, currentFile.id, {
        name: currentFile.name,
        type: currentFile.language,
        content: currentFile.value,
      });

      console.log("파일 실행 요청:", currentFile.id);
      const result = await executeFileAPI(projectId, currentFile.id);
      console.log("파일 실행 결과:", result);

      const output = result || "No output";
      setOutput(output);
    } catch (error) {
      console.error("Failed to execute code:", error);
      setOutput(`Failed to execute code: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          projectId={projectId}
          files={files}
          setFiles={setFiles}
          fileName={fileName}
          setFileName={setFileName}
          newFileName={newFileName}
          setNewFileName={setNewFileName}
          createFileLocal={createFileLocal}
          deleteFileLocal={deleteFileLocal}
        />
        <div className="flex flex-col flex-1 overflow-hidden">
          <MainContent
            file={file}
            files={files}
            setFiles={setFiles}
            fileName={fileName}
            executeCode={executeCode}
          />
          <Footer output={output} />
        </div>
      </div>
    </div>
  );
}
