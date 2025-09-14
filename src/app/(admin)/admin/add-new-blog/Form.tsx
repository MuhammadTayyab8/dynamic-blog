"use client";

import React, { useState } from "react";
import SimpleEditor from "./BlogEditor";


const AddBlog = () => {
  const [value, setValue] = useState("");

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["blockquote", "code-block"],
      ["link", "image"],
      ["clean"], // remove formatting button
    ],
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Blog</h1>

      {/* Author Name */}
      <input
        type="text"
        placeholder="Author Name"
        className="w-full p-2 mb-3 border rounded"
      />

      {/* Title */}
      <input
        type="text"
        placeholder="Blog Title"
        className="w-full p-2 mb-3 border rounded"
      />

      {/* Thumbnail */}
      <input
        type="file"
        className="w-full p-2 mb-3 border rounded"
      />


        <SimpleEditor />

      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
        Save Blog
      </button>
    </div>
  );
};

export default AddBlog;
