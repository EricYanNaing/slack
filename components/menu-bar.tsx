import { Editor } from "@tiptap/react";
import { Bold, Italic, Strikethrough } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { BsEmojiSmile } from "react-icons/bs";

const MenuBar = ({ editor }: { editor: Editor }) => {
  const { resolvedTheme } = useTheme();
  return (
    <div className="flex items-center flex-wrap gap-2 absolute z-10 top-0 left-0 w-full p-2 rounded-sm text-white bg-primary">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "border-white" : "border-black"}
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("italic") ? "border-white" : "border-black"}
      >
        <Italic className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("strike") ? "border-white" : "border-black"}
      >
        <Strikethrough className="w-4 h-4" />
      </button>
      <Popover>
        <PopoverTrigger>
          <button className="mt-2">
            <BsEmojiSmile size={20} />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-fit p-0">
          <Picker
            theme={resolvedTheme}
            data={data}
            onEmojiSelect={(emoji: any) =>
              emoji.chain().focus().insertContent(emoji.native).run()
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MenuBar;
