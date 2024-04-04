import React from "react";
import SideBar from "@/components/common/Sidebar";
import Card from "@/components/cards/CardVideoFlexRow";

const ShowVideos = ({ videos, Type, flag }: any) => {
  return (
    <div className="w-full flex gap-5">
      <SideBar />
      <div className="flex flex-col px-20 w-full gap-5 pb-10">
        {videos && videos.length > 0 ? (
          videos?.map((video: any) => (
            <Card Type={Type} video={video} flag={flag} key={video?.id} />
          ))
        ) : (
          <div className="text-white w-full text-center pt-10 text-2xl font-bold">
            No Videos Found
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowVideos;
