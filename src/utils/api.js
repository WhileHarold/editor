import axios from "axios";

// Axios 기본 설정: 모든 요청의 기본 URL 설정
axios.defaults.baseURL = "http://localhost:8080"; // 백엔드 API URL

// 파일 관련 API

/*
 * 파일 생성
 * @param {number} projectId - 프로젝트 ID
 * @param {string} name - 파일 이름
 * @param {string} fileType - 파일 타입
 * @returns {Promise<Object>} - 생성된 파일 데이터
 */
export const createFile = async (projectId, fileName, fileType) => {
  try {
    const response = await axios.post(`/projects/${projectId}/files`, null, {
      params: {
        file_name: fileName,
        file_type: fileType,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating file:", error);
    throw error;
  }
};

/*
 * 파일 ID와 프로젝트 ID로 파일 조회
 * @param {number} projectId - 프로젝트 ID
 * @param {number} fileId - 파일 ID
 * @returns {Promise<Object>} - 파일 데이터
 */
export const getFileByIdAndProjectId = async (projectId, fileId) => {
  try {
    const response = await axios.get(`/projects/${projectId}/files/${fileId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting file by ID and project ID:", error);
    throw error;
  }
};

/*
 * 프로젝트 ID로 파일 목록 조회
 * @param {number} projectId - 프로젝트 ID
 * @returns {Promise<Array>} - 파일 목록
 */
export const getFilesByProjectId = async (projectId) => {
  try {
    const response = await axios.get(`/projects/${projectId}/files`);
    return response.data;
  } catch (error) {
    console.error("Error getting files by project ID:", error);
    throw error;
  }
};

/*
 * 파일 ID와 프로젝트 ID로 파일 업데이트
 * @param {number} projectId - 프로젝트 ID
 * @param {number} fileId - 파일 ID
 * @param {Object} fileDto - 업데이트할 파일 데이터 (이름, 타입, 내용 등)
 * @returns {Promise<Object>} - 업데이트된 파일 데이터
 */
export const updateFile = async (projectId, fileId, fileDto) => {
  try {
    const response = await axios.put(
      `/projects/${projectId}/files/${fileId}`,
      fileDto
    );
    return response.data;
  } catch (error) {
    console.error("Error updating file:", error);
    throw error;
  }
};

/*
 * 파일 삭제
 * @param {number} projectId - 프로젝트 ID
 * @param {number} fileId - 파일 ID
 * @returns {Promise<void>}
 */
export const deleteFile = async (projectId, fileId) => {
  try {
    await axios.delete(`/projects/${projectId}/files/${fileId}`);
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};

/*
 * 파일 실행
 * @param {number} projectId - 프로젝트 ID
 * @param {number} fileId - 파일 ID
 * @returns {Promise<string>} - 파일 실행 결과
 */
export const executeFile = async (projectId, fileId) => {
  try {
    const response = await axios.post(
      `/projects/${projectId}/files/${fileId}/run`
    );
    return response.data;
  } catch (error) {
    console.error("Error executing file:", error);
    throw error;
  }
};
