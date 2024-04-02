"use client";

import { fetchUserHistoryVideos } from "@/actions/video";
import { Context } from "@/app/context";
import ShowVideos from "@/components/cards/ShowVideos";
import React, { useContext, useEffect, useState } from "react";

const Page = () => {
  const [videos, setVideos] = useState(null);
  const { user } = useContext(Context);

  async function getLikedVideos() {
    const data: any = await fetchUserHistoryVideos(user.id);
    setVideos(data);
  }

  useEffect(() => {
    if (user) {
      getLikedVideos();
    }
  }, [user]);

  return (
    <div> {videos && <ShowVideos Type={"History"} videos={videos} />}</div>
  );
};

export default Page;
