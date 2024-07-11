import { Workplace } from "@/types/app";
import { FaPlus } from "react-icons/fa";
import { RiHome2Fill } from "react-icons/ri";
import { PiChatsTeardrop } from "react-icons/pi";
import React, { FC } from "react";
import { Tooltip, TooltipProvider } from "./ui/tooltip";
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Typography from "./ui/typography";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

type SideBarNavProps = {
  userWorkPlaceData: Workplace[];
  currentWorkPlaceData: Workplace;
};

const SideBarNav: FC<SideBarNavProps> = ({
  currentWorkPlaceData,
  userWorkPlaceData,
}) => {
  return (
    <nav>
      <ul className="flex flex-col space-y-4 ">
        <li>
          <div className="cursor-pointer items-center text-white mb-4 w-10 h-10 rounded-lg overflow-hidden">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Avatar>
                    <AvatarImage
                      src={currentWorkPlaceData.image_url || ""}
                      alt={currentWorkPlaceData.name}
                      className="object-cover w-full h-full"
                    />
                    <AvatarFallback className="bg-gray-300">
                      <Typography
                        varient="p"
                        text={currentWorkPlaceData.name.slice(2, 0)}
                      />
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent className="p-0" side="bottom">
                  <Card className="w-[350px] border-0 bg-gray-300">
                    <CardContent className="flex p-0 flex-col">
                      {userWorkPlaceData.map((workplace) => (
                        <div
                          key={workplace.id}
                          className="hover:opacity-70 px-2 py-1 flex gap-1"
                        >
                          <Avatar>
                            <AvatarImage
                              src={workplace.image_url || ""}
                              alt={workplace.name}
                              className="object-cover w-full h-full"
                            />
                            <AvatarFallback>
                              <Typography
                                varient="p"
                                text={workplace.name.slice(2, 0)}
                              />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <Typography
                              varient="p"
                              className="text-sm text-black"
                              text={workplace.name}
                            />
                            <Typography
                              varient="p"
                              className="text-xs lg:text-xs text-black"
                              text={workplace.invite_code || ""}
                            />
                          </div>
                        </div>
                      ))}
                      <Separator />
                      <div className="flex items-center gap-2 p-2">
                        <Button variant="secondary">
                          <FaPlus />
                        </Button>
                        <Typography
                          varient="p"
                          className="text-sm text-black"
                          text="Add workplace"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="flex flex-col items-center cursor-pointer group text-white">
            <div className="p-2 rounded-lg bg-[rgba(225,255,255,0.3)]">
              <RiHome2Fill
                size={20}
                className="group-hover:scale-125 transition-all duration-300"
              />
            </div>

            <Typography
              varient="p"
              className="text-sm lg:text-sm md:text-sm"
              text="Home"
            />
          </div>
        </li>
        <li>
          <div className="flex flex-col cursor-pointer items-center group text-white">
            <div className="p-2 rounded-lg bg-[rgba(225,255,255,0.3)]">
              <PiChatsTeardrop
                size={20}
                className="group-hover:scale-125 transition-all duration-300"
              />
            </div>

            <Typography
              varient="p"
              className="text-sm lg:text-sm md:text-sm"
              text="Dms"
            />
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default SideBarNav;
