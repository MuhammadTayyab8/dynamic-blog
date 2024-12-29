// 'use client'

// import React, { useState } from "react";

// // Highlight function that will wrap matching words with a span
// const highlightText = (text: string, searchQuery: string) => {
//   if (!searchQuery) return text; // If no search query, return the original text

//   // Create a regex to match the search term (case-insensitive)
//   const regex = new RegExp(`(${searchQuery})`, "gi");

//   return text.split(regex).map((part, index) => 
//     part.toLowerCase() === searchQuery.toLowerCase() ? (
//       <span key={index} className="bg-yellow-300">{part}</span> // Highlight matched text
//     ) : (
//       part
//     )
//   );
// };

// const SearchBar: React.FC<{ content: string }> = ({ content }) => {
//   const [searchQuery, setSearchQuery] = useState<string>("");

//   // Handle change in the search input
//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//   };

//   return (
//     <div>
//       {/* Search Bar */}
//       <div className="flex items-center gap-3 rounded-full px-4 py-3 max-w-full lg:max-w-2xl w-full bg-slate-800 shadow-sm hover:shadow-md transition-shadow duration-200 lg:order-none order-3">
//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchQuery}
//           onChange={handleSearchChange}
//           className="flex-grow outline-none text-gray-300 placeholder-gray-200 bg-transparent text-sm"
//         />
//       </div>

//       {/* Render content with highlighted search query */}
//       <div className="content mt-4">
//         <p>{highlightText(content, searchQuery)}</p>
//       </div>
//     </div>
//   );
// };

// export default SearchBar;
