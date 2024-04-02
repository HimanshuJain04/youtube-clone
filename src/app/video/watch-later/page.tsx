"use client";

import { fetchUserWatchLater } from "@/actions/video";
import { Context } from "@/app/context";
import ShowVideos from "@/components/cards/ShowVideos";
import React, { useContext, useEffect, useState } from "react";

const Page = () => {
  const [videos, setVideos] = useState(null);
  const { user } = useContext(Context);

  async function getWatchLaterVideos() {
    const data: any = await fetchUserWatchLater(user.id);
    setVideos(data);
  }

  useEffect(() => {
    if (user) {
      getWatchLaterVideos();
    }
  }, [user]);

  return (
    <div> {videos && <ShowVideos Type={"WatchLater"} videos={videos} />}</div>
  );
};

export default Page;
