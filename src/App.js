import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./index.css";
import { fetchRuntimes, runCode } from "./utils/pistonApi";
import { getFilesByProjectId as fetchFilesAPI } from "./utils/api";

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
  const [runtimes, setRuntimes] = useState([]);
  const projectId = 2;

  useEffect(() => {
    const fetchAndSetRuntimes = async () => {
      const runtimes = await fetchRuntimes();
      setRuntimes(runtimes);
    };
    fetchAndSetRuntimes();
  }, []);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const fetchedFiles = await fetchFilesAPI(projectId);
        console.log("Fetched files:", fetchedFiles); // 디버깅을 위해 콘솔에 출력
        const filesObject = fetchedFiles.reduce((acc, file) => {
          acc[file.file_name] = {
            name: file.file_name,
            language: getFileLanguage(file.file_type),
            value: file.content,
            id: file.id,
          };
          return acc;
        }, {});
        console.log("Files object:", filesObject); // 디버깅을 위해 콘솔에 출력
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

  const createFileLocal = (newFileName) => {
    const [name, extension] = newFileName.split(".");
    const newFileLanguage = getFileLanguage(extension);
    const newFiles = {
      ...files,
      [newFileName]: {
        name: newFileName,
        language: newFileLanguage,
        value: "",
      },
    };
    setFiles(newFiles);
    setFileName(newFileName);
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
    const result = await runCode(file.language, file.value, runtimes);
    setOutput(result);
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
