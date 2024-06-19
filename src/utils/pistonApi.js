// src/utils/pistonApi.js

import axios from "axios";

// Piston API에서 지원하는 런타임 버전을 가져오는 함수
export const fetchRuntimes = async () => {
  const response = await axios.get("https://emkc.org/api/v2/piston/runtimes");
  return response.data;
};

// 각 언어의 기본 런타임 버전을 가져오는 함수
export const getDefaultVersion = (language, runtimes) => {
  const runtime = runtimes.find((rt) => rt.language === language);
  return runtime ? runtime.version : "latest";
};

export const runCode = async (language, code, runtimes) => {
  const version = getDefaultVersion(language, runtimes);

  const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
    language,
    version,
    files: [
      {
        name: "main",
        content: code,
      },
    ],
  });

  return response.data;
};
