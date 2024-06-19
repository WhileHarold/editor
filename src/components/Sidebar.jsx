import React, { useState } from "react";
import fileMaker from "../assets/images/fileMaker.svg";

export default function Sidebar({
  files,
  fileName,
  setFileName,
  newFileName,
  setNewFileName,
  createFile,
  deleteFile,
}) {
  const [showFileInput, setShowFileInput] = useState(false);

  const handleFileMakerClick = () => {
    setShowFileInput(!showFileInput);
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
              className={`flex-grow text-left px-2 py-1 text-black whitespace-nowrap`}
            >
              {name}
            </button>
            <button
              onClick={() => deleteFile(name)}
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
              onClick={createFile}
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
