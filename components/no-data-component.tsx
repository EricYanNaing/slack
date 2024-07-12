"use client";

import React, { FC, useState } from "react";
import Typography from "./ui/typography";
import { Button } from "./ui/button";
import CreateChannelDialog from "./create-channel-dialog";

const NodataComponent: FC<{
  workplaceName: string;
  userId: string;
  workPlaceId: string;
}> = ({ workPlaceId, workplaceName, userId }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <div className="p-4 h-[calc-[100%-63px]]">
      <Typography
        varient="h4"
        text={`Welcome from ${workplaceName} work place.`}
      />
      <Typography varient="h4" text="Get started by creating a channel." />

      <div className="w-fit">
        <Button
          className="w-full my-2 text-white"
          onClick={() => setDialogOpen(true)}
        >
          <Typography
            varient="p"
            className="text-white"
            text="Create Channel"
          />
        </Button>
      </div>

      <CreateChannelDialog
        userId={userId}
        workplaceId=""
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      />
    </div>
  );
};

export default NodataComponent;
