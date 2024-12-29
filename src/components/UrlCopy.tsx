'use client'
import { FaRegShareSquare } from 'react-icons/fa';
import { useState } from 'react';

const CopyUrlButton = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    // Get the current window URL
    const currentUrl = window.location.href;

    // Copy to clipboard
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      // Reset the copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    }).catch((error) => {
      console.error('Failed to copy: ', error);
    });
  };

  return (
    <div>
      <span
        onClick={handleCopyClick}
        className="flex mt-4 mb-3 items-center gap-2 bg-slate-700 py-1 px-3 rounded-lg hover:bg-slate-500 cursor-pointer"
      >
        <FaRegShareSquare /> {copied ? 'Copied!' : 'Share'}
      </span>
    </div>
  );
};

export default CopyUrlButton;
