"use client";

import { registerWithEmail } from "@/actions/register-with-email";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Typography from "@/components/ui/typography";
import { supabaseBrowserClient } from "@/lib/supabase/supabaseClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { Provider } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsSlack } from "react-icons/bs";
import { MdOutlineAutoAwesome } from "react-icons/md";
import { RxGithubLogo } from "react-icons/rx";
import { z } from "zod";

const AuthPage = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const getCurrentUser = async () => {
      const {
        data: { session },
      } = await supabaseBrowserClient.auth.getSession();
      if (session) {
        return router.push("/");
      }
    };

    getCurrentUser();
    setIsMounted(true);
  }, [router]);

  const formSchema = z.object({
    email: z
      .string()
      .email()
      .min(2, { message: "Email must be 2 characters." }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsAuth(true);

    const response = await registerWithEmail(values);
    const { data, error } = JSON.parse(response);

    setIsAuth(false);

    if (error) {
      console.warn("Sign In Error", error);
      return;
    }
  };

  const socialAuth = async (provider: Provider) => {
    setIsAuth(true);
    await supabaseBrowserClient.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    setIsAuth(false);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen p-5 grid text-center place-content-center bg-white">
      <div className="max-w-[450px]">
        <div className="flex justify-center items-center gap-3 mb-4">
          <BsSlack size={30} />
          <Typography text="Slack" varient="h2" />
        </div>

        <Typography
          text="Sign into your account."
          varient="h2"
          className="mb-3"
        />

        <Typography
          text="Please use email address to sign in."
          varient="p"
          className="opacity-90 mb-7"
        />

        <div className="flex flex-col space-y-4">
          <Button
            variant="outline"
            className="py-6 border-2 flex space-x-3"
            onClick={() => socialAuth("github")}
          >
            <RxGithubLogo size={30} />
            <Typography text="Sign in with GitHub" varient="p" />
          </Button>
        </div>

        <div>
          <div className="flex items-center my-6 ">
            <div className="mr-[10px] flex-1 bg-neutral-300 " />
            <Typography text="OR" varient="p" />
            <div className="mr-[10px] flex-1 bg-neutral-300 " />
          </div>
        </div>

        {/* Login Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <fieldset disabled={isAuth}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="example@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={isAuth}
                variant="secondary"
                className="bg-black hover:bg-black/90 text-white w-full my-5"
                type="submit"
              >
                <Typography text="Sign in with email." varient="p" />
              </Button>

              <div className="px-5 py-4 bg-gray-100 rounded-sm">
                <div className="text-gray-500 flex items-center space-x-3">
                  <MdOutlineAutoAwesome size={30} />
                  <Typography
                    text="Magic link sign-in with passwords free."
                    varient="p"
                  />
                </div>
              </div>
            </fieldset>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AuthPage;
