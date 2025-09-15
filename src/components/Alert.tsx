import React, { useState } from "react";

type AlertProps = {
  title: string;
  message: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Alert: React.FC<AlertProps> = ({ title, message, setIsOpen }) => {


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Alert Box */}
      <div className="relative bg-[#1f2937] text-white rounded-xl shadow-lg w-[90%] max-w-md p-6 z-10">
        <h2 className="text-lg font-semibold text-gray-100">{title}</h2>
        <p className="mt-2 text-sm text-gray-300">{message}</p>

          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-500 rounded-md text-sm font-medium transition"
            >
              OK
            </button>
          </div>

      </div>
    </div>
  );
};

export default Alert;
