import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./index.css";
import { fetchRuntimes, runCode } from "./utils/pistonApi";
import { createFile as createFileAPI } from "./utils/api"; // createFile API 함수 import

const initialFiles = {
  "script.js": {
    name: "script.js",
    language: "javascript",
    value: "// JavaScript code here",
  },
  "style.css": {
    name: "style.css",
    language: "css",
    value: "/* CSS code here */",
  },
  "index.html": {
    name: "index.html",
    language: "html",
    value: "<!-- HTML code here -->",
  },
};

const getFileLanguage = (fileName) => {
  const extension = fileName.split(".").pop();
  switch (extension) {
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
  const [files, setFiles] = useState(() => {
    const savedFiles = localStorage.getItem("files");
    return savedFiles ? JSON.parse(savedFiles) : initialFiles;
  });
  const [fileName, setFileName] = useState("script.js");
  const [newFileName, setNewFileName] = useState("");
  const [output, setOutput] = useState("");
  const [runtimes, setRuntimes] = useState([]);
  const projectId = 1; // 하드코딩된 projectId

  useEffect(() => {
    const fetchAndSetRuntimes = async () => {
      const runtimes = await fetchRuntimes();
      setRuntimes(runtimes);
    };
    fetchAndSetRuntimes();
  }, []);

  useEffect(() => {
    const saveInitialFilesToServer = async () => {
      const savedFiles = localStorage.getItem("files");
      if (!savedFiles) {
        try {
          for (const fileName in initialFiles) {
            const file = initialFiles[fileName];
            const createdFile = await createFileAPI(
              projectId,
              file.name,
              file.language
            );
            initialFiles[file.name].id = createdFile.id; // 서버에서 받은 파일 ID 저장
          }
          localStorage.setItem("files", JSON.stringify(initialFiles));
          setFiles(initialFiles);
        } catch (error) {
          console.error("Failed to save initial files to server:", error);
        }
      }
    };
    saveInitialFilesToServer();
  }, []);

  useEffect(() => {
    localStorage.setItem("files", JSON.stringify(files));
  }, [files]);

  const file = files[fileName];

  const createFileLocal = (newFileName, fileId) => {
    const newFileLanguage = getFileLanguage(newFileName);
    const newFiles = {
      ...files,
      [newFileName]: {
        id: fileId, // 서버에서 받은 파일 ID 저장
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
          projectId={projectId} // 하드코딩된 projectId 전달
          files={files}
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
