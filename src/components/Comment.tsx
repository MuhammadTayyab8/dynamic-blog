'use client';

import { useState } from 'react';

type Comment = {
  id: number;
  name: string;
  text: string;
  date: string;
};

const CommentsSection = () => {
  const [comments, setComments] = useState<Comment[]>([]); // State for comments
  const [name, setName] = useState(''); // State for user name input
  const [text, setText] = useState(''); // State for comment input

  const handleAddComment = () => {
    if (name.trim() && text.trim()) {
      const newComment: Comment = {
        id: Date.now(), // Unique ID based on timestamp
        name,
        text,
        date: new Date().toLocaleString(), // Current date & time
      };

      setComments((prev) => [newComment, ...prev]); // Add new comment to the top
      setName(''); // Clear input fields
      setText('');
    }
  };

  return (
    <div className="sm:p-4 max-w-xl mx-auto mb-16">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>

      {/* Add Comment Form */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2 text-white bg-slate-700"
        />
        <textarea
          placeholder="Your Comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2 text-white bg-slate-700"
          rows={3}
        ></textarea>
        <button
          onClick={handleAddComment}
          className="flex mt-4 mb-3 items-center gap-2 bg-slate-700 py-2 px-4 rounded-lg hover:bg-slate-500"
        >
          Add Comment
        </button>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 border border-slate-500 shadow-[0_15px_40px_-15px_rgba(169,169,169,0.3)] hover:shadow-none cursor-pointer rounded-2xl"
            >
              <h3 className="font-bold">{comment.name}</h3>
              <p className="text-sm text-gray-500">{comment.date}</p>
              <p className="mt-2">{comment.text}</p>
            </div>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default CommentsSection;
