import React from 'react'
import Statics from '../Statics'
import { IoAdd } from 'react-icons/io5'
import Link from 'next/link'

const AdminPanel = () => {
    return (
        <div>
            <Statics />

            <div className='flex justify-between px-4 items-center pt-4'>
                <h1 className='text-lg'>Blogs History</h1>
                <div className='flex cursor-pointer hover:bg-slate-700 transition-all duration-300 justify-between items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-md'>
                    <IoAdd className='text-white' />
                    <Link href='/admin/add-new-blog'><span className='hidden sm:flex'>Add New Blog</span></Link>
                </div>
            </div>


        </div>
    )
}

export default AdminPanel