"use client";

import React, { useRef } from "react";

const SimpleEditor = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  const format = (command: string, value?: string) => {
    document.execCommand(command, false, value);
  };

  return (
    <div className="space-y-4 text-black">
      {/* Toolbar */}
      <div className="flex gap-2 border p-2 rounded">
        <button onClick={() => format("bold")} className="px-2 py-1 bg-gray-200 rounded">B</button>
        <button onClick={() => format("italic")} className="px-2 py-1 bg-gray-200 rounded italic">I</button>
        <button onClick={() => format("underline")} className="px-2 py-1 bg-gray-200 rounded underline">U</button>
        <button onClick={() => format("insertOrderedList")} className="px-2 py-1 bg-gray-200 rounded">OL</button>
        <button onClick={() => format("insertUnorderedList")} className="px-2 py-1 bg-gray-200 rounded">UL</button>
        <button onClick={() => format("formatBlock", "<h2>")} className="px-2 py-1 bg-gray-200 rounded">H2</button>
        <button
          onClick={() => {
            const url = prompt("Enter image URL");
            if (url) format("insertImage", url);
          }}
          className="px-2 py-1 bg-gray-200 rounded"
        >
          Img
        </button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        className="min-h-[200px] border rounded p-4 bg-white"
      ></div>
    </div>
  );
};

export default SimpleEditor;
