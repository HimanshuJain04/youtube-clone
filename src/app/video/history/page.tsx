"use client";

import { fetchUserHistoryVideos } from "@/actions/video";
import { Context } from "@/app/context";
import ShowVideos from "@/components/cards/ShowVideos";
import { removeVideoFromObject } from "@/utils/modifiedData";
import React, { useContext, useEffect, useState } from "react";

const Page = () => {
  const [videos, setVideos] = useState(null);
  const { user } = useContext(Context);

  async function getWatchedVideos() {
    console.log(user);
    const data: any = await fetchUserHistoryVideos(user.id);
    const modifiedData = removeVideoFromObject(data);
    setVideos(modifiedData);
  }

  useEffect(() => {
    if (user) {
      getWatchedVideos();
    }
  }, [user]);

  return (
    <div> {videos && <ShowVideos Type={"History"} videos={videos} />}</div>
  );
};

export default Page;
