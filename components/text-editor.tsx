"use client";

import React, { FC, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { EditorContent, useEditor } from "@tiptap/react";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import axios from "axios";
import StarterKit from "@tiptap/starter-kit";
import PlaceHolder from "@tiptap/extension-placeholder";
import MenuBar from "./menu-bar";
import { Channel, User, Workplace } from "@/types/app";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import ChatFileUpload from "./chat-file-upload";

type TextEditorProps = {
  apiUrl: string;
  type: "Channel" | "DirectMessage";
  channel?: Channel;
  workplaceData: Workplace;
  userData: User;
  recipientId?: string;
};

const TextEditor: FC<TextEditorProps> = ({
  apiUrl,
  type,
  channel,
  workplaceData,
  userData,
  recipientId,
}) => {
  const [content, setContent] = useState("");
  const [fileUploadModal, setFileUploadModal] = useState(false);

  const toggleFileUploadModal = () => {
    setFileUploadModal((prevState) => !prevState);
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      PlaceHolder.configure({
        placeholder: `Message #${
          type === "Channel" ? channel?.name : "username"
        }`,
      }),
    ],
    autofocus: true,
    content,
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
  });

  //send messge
  const handleSend = async () => {
    if (content.length < 2) return;
    try {
      const payload = {
        content,
        type,
      };

      let endpoint = apiUrl;

      if (type === "Channel" && channel) {
        endpoint += `?channelId=${channel.id}&workplaceId=${workplaceData.id}`;
      } else if (type === "DirectMessage" && recipientId) {
        endpoint += `?recipientId=${recipientId}&workplaceId=${workplaceData.id}`;
      }

      await axios.post(endpoint, payload);

      setContent("");
      editor?.commands.setContent("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-1 border bg-white dark:border-zinc-500 border-neutral-700 relative rounded-md overflow-hidden">
      <div className="sticky top-0 z-10">
        {editor && <MenuBar editor={editor} />}
      </div>
      <div className="h-[150px] pt-11 flex w-full grow-1">
        <EditorContent
          className="w-full h-full overflow-y-hidden leading-1.15] "
          editor={editor}
        />
      </div>
      <div className="absolute top-4 z-10 right-3 bg-black dark:bg-white cursor-pointer duration-500 hover:scale-110 text-white grid place-content-center rounded-full w-6 h-6 ">
        <FiPlus
          onClick={toggleFileUploadModal}
          size={20}
          className="dark:text-black"
        />
      </div>

      <Button
        onClick={handleSend}
        disabled={content.length < 2}
        size="sm"
        className="absolute bottom-1 right-1 border border-black hover:text-white hover:border-white  bg-white text-black"
      >
        <Send />
      </Button>

      <Dialog onOpenChange={toggleFileUploadModal} open={fileUploadModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>File Upload</DialogTitle>
            <DialogDescription>
              Upload a file to share with your team.
            </DialogDescription>
          </DialogHeader>

          <ChatFileUpload
            userData={userData}
            workplaceData={workplaceData}
            channel={channel}
            recipientId={recipientId}
            toggleFileUploadModal={toggleFileUploadModal}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TextEditor;
