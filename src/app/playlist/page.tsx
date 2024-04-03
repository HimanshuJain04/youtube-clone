"use client";

import { fetchPlaylistVideos } from "@/actions/playlist";
import { Context } from "@/app/context";
import ShowVideos from "@/components/cards/ShowVideos";
import { useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const Page = () => {
  const serarchParams = useSearchParams();
  const playlistId = serarchParams.get("playlistId");

  const [videos, setVideos] = useState(null);
  const { user } = useContext(Context);

  async function getPlaylistVideos() {
    const data: any = await fetchPlaylistVideos(playlistId!);

    console.log("data: ", data);
    setVideos([]);
  }

  useEffect(() => {
    if (user && playlistId) {
      getPlaylistVideos();
    }
  }, [user, playlistId]);

  return <div> {videos && <ShowVideos Type="Playlist" videos={videos} />}</div>;
};

export default Page;
