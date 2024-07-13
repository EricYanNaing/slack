"use client";

import slugify from "slugify";
import { v4 as uuid } from "uuid";

import ImageUpload from "@/components/image-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Typography from "@/components/ui/typography";
import { useCreateWorkPlaceValues } from "@/hooks/create-workplace-values";
import React, { useState } from "react";
import { createWorkPlace } from "@/actions/create-workplace";
import { error } from "console";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CreateWorkPlace = () => {
  const { currStep } = useCreateWorkPlaceValues();

  let stepInView = null;

  switch (currStep) {
    case 1:
      stepInView = <Step1 />;
      break;
    case 2:
      stepInView = <Step2 />;
      break;
    default:
      stepInView = <Step1 />;
  }
  return (
    <div className="w-screen h-screen grid place-content-center  bg-black text-white">
      <div className="p-3 max-w-[500px]">
        <Typography
          varient="p"
          className="text-400"
          text={`step ${currStep} of 2`}
        />

        {stepInView}
      </div>
    </div>
  );
};

export default CreateWorkPlace;

const Step1 = () => {
  const { name, updateValues, setCurrStep } = useCreateWorkPlaceValues();

  return (
    <>
      <Typography
        text="What is the name of your company or team."
        className="my-4"
      />

      <Typography
        text="This will be the name of your Slack WorkPlace - choose something that you team will recognize."
        className="text-300"
        varient="p"
      />

      <form className="mt-4">
        <fieldset>
          <Input
            className="text-white border-gray-600"
            type="text"
            value={name}
            placeholder="Enter your company name."
            onChange={(event) => updateValues({ name: event.target.value })}
          />

          <Button
            disabled={!name}
            className="mt-10 w-full"
            onClick={() => setCurrStep(2)}
          >
            <Typography text="Next" className="text-white" varient="p" />
          </Button>
        </fieldset>
      </form>
    </>
  );
};

const Step2 = () => {
  const { setCurrStep, updateImageUrl, imageUrl, name } =
    useCreateWorkPlaceValues();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  // WORKPLACE CREATE FUNC
  const handleSubmit = async () => {
    setIsSubmitting(true);
    const slug = slugify(name);
    const inviteCode = uuid();
    const error = await createWorkPlace({ imageUrl, name, slug, inviteCode });
    setIsSubmitting(false);
    if (error?.error) {
      console.log(error);
      return toast.error("Couldn't create Workplace. Please try again.");
    }
    toast.success("Workplace created successfully");
    router.push("/");
  };

  return (
    <>
      <Button
        size="sm"
        className="text-white bg-primary"
        variant="link"
        onClick={() => setCurrStep(1)}
      >
        {" "}
        <Typography text="Back" varient="p" />
      </Button>

      <form>
        <Typography text="Add workplace avatar." className="my-4" />
        <Typography
          text="Image can be chaged later in your workplace setting."
          className="my-4 text-gray-300"
          varient="p"
        />

        <fieldset
          disabled={isSubmitting}
          className="mt-6 flex flex-col items-center space-y-9"
        >
          <ImageUpload />
          <div className="space-x-5">
            <Button
              onClick={() => {
                updateImageUrl("");
                handleSubmit();
              }}
            >
              <Typography
                text="Skip for now."
                className="my-4 text-white"
                varient="p"
              />
            </Button>

            {imageUrl ? (
              <Button
                type="button"
                className="bg-red-500"
                onClick={handleSubmit}
                size="sm"
              >
                <Typography
                  text="Create Work Place"
                  className="my-4 text-white"
                  varient="p"
                />
              </Button>
            ) : (
              <Button type="button" size="sm" className="bg-gray-300">
                <Typography
                  text="Select an image."
                  className="my-4 text-black"
                  varient="p"
                />
              </Button>
            )}
          </div>
        </fieldset>
      </form>
    </>
  );
};
