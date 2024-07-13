"use client";

import { Channel, User, Workplace } from "@/types/app";
import { FC, useState } from "react";
import { v4 as uuid } from "uuid";
import { Card, CardContent } from "./ui/card";
import { File } from "lucide-react";
import Typography from "./ui/typography";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { supabaseBrowserClient } from "@/lib/supabase/supabaseClient";
import { toast } from "sonner";

type ChatFileUploadProps = {
  userData: User;
  workplaceData: Workplace;
  channel: Channel;
  toggleFileUploadModal: () => void;
};

const FormSchema = z.object({
  file: z
    .instanceof(FileList)
    .refine((files) => files?.length === 1, { message: " File is required." })
    .refine((files) => {
      const file = files?.[0];
      return (
        file?.type === "application/pdf" || file?.type.startsWith("image/")
      );
    }, "File must be image or pdf"),
});

const ChatFileUpload: FC<ChatFileUploadProps> = ({
  channel,
  workplaceData,
  userData,
  toggleFileUploadModal,
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      file: undefined,
    },
  });

  const imageRef = form.register("file");

  async function handleUpload(values: z.infer<typeof FormSchema>) {
    setIsUploading(true);
    const uniqueId = uuid();
    const file = values.file?.[0];
    if (!file) return;

    const supabase = supabaseBrowserClient;

    let fileTypePrefix = "";
    if (file.type === "application/pdf") {
      fileTypePrefix = "pdf";
    } else if (file.type.startsWith("image/")) {
      fileTypePrefix = "img";
    }

    const fileName = `chat/${fileTypePrefix}-${uniqueId}`;

    const { data, error } = await supabase.storage
      .from("chat-files")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.log("Error uploading file", error);
      return { error: error.message };
    }

    let messageInsertError;

    const { data: channelMessageData, error: cmError } = await supabase
      .from("messages")
      .insert({
        file_url: data.path,
        user_id: userData.id,
        channel_id: channel?.id,
        workspace_id: workplaceData.id,
      });

    if (error) {
      console.log("Error inserting message", messageInsertError);
      return { error: error.message };
    }

    setIsUploading(false);
    toggleFileUploadModal();
    toast.success("File uploaded successfully");
    form.reset();
  }
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="border border-dashed border-gray-200 flex flex-col rounded-lg gap-1 p-6 items-center">
          <File className="h-12 w-12" />
          <span className="text-sm  font-medium text-white">
            <Typography text="Drag & Drop your file here." varient="p" />
          </span>
        </div>

        <div className="space-y-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleUpload)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="file" className="text-sm font-medium">
                      File
                    </FormLabel>

                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*,application/pdf"
                        {...imageRef}
                        placeholder="Choose a file"
                        onChange={(event) =>
                          field.onChange(event.target?.files)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isUploading} size="lg">
                <Typography text="Upload" varient="p" />
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatFileUpload;
