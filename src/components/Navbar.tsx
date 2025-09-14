'use client';

import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { DiCode } from 'react-icons/di';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="fixed flex z-50 w-screen overflow-x-hidden bg-[#1b1f26] flex-wrap lg:flex-nowrap justify-between items-center py-3 px-4 lg:px-8 text-white border-b border-gray-500">
        {/* Logo */}
        <div className="text-[18px] lg:text-[24px] font-bold flex justify-center items-center">
          <DiCode className="w-9 h-auto text-slate-300" />
          Codes<span className="text-slate-300">blog</span>
        </div>

        {/* Profile Icon */}
        <div className="">
          <FaUserCircle
            className="text-gray-300 w-8 h-8 cursor-pointer"
            onClick={handleToggleModal}
          />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black opacity-60 z-40"
            onClick={handleCloseModal}
          ></div>

          {/* Modal Content */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#1b1f26] text-white p-6 rounded shadow-lg z-50 w-[90%] max-w-[400px]">
            <div className="text-[18px] lg:text-[24px] font-bold flex justify-center items-center">
              <DiCode className="w-9 h-auto text-slate-300" />
              Codes<span className="text-slate-300">blog</span>
            </div>
            <p className="text-gray-400 text-sm mt-4 text-center">
              You are using <strong>Codesblog</strong>.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
