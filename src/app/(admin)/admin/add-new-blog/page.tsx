import React, { useState } from 'react'
import AddBlog from './Form'

const AddNewBlog = () => {

  const [formData, setFormData] = useState({authorName: '', title: '', imageUrl: '', blogData:''})


  return (
    <div className='px-4 py-2'>

      <div className='text-xl font-medium'>Add New Blog</div>

      {/* # ================ form ================== #  */}

      {/* ==== author name ====  */}
      

        {/* <AddBlog /> */}
    </div>
  )
}

export default AddNewBlog