"use client";

import {
  fetchSubscribedChannelVideos,
  fetchUserLikedVideos,
} from "@/actions/video";
import { Context } from "@/app/context";
import ShowVideos from "@/components/cards/ShowVideos";
import React, { useContext, useEffect, useState } from "react";

const Page = () => {
  const [videos, setVideos] = useState(null);
  const { user } = useContext(Context);

  async function getChannelVideos() {
    const { subscribesTo }: any = await fetchSubscribedChannelVideos(user.id);
    console.log("subscribesTo: ", subscribesTo);
    setVideos(subscribesTo);
  }

  useEffect(() => {
    if (user) {
      getChannelVideos();
    }
  }, [user]);

  return <div> {videos && <ShowVideos Type="Like" videos={videos} />}</div>;
};

export default Page;
