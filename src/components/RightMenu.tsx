'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaBloggerB, FaRegNewspaper, FaLinkedin, FaBehanceSquare } from 'react-icons/fa';


const RightMenu = () => {
  const pathname = usePathname();

  return (
    <div>
      {/* Mobile Bottom Menu */}
      <div className="fixed bottom-0 w-full sm:hidden bg-[#0a0a0a] z-50">
        <ul className="flex justify-between items-center w-full sm:py-0 sm:px-0 px-4 py-2">
          {/* Home Link */}
          <li
            className={`flex flex-col items-center text-sm ${pathname === '/' ? 'text-white' : 'text-slate-300'
              }`}
          >
            <Link href="/" className="flex flex-col items-center">
              <FaHome className="w-6 h-6" />
              Home
            </Link>
          </li>

          {/* Blogs Link */}
          <li
            className={`flex flex-col items-center text-sm ${pathname === '/blogs' ? 'text-white' : 'text-slate-300'
              }`}
          >
            <Link href="/blogs" className="flex flex-col items-center">
              <FaBloggerB className="w-6 h-6" />
              Blogs
            </Link>
          </li>

          {/* News Link */}
          <li
            className={`flex flex-col items-center text-sm ${pathname === '/news' ? 'text-white' : 'text-slate-300'
              }`}
          >
            <Link href="/news" className="flex flex-col items-center">
              <FaRegNewspaper className="w-6 h-6" />
              News
            </Link>
          </li>
        </ul>
      </div>


      {/* Desktop Sidebar Menu */}
      <div className="fixed hidden sm:block sm:top-[62px]  lg:top-[52px] left-0 w-52 h-screen bg-navbar border-r border-gray-700 z-40">
        <ul className="flex flex-col space-y-4 py-8 px-4">
          {/* Home Link */}
          <li
            className={`text-sm ${pathname === '/' ? 'bg-gray-700 rounded-md' : ''
              }`}
          >
            <Link href="/" className="flex items-center gap-2 px-3 py-2">
              <FaHome className="w-5 h-5" />
              Home
            </Link>
          </li>

          {/* Blogs Link */}
          <li
            className={`text-sm ${pathname === '/blogs' ? 'bg-gray-700 rounded-md' : ''
              }`}
          >
            <Link href="/blogs" className="flex items-center gap-2 px-3 py-2">
              <FaBloggerB className="w-5 h-5" />
              Blogs
            </Link>
          </li>

          {/* News Link */}
          <li
            className={`text-sm ${pathname === '/news' ? 'bg-gray-700 rounded-md' : ''
              }`}
          >
            <Link href="/news" className="flex items-center gap-2 px-3 py-2">
              <FaRegNewspaper className="w-5 h-5" />
              News
            </Link>
          </li>
        </ul>

        <h2 className='pl-6 font-bold text-slate-500'>Categories</h2>
       <Link href='/technology'><p className='flex pl-6 gap-2 items-center pt-2'>Technology</p></Link> 
       <Link href='/education'><p className='flex pl-6 gap-2 items-center pt-2'> Education</p></Link>
       <Link href='/designing'><p className='flex pl-6 gap-2 items-center pt-2'> Designing</p></Link>

        <h2 className='pl-6 font-bold text-slate-500 pt-6'>Let&apos;s Connect</h2>
        <Link href='https://www.linkedin.com/authwall?trk=bf&trkInfo=AQGx1EiLjJ6b9QAAAZQQ1Fsg9D_UDgp2V4_h4CKnccSiKhUAC8ct4tZRkf-GVn2C4PMPf-2icDGq3mWWySxk_diDVe68Qs39SQYAfnOsF-Wa8cudYkYkMCVQQa9ClCxMrGggGUI=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fmuhammad-tayyab-982a25290%3Futm_source%3Dshare%26utm_campaign%3Dshare_via%26utm_content%3Dprofile%26utm_medium%3Dandroid_app'> <p className='flex pl-6 gap-2 items-center pt-2 cursor-pointer'><FaLinkedin /> Linkedin</p></Link>
       <Link href='https://www.behance.net/Mtayyabdesigner'> <p className='flex pl-6 gap-2 items-center pt-2 cursor-pointer'><FaBehanceSquare /> Behance</p></Link>

      </div>
    </div>
  );
};

export default RightMenu;
