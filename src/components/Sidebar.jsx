import React, { useState } from "react";
import fileMaker from "../assets/images/fileMaker.svg";
import {
  createFile as createFileAPI,
  deleteFile as deleteFileAPI, // 추가
} from "../utils/api";

export default function Sidebar({
  projectId,
  files,
  setFiles,
  fileName,
  setFileName,
  newFileName,
  setNewFileName,
  createFileLocal,
  deleteFileLocal,
}) {
  const [showFileInput, setShowFileInput] = useState(false);

  const handleFileMakerClick = () => {
    setShowFileInput(!showFileInput);
  };

  const handleCreateFile = async () => {
    if (!newFileName || files[newFileName]) return;

    try {
      const [name, extension] = newFileName.split(".");
      if (!extension) {
        alert("Please enter a valid file name with an extension.");
        return;
      }
      await createFileLocal(newFileName);
      setNewFileName("");
      setShowFileInput(false);
    } catch (error) {
      console.error("Failed to create file:", error);
    }
  };

  const handleDeleteFile = async (name) => {
    try {
      const fileId = files[name].id;
      await deleteFileAPI(projectId, fileId);
      deleteFileLocal(name);
    } catch (error) {
      console.error("Failed to delete file:", error);
    }
  };

  return (
    <aside
      className="w-64 flex flex-col overflow-hidden"
      style={{ backgroundColor: "#89A898" }}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-300">
        <div>Project</div>
        <div className="flex space-x-4">
          <div onClick={handleFileMakerClick} className="cursor-pointer">
            <img src={fileMaker} alt="fileMaker" className="w-6 h-6" />
          </div>
        </div>
      </div>
      <div className="p-4 flex-grow overflow-auto">
        {Object.keys(files).length === 0 ? (
          <div>No files available</div>
        ) : (
          Object.keys(files).map((name) => (
            <div key={name} className="flex items-center mb-2">
              <button
                onClick={() => {
                  console.log("파일 선택됨:", name); // 디버깅용 로그
                  setFileName(name);
                }}
                className="flex-grow text-left px-2 py-1 text-black whitespace-nowrap"
              >
                {name}
              </button>
              <button
                onClick={() => handleDeleteFile(name)}
                className="ml-2 text-red-600"
              >
                Delete
              </button>
            </div>
          ))
        )}
        {showFileInput && (
          <div className="mt-4">
            <input
              type="text"
              placeholder="File name"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              className="w-full px-2 py-1 border rounded mb-2 text-black"
            />
            <button
              onClick={handleCreateFile}
              className="w-full text-black px-2 py-1 rounded"
              style={{ backgroundColor: "#E9EFE7" }}
            >
              Create File
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
