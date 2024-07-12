// "use client";

import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { Button } from "./ui/button";
import { FaPlus } from "react-icons/fa";
import Typography from "./ui/typography";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import ImageUpload from "./image-upload";
import slugify from "slugify";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCreateWorkPlaceValues } from "@/hooks/create-workplace-values";
import { createWorkPlace } from "@/actions/create-workplace";
import { useState } from "react";

const CreateWorkPlace = () => {
  const router = useRouter();
  const { imageUrl, updateImageUrl } = useCreateWorkPlaceValues();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const FormSchema = z.object({
    name: z
      .string()
      .min(2, { message: "Workplace name should be at least 2 characters." }),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  const onSubmit = async ({ name }: z.infer<typeof FormSchema>) => {
    const slug = slugify(name, { lower: true });
    const invite_code = uuidv4();

    setIsSubmitting(true);

    const result = await createWorkPlace({
      name,
      slug,
      inviteCode: invite_code,
      imageUrl,
    });

    setIsSubmitting(false);

    if (result?.error) {
      console.log(result.error);
    }
    form.reset();
    updateImageUrl("");
    setIsOpen(false);
    router.refresh();
    toast.success("Workplace is created succesfully.");
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => setIsOpen((prevValue) => !prevValue)}
    >
      <DialogTrigger>
        <div className="flex items-center gap-2 p-2">
          <Button variant="secondary">
            <FaPlus />
          </Button>
          <Typography varient="p" className="text-sm " text="Add workplace" />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="my-4">
            <Typography varient="p" text="Create Work Place." />
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Typography varient="p" text="Name" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your company or team name."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    <Typography
                      varient="p"
                      text="This is your workplace name."
                    />
                  </FormDescription>
                  <FormMessage> </FormMessage>
                </FormItem>
              )}
            ></FormField>
            <ImageUpload />
            <Button type="submit" className="bg-white text-black w-full">
              <Typography varient="p" text="Submit" />
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkPlace;
