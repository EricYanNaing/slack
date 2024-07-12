import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import Typography from "./ui/typography";
import {
  Form,
  FormControl,
  FormDescription,
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
import { toast } from "sonner";
import { createChannel } from "@/actions/channel";
import { useRouter } from "next/navigation";

const CreateChannelDialog: FC<{
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  workplaceId: string;
  userId: string;
}> = ({ dialogOpen, setDialogOpen, userId, workplaceId }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const formSchema = z.object({
    name: z
      .string()
      .min(2, { message: "Channel must have at lesat 2 characters long." }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async ({ name }: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);

      await createChannel({
        name,
        userId,
        workplaceId,
      });

      //Create Channel

      router.refresh();

      setIsSubmitting(false);
      setDialogOpen(false);
      form.reset();
      toast.success("Channel is created successfully.");
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };
  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={() => setDialogOpen((prevState) => !prevState)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="my-4">
            <Typography text="Create a channel" varient="h3" />
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Typography text="Create a channel" varient="p" />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Channel Name" {...field} />
                  </FormControl>
                  <FormDescription className="my-3">
                    <Typography
                      text="This is your channel name."
                      varient="p"
                      className="mb-3"
                    />
                  </FormDescription>
                  <FormMessage className="mb-3" />
                </FormItem>
              )}
            />
            <Button
              disabled={isSubmitting}
              type="submit"
              className="w-full text-white text-center mt-3"
            >
              {isSubmitting ? "Creating.." : "Create"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChannelDialog;
