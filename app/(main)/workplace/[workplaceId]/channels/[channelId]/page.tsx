import { getUserData } from "@/actions/get-user-data";
import { getUserWorkplaceChannel } from "@/actions/get-user-workplace-channel";
import {
  getCurrentWorkPlaceData,
  getUserWorkPlaceData,
} from "@/actions/workplaces";
import ChatGroup from "@/components/chat-group";
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
      <ChatGroup
        type="Channel"
        userData={userData}
        currentChannelData={currentChannelData}
        currentWorkplaceData={currentWorkPlaceData}
        slug={workplaceId}
        chatId={channelId}
        userWorkplaceChannels={userworkPlaceChannels}
        socketUrl="/api/websocket/messages"
        socketQuery={{
          channelId: currentChannelData.id,
          workplaceId: currentWorkPlaceData.id,
        }}
        apiUrl="/api/messages"
        headerTitle={currentChannelData.name}
        paramKey="channelId"
        paramValue={channelId}
        userWorkplaceData={userWorkplaceData as UserWorkPlace[]}
      />
    </div>
  );
};

export default ChannelId;
