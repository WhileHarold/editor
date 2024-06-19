/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        customGreen: "#FAFFF9", // 사용자 정의 색상 추가
        deepGreen: "#89A898",
        yarnGreen: "#C1D1C9",
      },
    },
  },
  variants: {},
  plugins: [],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
};
