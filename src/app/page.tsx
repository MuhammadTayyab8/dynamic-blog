'use client'
import { useState } from "react";
import Blog from "@/components/Home";
import Image from "next/image";
import Hero from '../../punlic/herp.jpg';
import AllBlog from '@/components/AllBlog';
import Technology from '@/components/Technology';
import Education from '@/components/Education';
import Designing from '@/components/Designing';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Function to render the appropriate component based on the active category
  const renderContent = () => {
    switch (activeCategory) {
      case "Technology":
        return <Technology />;
      case "Education":
        return <Education />;
      case "Designing":
        return <Designing />;
      default:
        return <AllBlog />;
    }
  };

  return (
    <div>
      <div className="p-1 pb-0 pt-4 pr-2 md:p-6 md:pb-2 md:pr-4 overflow-auto">
        {/* Hero Section */}
        <div className="relative h-[260px] rounded-2xl overflow-hidden">
          <Image
            src={Hero}
            alt="Hero Image"
            className="object-cover h-full w-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h1 className="text-white text-2xl md:text-4xl font-bold text-center px-4">
              Welcome to CodesBlog Explore, Learn, and Grow!
            </h1>
          </div>
        </div>

        {/* Category Menu */}
        <div className="flex items-center lg:gap-10 pt-4 md:pt-5 gap-6 overflow-x-auto whitespace-nowrap cursor-pointer scroll-smooth scrollbar-hide">
          {["All", "Technology", "Education", "Designing"].map((category) => (
            <h2
              key={category}
              onClick={() => setActiveCategory(category)} // Update active category on click
              className={`${
                activeCategory === category
                  ? "bg-slate-600 font-semibold"
                  : "bg-slate-800 hover:bg-slate-700"
              } md:px-8 px-3 md:py-2 py-1 rounded-md  flex-shrink-0`}
            >
              {category}
            </h2>
          ))}
        </div>
      </div>

      {/* Render Content Based on Active Category */}
      <div>{renderContent()}</div>
    </div>
  );
}
