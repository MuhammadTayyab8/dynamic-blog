'use client'

import React, { useState } from 'react'
import AddBlog from './Form'
import { FaImage } from 'react-icons/fa'

const AddNewBlog = () => {

  const [formData, setFormData] = useState({ authorName: '', title: '', imageUrl: '', blogData: '' })


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='sm:px-4 py-2'>

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
          <div className="w-full h-10 border border-dashed border-gray-500 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 transition bg-[#1b1f26]">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            {formData.imageUrl ? (
              <div>Uploaded</div>
            ) : (

              <div className="flex flex-row gap-3 py-2 items-center text-gray-400">
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
          <textarea
            value={formData.blogData}
            rows={12}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, blogData: e.target.value }))
            }
            className="w-full px-3 py-2 rounded-md border border-gray-600 bg-transparent text-white 
               placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-700
               transition"
            placeholder="Enter blog content"
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
    </div>
  )
}

export default AddNewBlog