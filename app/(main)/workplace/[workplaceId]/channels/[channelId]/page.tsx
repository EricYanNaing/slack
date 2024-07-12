import { getUserData } from "@/actions/get-user-data";
import { getUserWorkplaceChannel } from "@/actions/get-user-workplace-channel";
import {
  getCurrentWorkPlaceData,
  getUserWorkPlaceData,
} from "@/actions/workplaces";
import InfoSection from "@/components/infosection";
import SideBar from "@/components/sideBar";
import Typography from "@/components/ui/typography";
import { Workplace as UserWorkPlace } from "@/types/app";
import { redirect } from "next/navigation";
import React from "react";

const ChannelId = async ({
  params: { workplaceId, channelId },
}: {
  params: { workplaceId: string; channelId: string };
}) => {
  const userData = await getUserData();

  if (!userData) {
    return redirect("/auth");
  }
  const [userWorkplaceData, userWorkplaceError] = await getUserWorkPlaceData(
    userData.workplaces!
  );

  const [currentWorkPlaceData] = await getCurrentWorkPlaceData(workplaceId);

  const userworkPlaceChannels = await getUserWorkplaceChannel(
    currentWorkPlaceData.id,
    userData.id
  );
  return (
    <div className="hidden md:block">
      <SideBar
        currentWorkPlaceData={currentWorkPlaceData}
        userData={userData}
        userWorkPlaceData={userWorkplaceData as UserWorkPlace[]}
      />
      <InfoSection
        currentWorkplacedata={currentWorkPlaceData}
        userData={userData}
        userWorkPlaceChannels={userworkPlaceChannels}
        currentChannelId={channelId}
      />
      <div className="">
        <Typography varient="p" text="Hello" />
      </div>
    </div>
  );
};

export default ChannelId;
