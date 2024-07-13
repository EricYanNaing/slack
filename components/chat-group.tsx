"use client";

import { FC } from "react";
import ChatHeader from "./ChatHeader";
import InfoSection from "./infosection";
import SideBar from "./sideBar";
import Typography from "./ui/typography";
import { Channel, User, Workplace } from "@/types/app";
import TextEditor from "./text-editor";
import ChatMessages from "./chat-messages";
import SearchBar from "./search-bar";

type ChatGroupProps = {
  type: "Channel" | "DirectMessage";
  socketUrl: string;
  apiUrl: string;
  headerTitle: string;
  chatId: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "recipientId";
  paramValue: string;
  userData: User;
  currentWorkplaceData: Workplace;
  currentChannelData: Channel | undefined;
  userWorkplaceData: Workplace[];
  userWorkplaceChannels: Channel[];
  slug: string;
};

const ChatGroup: FC<ChatGroupProps> = ({
  apiUrl,
  chatId,
  headerTitle,
  paramKey,
  paramValue,
  socketQuery,
  socketUrl,
  type,
  currentChannelData,
  currentWorkplaceData,
  slug,
  userData,
  userWorkplaceChannels,
  userWorkplaceData,
}) => {
  return (
    <>
      <div className="h-[calc(100vh-256px)] overflow-y-auto [&::webkit-scrollbar-thumb]:rounded-[6px] [&::webkit-scrollbar-thumb]:bg-foreground/60 [&::webkit-scrollbar-track]:bg-none [&::webkit-scrollbar-thumb]:w-2">
        <SideBar
          currentWorkPlaceData={currentWorkplaceData}
          userData={userData}
          userWorkPlaceData={userWorkplaceData as Workplace[]}
        />
        <InfoSection
          currentWorkplacedata={currentWorkplaceData}
          userData={userData}
          userWorkPlaceChannels={userWorkplaceChannels}
          currentChannelId={
            type === "Channel" ? currentChannelData?.id : undefined
          }
        />
        <SearchBar
          currentWorkplaceData={currentWorkplaceData}
          currentChannelData={currentChannelData}
          loggedInUserId={userData.id}
        />
        <div className="p-4 relative w-full overflow-hidden">
          <ChatHeader title={headerTitle} chatId={chatId} userData={userData} />

          <div className="mt-10">
            <ChatMessages
              userData={userData}
              name={currentChannelData?.name ?? "Username"}
              workPlaceData={currentWorkplaceData}
              chatId={chatId}
              type={type}
              apiUrl={apiUrl}
              socketUrl={socketUrl}
              socketQuery={socketQuery}
              paramKey={paramKey}
              paramValue={paramValue}
              channelData={currentChannelData}
            />
          </div>
        </div>
      </div>

      <div className="m-4">
        <TextEditor
          apiUrl={socketUrl}
          type={type}
          channel={currentChannelData}
          workplaceData={currentWorkplaceData}
          userData={userData}
          recipientId={type === "DirectMessage" ? chatId : undefined}
        />
      </div>
    </>
  );
};

export default ChatGroup;
