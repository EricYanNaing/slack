import { getUserData } from "@/actions/get-user-data";
import { getUserWorkplaceChannel } from "@/actions/get-user-workplace-channel";
import {
  getCurrentWorkPlaceData,
  getUserWorkPlaceData,
} from "@/actions/workplaces";
import ChatHeader from "@/components/ChatHeader";
import InfoSection from "@/components/infosection";
import SideBar from "@/components/sideBar";
import TextEditor from "@/components/text-editor";
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

  const currentChannelData = userworkPlaceChannels.find(
    (channel) => channel.id === channelId
  );

  if (!currentChannelData) {
    return redirect("/");
  }

  return (
    <div className="hidden md:block">
      <div className="h-[calc(100vh-256px)] overflow-y-auto [&::webkit-scrollbar-thumb]:rounded-[6px] [&::webkit-scrollbar-thumb]:bg-foreground/60 [&::webkit-scrollbar-track]:bg-none [&::webkit-scrollbar-thumb]:w-2">
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
        <div className="p-4 relative w-full overflow-hidden">
          <ChatHeader title={currentChannelData.name} />

          <div className="mt-10">
            <Typography text="Chat Content" varient="h4" />
          </div>
        </div>
      </div>

      <div className="m-4">
        <TextEditor
          apiUrl="/api/websocket/messages"
          type="channel"
          channel={currentChannelData}
          workplaceData={currentWorkPlaceData}
          userData={userData}
        />
      </div>
    </div>
  );
};

export default ChannelId;
