'use client'

import React, { useRef, useState } from 'react'
import { FaCheck, FaImage } from 'react-icons/fa'

// import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import dynamic from 'next/dynamic';
import { Quill } from 'react-quill';
import Alert from '@/components/Alert';
import { Editor } from './Editor';



const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const AddNewBlog = () => {

  const [formData, setFormData] = useState({ authorName: '', title: '', imageUrl: '', blogData: '', Category: [] as string[] })
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


  console.log(formData, "formData")


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



  // categories
  const categories = ["Education", "Technology", "Designing"];

  const toggleCategory = (cat: string) => {
    setFormData((prev) => {
      const alreadySelected = prev.Category.includes(cat)

      return {
        ...prev,
        Category: alreadySelected
          ? prev.Category.filter((c) => c !== cat)
          : [...prev.Category, cat],
      }
    })
  }



  const [alertData, setAlertData] = useState<{
    title: string;
    message: string;
    show: boolean;
  }>({ title: "", message: "", show: false });

  function showAlert(title: string, message: string) {
    setAlertData({ title, message, show: true });
  }




  // ====================== https req ====================

  const handlePost = async () => {
    try {
      setIsSubmitting(true)

      const payload = {
        Title: formData.title,
        Author: formData.authorName,
        Date: new Date().toISOString().split("T")[0],
        ImageUrl: formData.imageUrl,
        BlogContent: formData.blogData,
        Category: formData.Category.join(",")
      }

      const response = await fetch(`/api/blog`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })

      const result = await response.json()

      if (!response.ok) {
        showAlert("Error", result.error || "something went wrong")
        return
      }

      showAlert("Sccess", "Blog added.")


    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }





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

            <Editor
              content={formData.blogData}
              setContent={
                (value) =>
              setFormData((prev) => ({ ...prev, blogData: value }))
              } 
            />

          {/* <ReactQuill
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
          /> */}


        </div>


        <div className='mt-5'>
          <h1>Category</h1>

          <div className='flex flex-col space-y-2 mt-3'>
            {categories.map((cat) => (
              <label key={cat} className="flex items-center space-x-2 cursor-pointer">
                {/* hidden checkbox  */}
                <input
                  type="checkbox"
                  className="hidden"
                  checked={formData.Category.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                />

                {/* custom checkbox  */}
                <div
                  className={`w-5 h-5 border-2 rounded-md flex items-center justify-center transition-all
              ${formData.Category.includes(cat)
                      ? "bg-orange-600 border-orange-600"
                      : "border-[#A2A1A8] bg-transparent"
                    }`}>
                  {formData.Category.includes(cat) && (
                    <FaCheck size={12} className="text-white" />
                  )}
                </div>
                {/* Label text */}
                <span className="text-sm text-white">{cat}</span>

              </label>
            ))}

          </div>

        </div>



      </div>

      {/* ======== btn ===========  */}
      <button
        onClick={handlePost}
        type="button"
        className='px-10 py-2 bg-gray-700 hover:bg-gray-500 text-white rounded-md'
      >
        Save
      </button>

      {/* <AddBlog /> */}



      {isSubmitting && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-60">
            <div className="animate-spin h-16 w-16 border-t-4 border-slate-500 rounded-full"></div>
        </div>
      )}



      {alertData.show && (
        <Alert
          title={alertData.title}
          message={alertData.message}
          setIsOpen={(val) => setAlertData((prev) => ({ ...prev, show: false }))}
        />
      )}



    </div>
  )
}

export default AddNewBlog