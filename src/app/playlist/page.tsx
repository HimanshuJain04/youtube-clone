"use client";

import { fetchPlaylistVideos } from "@/actions/playlist";
import { Context } from "@/app/context";
import ShowVideos from "@/components/cards/ShowVideos";
import { removeVideoFromObject } from "@/utils/modifiedData";
import { useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const Page = () => {
  const serarchParams = useSearchParams();
  const playlistId = serarchParams.get("playlistId");

  const [allVideos, setAllVideos] = useState(null);
  const { user } = useContext(Context);

  async function getPlaylistVideos() {
    const { videos }: any = await fetchPlaylistVideos(playlistId!);
    const modifiedData = removeVideoFromObject(videos);
    setAllVideos(modifiedData);
  }

  useEffect(() => {
    if (user && playlistId) {
      getPlaylistVideos();
    }
  }, [user, playlistId]);

  return (
    <div> {allVideos && <ShowVideos Type="Playlist" videos={allVideos} />}</div>
  );
};

export default Page;
