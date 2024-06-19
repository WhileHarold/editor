import React, { useState } from "react";
import fileMaker from "../assets/images/fileMaker.svg";
import {
  createFile as createFileAPI,
  deleteFile as deleteFileAPI,
} from "../utils/api";

export default function Sidebar({
  projectId, // 하드코딩된 프로젝트 ID를 prop으로 받아옴
  files,
  fileName,
  setFileName,
  newFileName,
  setNewFileName,
  createFileLocal, // 로컬 파일 생성 함수
  deleteFileLocal, // 로컬 파일 삭제 함수
}) {
  const [showFileInput, setShowFileInput] = useState(false);

  const handleFileMakerClick = () => {
    setShowFileInput(!showFileInput);
  };

  const handleCreateFile = async () => {
    if (!newFileName || files[newFileName]) return;

    try {
      await createFileAPI(projectId, newFileName, getFileLanguage(newFileName));
      createFileLocal(newFileName); // 로컬 파일 생성
      setFileName(newFileName); // 생성된 파일로 파일 선택 변경
      setNewFileName(""); // 파일 입력 초기화
      setShowFileInput(false); // 파일 입력 창 닫기
    } catch (error) {
      console.error("Failed to create file:", error);
    }
  };

  const handleDeleteFile = async (name) => {
    try {
      // files 객체에서 파일 ID를 가져옴
      const fileId = files[name].id;
      await deleteFileAPI(projectId, fileId); // 서버에서 파일 삭제
      deleteFileLocal(name); // 로컬 파일 삭제
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
        {Object.keys(files).map((name) => (
          <div key={name} className="flex items-center mb-2">
            <button
              onClick={() => setFileName(name)}
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
        ))}
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
