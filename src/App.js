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

const getFileNameWithExtension = (fileName, fileType) => {
  const extensionMap = {
    javascript: "js",
    css: "css",
    html: "html",
    typescript: "ts",
    json: "json",
    java: "java",
    python: "py",
  };
  return `${fileName}.${extensionMap[fileType] || ""}`;
};

export default function App() {
  const [files, setFiles] = useState({});
  const [fileName, setFileName] = useState("");
  const [newFileName, setNewFileName] = useState("");
  const [output, setOutput] = useState("");
  const projectId = 2;

  // 페이지 새로 고침 또는 닫기 시 파일 내용과 현재 파일 이름을 로컬 스토리지에 저장
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      localStorage.setItem("files", JSON.stringify(files));
      localStorage.setItem("currentFileName", fileName);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [files, fileName]);

  // 페이지 로드 시 로컬 스토리지에서 파일 내용과 현재 파일 이름을 불러옴
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const fetchedFiles = await fetchFilesAPI(projectId);
        console.log("Fetched files:", fetchedFiles);
        const filesObject = fetchedFiles.reduce((acc, file) => {
          const fullFileName = getFileNameWithExtension(
            file.file_name,
            getFileLanguage(file.file_type)
          );
          acc[fullFileName] = {
            name: fullFileName,
            language: getFileLanguage(file.file_type),
            value: file.content,
            id: file.id,
          };
          return acc;
        }, {});
        console.log("Files object:", filesObject);

        // 로컬 스토리지에 저장된 파일 내용을 우선으로 사용
        const storedFiles = localStorage.getItem("files");
        const storedFileName = localStorage.getItem("currentFileName");
        if (storedFiles) {
          const storedFilesObject = JSON.parse(storedFiles);
          // 서버에서 가져온 파일 목록과 로컬 스토리지의 파일 내용을 병합
          const mergedFiles = { ...filesObject, ...storedFilesObject };
          setFiles(mergedFiles);
          if (Object.keys(mergedFiles).length > 0) {
            setFileName(storedFileName || Object.keys(mergedFiles)[0]);
          }
        } else {
          setFiles(filesObject);
          if (Object.keys(filesObject).length > 0) {
            setFileName(Object.keys(filesObject)[0]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch files:", error);
      }
    };
    fetchFiles();
  }, [projectId]);

  const file = files[fileName] || { language: "", value: "" };
  console.log("App file:", file);

  const createFileLocal = async (newFileName) => {
    const [name, extension] = newFileName.split(".");
    const newFileLanguage = getFileLanguage(extension);

    try {
      if (files[newFileName]) {
        console.error("이미 존재하는 파일 이름입니다.");
        return;
      }

      const createdFile = await createFileAPI(projectId, name, extension);

      const fetchedFiles = await fetchFilesAPI(projectId);
      const filesObject = fetchedFiles.reduce((acc, file) => {
        const fullFileName = getFileNameWithExtension(
          file.file_name,
          getFileLanguage(file.file_type)
        );
        acc[fullFileName] = {
          name: fullFileName,
          language: getFileLanguage(file.file_type),
          value: file.content,
          id: file.id,
        };
        return acc;
      }, {});

      // 로컬 스토리지에 저장된 파일 내용을 병합
      const storedFiles = localStorage.getItem("files");
      if (storedFiles) {
        const storedFilesObject = JSON.parse(storedFiles);
        const mergedFiles = { ...filesObject, ...storedFilesObject };
        setFiles(mergedFiles);
      } else {
        setFiles(filesObject);
      }

      setFileName(newFileName); // 파일 이름을 확장자 포함하여 설정
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
