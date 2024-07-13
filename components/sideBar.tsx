"use client";

import { User, Workplace } from "@/types/app";
import { FiPlus } from "react-icons/fi";
import React, { FC } from "react";
import SideBarNav from "./sidebar-nav";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { GoDot, GoDotFill } from "react-icons/go";
import { GiNightSleep } from "react-icons/gi";
import { Popover, PopoverTrigger } from "./ui/popover";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { PopoverContent } from "@radix-ui/react-popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Typography from "./ui/typography";
import { FaPencilAlt, FaRegCalendarCheck } from "react-icons/fa";

type SideBarProps = {
  userWorkPlaceData: Workplace[];
  currentWorkPlaceData: Workplace;
  userData: User;
};

const SideBar: FC<SideBarProps> = ({
  userWorkPlaceData,
  currentWorkPlaceData,
  userData,
}) => {
  console.log(userWorkPlaceData, currentWorkPlaceData, userData);
  return (
    <aside
      className={`
    fixed
    top-0
    left-0
    pt-[68px]
    pb-8
    z-30
    flex
    flex-col
    justify-between
    items-center
    h-screen
    w-20`}
    >
      <SideBarNav
        currentWorkPlaceData={currentWorkPlaceData}
        userWorkPlaceData={userWorkPlaceData}
      />

      <div className="flex flex-col space-y-3">
        <div
          className={`bg-[rgba(225,255,255,0.3)] cursor-pointer transition-all duration-300
            hover:scale-110 text-white grid place-content-center rounded-full w-10 h-10 
            `}
        >
          <FiPlus size={28} />
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Popover>
                  <PopoverTrigger>
                    <div className="h-10 w-10 relative cursor-pointer">
                      <div className="h-full w-full rounded-lg overflow-hidden">
                        <Image
                          className="object-cover w-full h-full"
                          src={userData.avatar_url}
                          alt={userData.name || "user"}
                          width={300}
                          height={300}
                        />
                        <div
                          className={cn(
                            "absolute z-10 rounded-full -right-[20%] -bottom-1"
                          )}
                        >
                          {userData.is_away ? (
                            <GoDot className="text-white text-xl" />
                          ) : (
                            <GoDotFill className="text-green-600" size={17} />
                          )}
                        </div>
                      </div>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent side="right">
                    <div>
                      <div className="flex space-x-3">
                        <Avatar>
                          <AvatarImage src={userData.avatar_url} />
                          <AvatarFallback>
                            {userData.name && userData.name.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <Typography
                            text={userData.name || userData.email}
                            varient="p"
                            className="font-bold"
                          />
                          <div className="flex items-center space-x-1">
                            {userData.is_away ? (
                              <GiNightSleep size="12" />
                            ) : (
                              <GoDotFill className="text-green-600" size="17" />
                            )}
                            <span className="text-xs">
                              {userData.is_away ? "Away" : "Active"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="border group cursor-pointer mt-4 mb-2 p-1 rounded flex items-center space-x-2">
                        <FaRegCalendarCheck className="group-hover:hidden" />
                        <FaPencilAlt className="hidden group-hover:block" />
                        <Typography
                          text={"In a meeting"}
                          varient="p"
                          className="text-xs text-gray-600"
                        />
                      </div>
                      <div className="flex flex-col space-y-1">
                        <Typography
                          varient="p"
                          text={
                            userData.is_away
                              ? "Set yourself as active"
                              : "Set yourself as away"
                          }
                          className="hover:text-white hover:bg-blue-700 px-2 py-1 rounded cursor-pointer"
                        />
                        <Typography
                          varient="p"
                          text={"Clear Status"}
                          className="hover:text-white hover:bg-blue-700 px-2 py-1 rounded cursor-pointer"
                        />
                        <hr className="bg-gray-400" />
                        <Typography
                          varient="p"
                          text={"Profile"}
                          className="hover:text-white hover:bg-blue-700 px-2 py-1 rounded cursor-pointer"
                        />
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </TooltipTrigger>
            <TooltipContent
              className="text-white bg-black border-black"
              side="right"
            >
              <Typography text={userData.name || userData.email} varient="p" />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </aside>
  );
};

export default SideBar;
