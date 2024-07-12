"use client";

import React from "react";
import { FiPlus } from "react-icons/fi";
import { useEditor } from "@tiptap/react";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import StarterKit from "@tiptap/starter-kit";
import PlaceHolder from "@tiptap/extension-placeholder";
import MenuBar from "./menu-bar";

const TextEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      PlaceHolder.configure({ placeholder: `Message #${""} ?? 'username'` }),
    ],
  });
  return (
    <div className="p-1 border bg-white dark:border-zinc-500 border-neutral-700 relative rounded-md overflow-hidden">
      <div className="sticky top-0 z-10">
        {editor && <MenuBar editor={editor} />}
      </div>
      <div className="h-[150px] pt-11 flex w-full grow-1"></div>
      <div className="absolute top-4 z-10 right-3 bg-black dark:bg-white cursor-pointer duration-500 hover:scale-110 text-white grid place-content-center rounded-full w-6 h-6 ">
        <FiPlus size={20} className="dark:text-black" />
      </div>

      <Button
        size="sm"
        className="absolute bottom-1 right-1 border border-black hover:text-white hover:border-white  bg-white text-black"
      >
        <Send />
      </Button>
    </div>
  );
};

export default TextEditor;
