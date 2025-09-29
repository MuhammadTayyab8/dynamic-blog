'use client'

import Alert from '@/components/Alert';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

interface BlogData {
    Id: number;
    Title: string;
    Author: string;
    CreationDate: string;
    ImageUrl: string;
    BlogContent: string;
    Category: string;
}

interface Pagination {
    currentPage: number;
    totalPages: number;
    totalRecords: number;
    perPage: number;
}


const Table = () => {

    const [blogData, setBlogData] = useState<BlogData[]>([])
    const [pagination, setPagination] = useState<Pagination | null>(null)
    const [page, setPage] = useState<number>(1)
    const [openPopupIndex, setOpenPopupIndex] = useState<number | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const dropdownRef = useRef(null)


    const router = useRouter()


    // =================== Model =====================
    const [alertData, setAlertData] = useState<{
        title: string;
        message: string;
        show: boolean;
    }>({ title: "", message: "", show: false });

    function showAlert(title: string, message: string) {
        setAlertData({ title, message, show: true });
    }

    // =================== Model =====================



    const fetchBlog = async () => {
        try {
            setIsLoading(true)

            const response = await fetch(`/api/blog?page=${page}`)
            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.error || 'Something Went Wrong')
            }

            setBlogData(result?.data)
            setPagination(result?.pagination)

        } catch (error) {
            console.error(error || 'Error')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchBlog()
    }, [page])




    const handleMoreClick = (idx: number) => {
        setOpenPopupIndex(openPopupIndex === idx ? null : idx);
    };


    const handleUpdate = (id: number) => {
        if(id) {
            router.push(`/admin/add-new-blog?Id=${id}`)
        }
    }


    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`/api/blog`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Id: id })
            })

            const result = await response.json()

            if (!response.ok) {
                showAlert("Error", result.error || 'Failed to delete')
                throw new Error(result.error || 'Failed to delete')
            }

            showAlert("Sccess", "Blog Deleted.")
            await fetchBlog()

        } catch (error) {
            console.error(error || 'Failed to delete')
        }
    }

    return (
        <div className='px-2 md:px-4 my-4'>
            {isLoading ?
                Array.from({ length: 10 }).map((_, idx) => (
                    <div
                        key={idx}
                        className="flex-shrink-0 bg-[#3A3A3C] gap-y-4 mb-2 rounded-lg shadow-md min-w-[300px] min-h-[60px] text-white animate-pulse"
                    >
                        <div className="flex items-center p-3 space-x-4">
                            {/* Text placeholders */}
                            <div className="flex flex-col space-y-2 w-full">
                                <div className="h-3 bg-gray-500/40 rounded w-3/4" /> {/* Title */}
                                <div className="h-3 bg-gray-500/30 rounded w-1/2" /> {/* Subtitle / Date */}
                            </div>
                        </div>
                    </div>
                ))
                :
                blogData.length > 0 ? (
                    <div className="overflow-auto rounded-lg shadow border border-gray-500 relative">
                        <table className="min-w-full table-auto text-sm text-left">
                            <thead className="sticky top-0 bg-slate-800 text-white text-xs sm:text-sm uppercase">
                                <tr className=''>

                                    <th className="p-3">Title</th>
                                    <th className="p-3">Author</th>
                                    <th className="p-3">Creation Date</th>
                                    <th className="p-3 ">Category</th>
                                    <th className="p-3 ">Action</th>

                                </tr>
                            </thead>
                            <tbody className='overflow-visible'>
                                {blogData.map((user, index) => {

                                    return (
                                        <tr
                                            key={index}
                                            className={`${index % 2 == 0 ? 'bg-[#1b1f26]' : ' bg-transparent'}`}

                                        >

                                            <td className="p-3">{user.Title}</td>
                                            <td className="p-3 capitalize"> {user.Author} </td>
                                            <td className="p-3 ">{user.CreationDate ? user.CreationDate : '---'}</td>
                                            <td className="p-3">
                                                {user.Category ? (
                                                    <div className="flex flex-wrap gap-2">
                                                        {user.Category.split(",").map((cat, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="px-2 py-1 text-xs font-medium rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30"
                                                            >
                                                                {cat.trim()}
                                                            </span>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    "---"
                                                )}
                                            </td>


                                            <td className='p-3 '>
                                                <div
                                                    className={`relative cursor-pointer w-5 sm:ml-5 `}

                                                    onClick={() => {
                                                        handleMoreClick(index)
                                                    }}
                                                >
                                                    <BsThreeDotsVertical size={22} />
                                                    {openPopupIndex === index && (
                                                        <div ref={dropdownRef} className="absolute right-4 top-0 bg-gray-800 z-50 rounded shadow-lg flex flex-col p-2 min-w-[100px]">

                                                            <button
                                                                onClick={() => handleUpdate(user.Id)}
                                                                className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-orange-700  text-white rounded"
                                                            >
                                                                Update
                                                            </button>

                                                            <button
                                                                onClick={(e) => {
                                                                    handleDelete(user.Id);
                                                                }}
                                                                className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-orange-700  text-white rounded"
                                                            >
                                                                Delete
                                                            </button>

                                                        </div>
                                                    )}
                                                </div>
                                            </td>

                                        </tr>
                                    );
                                })}
                            </tbody>


                            {pagination && (
                                <tfoot>
                                    <tr className="border-gray-500 border-t sticky shadow-lg bottom-0">
                                        <td colSpan={8} className="px-6 py-2">
                                            <div className="flex justify-between items-center w-full">
                                                {/* Pagination Controls (Left Side) */}
                                                <div className="flex space-x-2">
                                                    {/* Previous Button */}
                                                    <button
                                                        disabled={page <= 1}
                                                        onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
                                                        className="px-3 py-2 bg-slate-800 text-white rounded-md disabled:opacity-50 hover:bg-slate-700 transition"
                                                    >
                                                        <MdArrowBackIos />
                                                    </button>

                                                    {/* Page Numbers with Dynamic Pagination */}
                                                    {(() => {
                                                        const totalPages = pagination.totalPages;
                                                        const pageNumbers = [];
                                                        const maxVisible = 5;

                                                        if (totalPages <= maxVisible) {
                                                            // Show all if pages are ≤ maxVisible
                                                            for (let i = 1; i <= totalPages; i++) {
                                                                pageNumbers.push(i);
                                                            }
                                                        } else {
                                                            if (page <= 3) {
                                                                // Show first 3 pages + "..." + last page
                                                                pageNumbers.push(1, 2, 3, "...", totalPages);
                                                            } else if (page >= totalPages - 2) {
                                                                // Show first page + "..." + last 3 pages
                                                                pageNumbers.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
                                                            } else {
                                                                // Show first page + "..." + current page -/+ 1 + "..." + last page
                                                                pageNumbers.push(1, "...", page - 1, page, page + 1, "...", totalPages);
                                                            }
                                                        }

                                                        return pageNumbers.map((pageNum, i) => (
                                                            <button
                                                                key={i}
                                                                onClick={() => typeof pageNum === "number" && setPage(pageNum)}
                                                                className={`px-4 py-2 rounded-md transition font-medium ${page === pageNum
                                                                    ? "border-grsy-500 border-2 bg-bg-slate-800 text-white shadow-md"
                                                                    : "bg-slate-800 text-white hover:bg-slate-700"
                                                                    }`}
                                                                disabled={pageNum === "..."}
                                                            >
                                                                {pageNum}
                                                            </button>
                                                        ));
                                                    })()}

                                                    {/* Next Button */}
                                                    <button
                                                        disabled={page >= pagination.totalPages}
                                                        onClick={() => setPage((prevPage) => Math.min(prevPage + 1, pagination.totalPages))}
                                                        className="px-3 py-2 bg-slate-800 text-white rounded-md disabled:opacity-50 hover:bg-slate-700 transition"
                                                    >
                                                        <MdArrowForwardIos />
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tfoot>
                            )}

                        </table>

                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-10 text-lg font-medium">
                        No User found.
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

export default Table