// src/App.js

import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./index.css"; // Tailwind CSS 임포트

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
  const [files, setFiles] = useState(initialFiles);
  const [fileName, setFileName] = useState("script.js");
  const [newFileName, setNewFileName] = useState("");

  const file = files[fileName];

  const createFile = () => {
    if (!newFileName || files[newFileName]) return;

    const newFileLanguage = getFileLanguage(newFileName);
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
    setNewFileName("");
  };

  const deleteFile = (name) => {
    if (Object.keys(files).length === 1) return;

    const newFiles = { ...files };
    delete newFiles[name];

    const remainingFileNames = Object.keys(newFiles);
    setFiles(newFiles);
    setFileName(remainingFileNames[0]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          files={files}
          fileName={fileName}
          setFileName={setFileName}
          newFileName={newFileName}
          setNewFileName={setNewFileName}
          createFile={createFile}
          deleteFile={deleteFile}
        />
        <div className="flex flex-col flex-1 overflow-hidden">
          <MainContent
            file={file}
            files={files}
            setFiles={setFiles}
            fileName={fileName}
          />
          <Footer />
        </div>
      </div>
    </div>
  );
}
