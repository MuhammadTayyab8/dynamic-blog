'use client'

import React, { useRef, useState } from 'react'
import { FaImage } from 'react-icons/fa'

// import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import dynamic from 'next/dynamic';
import { Quill } from 'react-quill';



const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const AddNewBlog = () => {

  const [formData, setFormData] = useState({ authorName: '', title: '', imageUrl: '', blogData: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const quillRef = useRef<any>(null);


  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsSubmitting(true)

    // FormData banao
    const formData = new FormData();
    formData.append("image", file);

    try {
      // API call karo
      const res = await fetch("/api/uploads", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        // Server se jo URL mila usko save karo
        setFormData((prev) => ({ ...prev, imageUrl: data.url }));
      } else {
        console.error("Upload failed:", data.message);
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsSubmitting(false)
    }
  };





  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await res.json();
        if (data.success) {
          const quill = quillRef.current?.getEditor();
          const range = quill.getSelection();
          quill.insertEmbed(range.index, "image", data.url);
        }
      } catch (error) {
        console.error("Upload failed", error);
      }
    };
  };







  return (
    <div className='sm:px-4 py-2 mb-16 sm:mb-0'>

      <div className='text-xl font-medium'>Add New Blog</div>

      {/* # ================ form ================== #  */}

      <div className='grid grid-cols-2 my-4 gap-x-4 gap-y-1'>

        {/* ==== Title ==== */}
        <div className="relative mt-6 col-span-2">
          {/* Label */}
          <label className="absolute -top-3 left-3 bg-[#0E1217] text-white px-2 text-sm rounded">
            Blog Title
          </label>

          {/* Input */}
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            className="w-full px-3 py-2 rounded-md border border-gray-600 bg-transparent text-white 
               placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-700
               transition"
            placeholder="Enter blog title"
          />
        </div>



        {/* ==== Author Name ==== */}
        <div className="relative mt-6">
          {/* Label */}
          <label className="absolute -top-3 left-3 bg-[#0E1217] text-white px-2 text-sm rounded">
            Author Name
          </label>

          {/* Input */}
          <input
            type="text"
            value={formData.authorName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, authorName: e.target.value }))
            }
            className="w-full px-3 py-2 rounded-md border border-gray-600 bg-transparent text-white 
               placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-700
               transition"
            placeholder="Enter author name"
          />
        </div>


        {/* ====== Thumbnail Image ====== */}
        <div className="relative mt-6">
          {/* Label */}
          <label className="absolute -top-3 left-3 bg-[#0E1217] text-white px-2 text-sm rounded">
            Thumbnail
          </label>

          {/* Upload Box */}
          <div className="w-full h-[42px] border border-dashed border-gray-500 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 transition bg-[#1b1f26]">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            {formData.imageUrl ? (
              <div>Uploaded</div>
            ) : (

              <div className="flex flex-row gap-3 py-2.5 items-center text-gray-400">
                <FaImage className="text-orange-400 mb-1" />
                <p className="text-sm">Click to upload</p>
              </div>
            )}

          </div>
        </div>


        {/* ======== blog content ========  */}
        <div className="relative mt-6 col-span-2">
          {/* Label */}
          <label className="absolute -top-3 left-3 bg-[#0E1217] text-white px-2 text-sm rounded">
            Blog Content
          </label>

          {/* Input */}
          {/* <textarea
            value={formData.blogData}
            rows={12}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, blogData: e.target.value }))
            }
            className="w-full px-3 py-2 rounded-md border border-gray-600 bg-transparent text-white 
               placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-700
               transition"
            placeholder="Enter blog content"
          /> */}

          <ReactQuill
            // @ts-ignore
            ref={quillRef as any}
            value={formData.blogData}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, blogData: value }))
            }
            theme="snow"
            className="h-auto border-none outline-none text-white rounded-md quill-dark focus:outline-none focus:ring-2 focus:ring-orange-700"
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ color: [] }, { background: [] }],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['blockquote', 'code-block'],
                ['image'],
                ['clean'],
              ],
              // handlers: {
              //   image: handleImageUpload, // 👈 custom handler
              // },
            }}
          />


        </div>




      </div>

      {/* ======== btn ===========  */}
      <button type="button"
        className='px-10 py-2 bg-gray-700 hover:bg-gray-500 text-white rounded-md'
      >
        Save
      </button>

      {/* <AddBlog /> */}



      {isSubmitting && (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin h-16 w-16 border-t-4 border-slate-500 rounded-full"></div>
        </div>
      )}



    </div>
  )
}

export default AddNewBlog