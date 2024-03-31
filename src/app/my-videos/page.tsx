"use client";
import React, { useContext, useEffect, useState } from "react";
import MyVideoCard from "@/components/cards/MyVideoCard";
import SideBar from "@/components/common/Sidebar";
import { Context } from "../context";
import { fetchUserVideos } from "@/actions/video";

const Page = () => {
  const { user } = useContext(Context);
  const [videos, setVideos] = useState(null);

  async function getMyVideos() {
    try {
      const res: any = await fetchUserVideos(user.id);
      console.log("data: ", res);
      setVideos(res);
    } catch (error) {
      console.log("ERROR MY VIDEOS: ", error);
    }
  }

  useEffect(() => {
    if (user) {
      getMyVideos();
    }
  }, [user]);

  return (
    <div className="w-full flex min-h-screen bg-white/[0.1]">
      <SideBar />
      <div className="w-full">
        <p>Channel content</p>
        {/* videos */}
        <div>
          {videos &&
            videos?.map((video) => (
              <MyVideoCard video={video} key={video.id} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
