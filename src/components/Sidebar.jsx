import React, { useState, useRef } from "react";
import fileMaker from "../assets/images/fileMaker.svg";
import kebabMenu from "../assets/images/kebabMenu.svg";
import {
  createFile as createFileAPI,
  deleteFile as deleteFileAPI,
  updateFile as updateFileAPI,
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
  const [showMenu, setShowMenu] = useState({});
  const menuRefs = useRef({});

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
      setShowMenu((prevState) => ({
        ...prevState,
        [name]: false,
      }));
    } catch (error) {
      console.error("Failed to delete file:", error);
    }
  };

  const handleSaveFile = async (name) => {
    try {
      const file = files[name];
      await updateFileAPI(projectId, file.id, {
        name: file.name,
        type: file.language,
        content: file.value,
      });
      setShowMenu((prevState) => ({
        ...prevState,
        [name]: false,
      }));
    } catch (error) {
      console.error("Failed to save file:", error);
    }
  };

  const handleKebabClick = (name) => {
    setShowMenu((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const handleClickOutside = (event) => {
    Object.keys(menuRefs.current).forEach((key) => {
      if (
        menuRefs.current[key] &&
        !menuRefs.current[key].contains(event.target)
      ) {
        setShowMenu((prevState) => ({
          ...prevState,
          [key]: false,
        }));
      }
    });
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <aside
      className="w-64 flex flex-col overflow-hidden"
      style={{ backgroundColor: "#89A898" }}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-300">
        <div>Project</div>
        <div className="flex space-x-4">
          <div onClick={handleFileMakerClick} className="cursor-pointer ">
            <img src={fileMaker} alt="fileMaker" className="w-6 h-6" />
          </div>
        </div>
      </div>
      <div className="p-4 flex-grow overflow-auto relative">
        {Object.entries(files).length === 0 ? (
          <div>No files available</div>
        ) : (
          Object.entries(files).map(([name, file]) => (
            <div key={name} className="flex items-center mb-2 relative">
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
                onClick={() => handleKebabClick(name)}
                className="ml-2 text-gray-600 relative"
              >
                <img src={kebabMenu} alt="kebabMenu" className="w-4 h-4" />
              </button>
              {showMenu[name] && (
                <div
                  ref={(el) => (menuRefs.current[name] = el)}
                  className="absolute right-0 top-8 bg-white border border-gray-300 z-50"
                  style={{ width: "100px" }}
                >
                  <button
                    onClick={() => handleSaveFile(name)}
                    className="block w-full text-left px-4 py-2 text-black hover:bg-gray-200"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => handleDeleteFile(name)}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200"
                  >
                    Delete
                  </button>
                </div>
              )}
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
