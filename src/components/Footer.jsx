import React from "react";

export default function Footer({ output }) {
  return (
    <footer className="p-4 bg-yarnGreen">
      <div className="border-b-2 border-black pb-2 mb-2">>_Console</div>
      <div className="whitespace-pre-wrap text-black">
        {output ? output : "No output"}
      </div>
    </footer>
  );
}
