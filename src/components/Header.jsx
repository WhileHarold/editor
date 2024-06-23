import React from "react";
import logo from "../assets/images/logo.svg";
import chat from "../assets/images/chat.svg";
import mypage from "../assets/images/mypage.svg";
import basic_profile from "../assets/images/basic_profile.svg";

export default function Header() {
  const userID = "testID";
  return (
    <header
      className="bg-customGreen text-white p-4 flex items-center border-b border-gray-300"
      style={{ backgroundColor: "#FAFFF9" }}
    >
      <div className="logo w-16">
        <img src={logo} alt="logo" className="w-full h-auto" />
      </div>
      <div className="flex space-x-4 ml-auto">
        <div className="chat">
          <img src={chat} alt="chat" className="w-8 h-8" />
        </div>
        <div className="my-page flex items-center space-x-2">
          <img src={basic_profile} alt="basic_profile" className="w-8 h-8" />
          <span className="text-black">{userID}</span>
        </div>
      </div>
    </header>
  );
}
