'use client'

import React, { useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';
import "react-quill-new/dist/quill.snow.css";

// Dynamically import ReactQuill (no SSR)
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

interface EditorProps {
  content: string;
  setContent: (value: string) => void;
}

export const Editor: React.FC<EditorProps> = ({ content, setContent }) => {
  const editorRef = useRef<any>(null);

  const customImageHandler = () => {
    if (typeof document === "undefined") return;
    // Yeh hamesha client side pe chalega ab
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await fetch(`/api/uploads`, { method: "POST", body: formData });
        const data = await res.json();
        if (data.success) {
          const quill = editorRef?.current?.getEditor();
          const range = quill?.getSelection();
          quill?.insertEmbed(range?.index ?? 0, "image", data.url);
        }
      } catch (error) {
        console.error("Upload failed", error);
      }
    };
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'color': [] }, { 'background': [] }],
        ['clean']
      ],
      handlers: {
        image: customImageHandler,
      },
    },
  }), []);

  return (
    <div>
      <ReactQuill
      // @ts-ignore
        ref={editorRef}
        theme="snow"
        value={content}
        onChange={setContent}
        modules={modules}
      />
    </div>
  );
};
