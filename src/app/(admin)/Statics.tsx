import React from "react";
import { FaBlog, FaComments, FaCalendarAlt, FaRegComments } from "react-icons/fa";
import { IoCalendarNumberOutline } from "react-icons/io5";

import { Ubuntu_Mono } from "next/font/google";

const ubuntu_mono = Ubuntu_Mono({
    subsets: ["latin"],
    weight: ["400", '700']
})

const Statics = () => {
    const stats = [
        {
            title: "Total Blogs",
            value: "124",
            icon: <FaBlog className="w-6 h-6" />,
            color: "bg-[#1b1f26] border border-gray-500"
        },
        {
            title: "Total Comments",
            value: "876",
            icon: <FaRegComments className="w-6 h-6" />,
            color: "bg-[#1b1f26] border border-gray-500"

        },
        {
            title: "Blogs",
            value: "12",
            icon: <IoCalendarNumberOutline className="w-6 h-6 " />,
            color: "bg-[#1b1f26] border border-gray-500"
        },
        {
            title: "Comments",
            value: "45",
            icon: <FaRegComments className="w-6 h-6 " />,
            color: "bg-[#1b1f26] border border-gray-500"
        },
    ];

    return (
        <div className="w-full overflow-x-auto sm:overflow-hidden py-4">
            <div className="flex gap-4 px-2 sm:grid sm:grid-cols-4">
                {stats.map((stat, idx) => (
                    <div
                        key={idx}
                        className={`relative min-h-[120px] min-w-[220px] sm:min-w-0 flex flex-col px-4 justify-center 
              p-4 rounded-2xl shadow-md ${stat.color}`}
                    >
                        <div className="mb-2 bg-orange-700 text-white absolute top-2 right-2 rounded-full p-2 text-xl flex items-center justify-center">{stat.icon}</div>

                        <p className={` ${ubuntu_mono.className} text-lg text-left text-white mt-1`}>{stat.title}</p>
                        <h3 className="text-sm text-left font-semibold text-gray-300">{stat.value}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Statics;
