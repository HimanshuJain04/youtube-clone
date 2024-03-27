"use client";

import { getHomeVideos } from "@/actions/video";
import HomeCard from "@/components/cards/CardVideoFlexCol";
import Sidebar from "@/components/common/Sidebar";
import { useEffect, useState } from "react";

export default function Home() {
  const list = [1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 1];
  const [videos, setVideos] = useState([]);

  async function getVideos() {
    try {
      const response = await getHomeVideos();
      console.log(response);
      setVideos(response);
    } catch (error) {
      console.log("Error: ", error);
      setVideos([]);
    }
  }

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <div className="w-full gap-5 flex relative min-h-screen bg-black">
      <div>
        <Sidebar />
      </div>

      <div className="w-full flex flex-wrap justify-start items-start gap-y-10 gap-x-5">
        {videos.length > 0 &&
          videos?.map((video) => <HomeCard key={video?.id} video={video} />)}
      </div>
    </div>
  );
}
