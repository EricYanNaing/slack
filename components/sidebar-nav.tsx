import { Workplace } from "@/types/app";
import { FaPlus } from "react-icons/fa";
import { RiHome2Fill } from "react-icons/ri";
import { PiChatsTeardrop } from "react-icons/pi";
import React, { FC, useState } from "react";
import { Tooltip, TooltipProvider } from "./ui/tooltip";
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Typography from "./ui/typography";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import CreateWorkPlace from "./create-workplace";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useRouter } from "next/navigation";
import Progressbar from "./progressbar";
import { cn } from "@/lib/utils";
import { Copy } from "lucide-react";
import { toast } from "sonner";

type SideBarNavProps = {
  userWorkPlaceData: Workplace[];
  currentWorkPlaceData: Workplace;
};

const SideBarNav: FC<SideBarNavProps> = ({
  currentWorkPlaceData,
  userWorkPlaceData,
}) => {
  const router = useRouter();
  const [switchingWorkplace, setSwitchingWorkplace] = useState(false);
  const switchWorkPlace = (id: string) => {
    setSwitchingWorkplace(true);
    router.push(`/workplace/${id}`);
    setSwitchingWorkplace(false);
  };

  const copyInviteLink = (inviteCode: string) => {
    const currentDomain = window.location.origin;

    navigator.clipboard.writeText(
      `${currentDomain}/create-workplace/${inviteCode}`
    );

    toast.success("Invite link copied to clipboard");
  };

  return (
    <nav>
      <ul className="flex flex-col space-y-4 ">
        <li>
          <div className="cursor-pointer items-center text-white mb-4 w-10 h-10 rounded-lg overflow-hidden">
            <Popover>
              <PopoverTrigger>
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
              </PopoverTrigger>
              <PopoverContent side="bottom" className="text-white">
                {switchingWorkplace ? (
                  <Progressbar />
                ) : (
                  userWorkPlaceData.map((workplace) => {
                    const isActive = workplace.id === currentWorkPlaceData.id;
                    return (
                      <div
                        key={workplace.id}
                        className={cn(
                          isActive ? "bg-neutral-700" : "hover:bg-neutral-700",
                          "hover:opacity-70 px-2 py-1 flex gap-2"
                        )}
                        onClick={() =>
                          !isActive && switchWorkPlace(workplace.id)
                        }
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
                            className="text-sm"
                            text={workplace.name}
                          />
                          <div className="flex items-center gap-x-2">
                            <Typography
                              varient="p"
                              className="text-xs lg:text-xs"
                              text="Copy Invite Link"
                            />
                            <Copy
                              onClick={() =>
                                copyInviteLink(workplace.invite_code!)
                              }
                              size={18}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}

                <Separator />
                <CreateWorkPlace />
              </PopoverContent>
            </Popover>
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
