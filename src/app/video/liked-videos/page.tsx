"use client";

import { fetchUserLikedVideos } from "@/actions/video";
import { Context } from "@/app/context";
import ShowVideos from "@/components/cards/ShowVideos";
import { removeVideoFromObject } from "@/utils/modifiedData";
import React, { useContext, useEffect, useState } from "react";

const Page = () => {
  const [videos, setVideos] = useState(null);
  const { user } = useContext(Context);

  async function getLikedVideos() {
    const data: any = await fetchUserLikedVideos(user.id);
    const modifiedData = removeVideoFromObject(data);
    setVideos(modifiedData);
  }

  useEffect(() => {
    if (user) {
      getLikedVideos();
    }
  }, [user]);

  return <div> {videos && <ShowVideos Type="Like" videos={videos} />}</div>;
};

export default Page;
