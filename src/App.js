// App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage/index"; // default로 가져오기
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
