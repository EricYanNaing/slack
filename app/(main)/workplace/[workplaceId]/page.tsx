import { getUserData } from "@/actions/get-user-data";
import { getUserWorkplaceChannel } from "@/actions/get-user-workplace-channel";
import {
  getCurrentWorkPlaceData,
  getUserWorkPlaceData,
} from "@/actions/workplaces";
import InfoSection from "@/components/infosection";
import NodataComponent from "@/components/no-data-component";
import SideBar from "@/components/sideBar";
import Typography from "@/components/ui/typography";
import { Workplace as UserWorkPlace } from "@/types/app";
import { redirect } from "next/navigation";
import React from "react";
import { workerData } from "worker_threads";
import { string } from "zod";

const Workplace = async ({
  params: { workplaceId },
}: {
  params: { workplaceId: string };
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

  // if (userworkPlaceChannels.length) {
  //   redirect(
  //     `/workplace/${workplaceId}/channels/${userworkPlaceChannels[0].id}`
  //   );
  // }

  return (
    <>
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
          currentChannelId=""
        />
        <NodataComponent
          userId={userData.id}
          workPlaceId={currentWorkPlaceData.id}
          workplaceName={currentWorkPlaceData.name}
        />
      </div>
      <div className="md:hidden min-h-screen block">Mobile</div>
    </>
  );
};

export default Workplace;
