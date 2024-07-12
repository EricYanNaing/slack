"use client";

import { cn } from "@/lib/utils";
import React, { FC, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { FaArrowDown, FaArrowUp, FaPlus } from "react-icons/fa";
import Typography from "./ui/typography";
import CreateChannelDialog from "./create-channel-dialog";
import { User, Workplace } from "@/types/app";

const InfoSection: FC<{
  userData: User;
  currentWorkplacedata: Workplace;
}> = ({ userData, currentWorkplacedata }) => {
  const [isChannelCollapse, setIsChannelCollapse] = useState(false);
  const [isDMCollapse, setIsDMCollapse] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <div
      className={cn(
        "bg-slate-200 text-black fixed left-20 rounded-l-xl md:w-52 lg:w-[350px] h-[calc(100%-63px)] z-20 flex flex-col items-center"
      )}
    >
      <div className="w-full flex flex-col gap-2 p-3">
        <div>
          <Collapsible
            open={isChannelCollapse}
            onOpenChange={() => setIsChannelCollapse((prevState) => !prevState)}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <CollapsibleTrigger className="flex items-center gap-2">
                {isChannelCollapse ? <FaArrowDown /> : <FaArrowUp />}
                <Typography varient="p" text="Channels" className="font-bold" />
              </CollapsibleTrigger>
              <div className={cn("cursor-pointer p-2 rounded-full")}>
                <FaPlus onClick={() => setDialogOpen(true)} />
              </div>
            </div>
            <CollapsibleContent>
              <Typography
                varient="p"
                text="# 1 channel"
                className={cn("px-2 py-1 rounded-sm cursor-pointer")}
              />
              <Typography
                varient="p"
                text="# 2 channel"
                className={cn("px-2 py-1 rounded-sm cursor-pointer")}
              />
              <Typography
                varient="p"
                text="# 3 channel"
                className={cn("px-2 py-1 rounded-sm cursor-pointer")}
              />
            </CollapsibleContent>
          </Collapsible>
        </div>
        <div>
          <Collapsible
            open={isDMCollapse}
            onOpenChange={() => setIsDMCollapse((prevstate) => !prevstate)}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <CollapsibleTrigger className="flex items-center gap-2">
                {isDMCollapse ? <FaArrowDown /> : <FaArrowUp />}
                <Typography
                  varient="p"
                  text="Direct Messages"
                  className="font-bold"
                />
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
              <Typography
                varient="p"
                text="# 1 Dm"
                className={cn("px-2 py-1 rounded-sm cursor-pointer")}
              />
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
      <CreateChannelDialog
        setDialogOpen={setDialogOpen}
        dialogOpen={dialogOpen}
        workplaceId={currentWorkplacedata.id}
        userId={userData.id}
      />
    </div>
  );
};

export default InfoSection;
