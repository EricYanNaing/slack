import { getUserData } from "@/actions/get-user-data";
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
import { string } from "zod";

const Workplace = async ({ params: { id } }: { params: { id: string } }) => {
  const userData = await getUserData();

  if (!userData) {
    return redirect("/auth");
  }
  const [userWorkplaceData, userWorkplaceError] = await getUserWorkPlaceData(
    userData.workplaces!
  );

  const [currentWorkPlaceData, currentWorkPlaceError] =
    await getCurrentWorkPlaceData(id);

  console.log(currentWorkPlaceData);
  return (
    <>
      <div className="hidden md:block">
        <SideBar
          currentWorkPlaceData={currentWorkPlaceData}
          userData={userData}
          userWorkPlaceData={userWorkplaceData as UserWorkPlace[]}
        />
        <InfoSection currentWorkplacedata={currentWorkPlaceData} userData={userData} />
        Workplace
        <Typography varient="p" text="Hello" />
        <Typography varient="p" text="Hello" />
        <Typography varient="p" text="Hello" />
        <Typography varient="p" text="Hello" />
      </div>
      <div className="md:hidden min-h-screen block">Mobile</div>
    </>
  );
};

export default Workplace;
