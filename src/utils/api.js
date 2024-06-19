import axios from "axios";

const API_BASE_URL = "http://localhost:8080"; // 백엔드 API URL

export const createFile = async (projectId, fileDto) => {
  const response = await axios.post(
    `${API_BASE_URL}/projects/${projectId}/files`,
    fileDto
  );
  return response.data;
};

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
