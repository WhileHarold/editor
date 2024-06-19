// src/utils/pistonApi.js

export const runCode = async (language, code) => {
  const response = await fetch("https://emkc.org/api/v2/piston/execute", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      language,
      source: code,
    }),
  });

  const result = await response.json();
  return result;
};
