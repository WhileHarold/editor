import axios from "axios";

const API_BASE_URL = "http://localhost:8080"; // 백엔드 API URL

// 파일 생성
export const createFile = async (projectId, fileName, fileType) => {
  const response = await axios.post(
    `${API_BASE_URL}/projects/${projectId}/files`,
    null,
    {
      params: {
        file_name: fileName,
        file_type: fileType,
      },
    }
  );
  return response.data;
};

// 파일 목록 가져오기
export const getFilesByProjectId = async (projectId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/projects/${projectId}/files`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting files by project ID:", error);
    throw error;
  }
};

// 기타 API 함수들
export const getFile = async (projectId, fileId) => {
  const response = await axios.get(
    `${API_BASE_URL}/projects/${projectId}/files/${fileId}`
  );
  return response.data;
};

export const updateFile = async (projectId, fileId, fileDto) => {
  const response = await axios.put(
    `${API_BASE_URL}/projects/${projectId}/files/${fileId}`,
    fileDto
  );
  return response.data;
};

export const deleteFile = async (projectId, fileId) => {
  await axios.delete(`${API_BASE_URL}/projects/${projectId}/files/${fileId}`);
};

export const compileCode = async (projectId, fileName, code, language) => {
  const response = await axios.post(`${API_BASE_URL}/projects/compiler`, {
    projectId,
    fileName,
    code,
    language,
  });
  return response.data;
};
