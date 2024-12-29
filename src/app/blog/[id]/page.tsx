import React from "react";
import { FaUser, FaRegShareSquare, FaEye, FaSpinner } from 'react-icons/fa';
import { useState } from "react";
import { useEffect } from "react";
import Comment from '@/components/Comment'
import CopyUrlButton from "@/components/UrlCopy";


type PostDetail = {
  author_name: string;
  date: string | number | Date;
  title: { rendered: string };
  content: { rendered: string }; // Add the content field
};

const PostDetailPage = async ({ params }: { params: { id: string } }) => {
  try {
    // Fetch the individual post by its ID
    const res = await fetch(
      `https://dev-codescode.pantheonsite.io/wp-json/wp/v2/posts/${params.id}?_=${Date.now()}`,
      { cache: 'no-store' }
    );
    
    if (!res.ok) {
      throw new Error('Post not found');
    }

    const post: PostDetail = await res.json(); // Type the post object correctly

    

    return (
      <div>
        <div className="py-3 px-1 md:p-5 mb-14 rounded-3xl border-b border-slate-500">
          <div className="pt-2 pb-3 flex items-center gap-2 text-lg">
            <FaUser /> <span className="text-sm">{post.author_name || 'Muhammad Tayyab'}</span>
          </div>
          <h1 className="text-2xl font-bold md:text-3xl pb-5" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          <div className="text-sm mb-2 text-slate-400">
            <p>{new Date(post.date).toLocaleDateString()}</p>
          </div>
          <div className="rounded-3xl" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
          <div className="flex justify-between mt-3 cursor-pointer">
<CopyUrlButton/>
          </div>
        </div>

<Comment/>

      </div>
    );
  } catch {
    return (
      <div>
        <h1>Post not found</h1>
        <p>Sorry, the post you are looking for doesn't exist.</p>
      </div>

    );
  }
};

export default PostDetailPage;

  