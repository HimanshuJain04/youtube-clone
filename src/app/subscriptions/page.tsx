"use client";

import { fetchSubscribedChannelVideos } from "@/actions/video";
import { Context } from "@/app/context";
import HomeCard from "@/components/cards/CardVideoFlexCol";
import ShowVideos from "@/components/cards/ShowVideos";
import Sidebar from "@/components/common/Sidebar";
import { removeVideoUnderVideoFromObject } from "@/utils/modifiedData";
import React, { useContext, useEffect, useState } from "react";

const Page = () => {
  const [videos, setVideos] = useState(null);
  const { user }: any = useContext(Context);

  async function getChannelVideos() {
    const { subscribesTo }: any = await fetchSubscribedChannelVideos(user.id);
    const res = removeVideoUnderVideoFromObject(subscribesTo);
    setVideos(res);
  }

  useEffect(() => {
    if (user) {
      getChannelVideos();
    }
  }, [user]);

  return (
    <div className="w-full  min-h-screen bg-black">
      {videos &&
        (videos && videos?.length > 0 ? (
          <ShowVideos flag={true} Type="Playlist" videos={videos} />
        ) : (
          <div className="text-white w-full text-center text-2xl font-bold pt-20">
            <p>No videos found</p>
          </div>
        ))}
    </div>
  );
};

export default Page;
