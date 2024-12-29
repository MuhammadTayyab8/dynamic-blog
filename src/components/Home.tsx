'use client'

import Image from 'next/image';
import { FaUser, FaRegShareSquare, FaEye,  } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import Link from 'next/link';
// import { FaSpinner } from 'react-icons/fa'; // Example spinner from react-icons

// const Spinner = () => (
// <div className="flex items-center justify-center h-[280px] w-screen">
//   <FaSpinner className="animate-spin text-slate-600 text-4xl" />
// </div>

// );

const SkeletonCard = () => (
  <div className="border border-gray-700 w-[290px] md:w-[240px] h-[450px] lg:w-[320px] p-3 py-6 rounded-2xl mt-6 flex flex-col gap-4 justify-between">
    <div className="w-full h-8 bg-gray-700 rounded animate-pulse"></div>
    <div className="w-3/4 h-6 bg-gray-700 rounded animate-pulse"></div>
    <div className="w-full h-40 bg-gray-700 rounded animate-pulse"></div>
    <div className="w-1/2 h-8 bg-gray-700 rounded animate-pulse"></div>
  </div>
);




type Post = {
  author_name: string;
  date: string | number | Date;
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  featured_media: number;
  imageUrl: string | null;
};

const PostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const postsRes = await fetch(
        'https://dev-codescode.pantheonsite.io/wp-json/wp/v2/posts?per_page=50&_=' + Date.now(),
        { cache: 'no-store' }
      );
      
      if (!postsRes.ok) throw new Error('Failed to fetch posts');
      const postsData: Post[] = await postsRes.json();

      const updatedPosts = await Promise.all(
        postsData.map(async (post) => {
          if (post.featured_media) {
            const mediaRes = await fetch(
              `https://dev-codescode.pantheonsite.io/wp-json/wp/v2/media/${post.featured_media}`
            );
            if (mediaRes.ok) {
              const media = await mediaRes.json();
              return { ...post, imageUrl: media.source_url };
            }
          }
          return { ...post, imageUrl: '/fallback-image.jpg' }; // Use fallback image if no media
        })
      );

      setPosts(updatedPosts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(); // Load posts only once
  }, []);

  return (
    <div className="p-1 pr-2 md:p-6 md:pr-4 pb-28 overflow-auto">
      {/* Hero Section */}
     

      <div className="flex flex-wrap justify-center sm:justify-between">
  {loading ? (
    // <Spinner />
    <div className="flex flex-wrap gap-2 justify-center sm:justify-between">
    {Array(9)
      .fill(0)
      .map((_, index) => (
        <SkeletonCard key={index} />
      ))}
  </div>
  ) : posts.length > 0 ? (
    <>
      {posts.map((post) => (
        <Link key={post.id} href={`/blog/${post.id}`}>
        <div
          key={post.id}
          className="border border-gray-700 w-[290px] md:w-[240px] h-[450px] lg:w-[320px] p-3 rounded-2xl mt-6 cursor-pointer flex flex-col justify-between"
        >
          

          <div className="pt-2 pb-3 flex items-center gap-2 text-lg">
            <FaUser /> <span className="text-sm">{post.author_name || 'Muhammad Tayyab'}</span>
          </div>
          <div className="text-xl md:text-2xl font-sans font-bold mb-2">
            <h1>{post.title.rendered}</h1>
          </div>
          <div className="text-sm mb-2 text-slate-400">
            <p>{new Date(post.date).toLocaleDateString()}</p>
          </div>
          <div>
            <Image
              src={post.imageUrl || '/fallback-image.jpg'}
              alt="blog image"
              className="rounded-xl w-[320px] h-[200px] object-cover"
              width={320}
              height={200}
            />
          </div>
          <div className="flex justify-between mt-3 cursor-pointer">
            <span className="flex items-center gap-2 bg-slate-700 py-1 px-3 rounded-lg hover:bg-slate-500">
              <FaRegShareSquare /> Share
            </span>
            <span className="flex items-center gap-2 bg-slate-700 py-1 px-3 rounded-lg hover:bg-slate-500">
              <FaEye /> View
            </span>
          </div>
        
        </div>
        </Link>
      ))}


    </>
  ) : (
    <p>No posts available.</p>
  )}
</div>


    </div>
  );
};

export default PostsPage;
