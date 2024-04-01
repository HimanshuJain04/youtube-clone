import React from "react";
import SideBar from "@/components/common/Sidebar";
import Card from "@/components/cards/CardVideoFlexRow";

const ShowVideos = ({ videos }: any) => {
  return (
    <div className="w-full flex gap-5">
      <SideBar />
      <div className="flex flex-col px-20 w-full gap-3">
        {videos &&
          videos?.map((video: any) => (
            <Card video={video?.video} key={video?.video?.id} />
          ))}
      </div>
    </div>
  );
};

export default ShowVideos;
