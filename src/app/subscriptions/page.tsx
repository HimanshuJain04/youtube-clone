"use client";

import { fetchSubscribedChannelVideos } from "@/actions/video";
import { Context } from "@/app/context";
import HomeCard from "@/components/cards/CardVideoFlexCol";
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
    <div className="w-full gap-5 flex relative min-h-screen bg-black">
      <div>
        <Sidebar />
      </div>
      <div className="w-full bg-black flex flex-wrap justify-start items-start gap-y-10 gap-x-5">
        {videos && videos?.length > 0 ? (
          videos?.map((video: any) => (
            <HomeCard key={video?.id} video={video} />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Page;
