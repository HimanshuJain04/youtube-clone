"use client";
import React, { useContext, useEffect, useState } from "react";
import MyVideoCard from "@/components/cards/MyVideoCard";
import SideBar from "@/components/common/Sidebar";
import { Context } from "../context";
import { fetchUserVideos } from "@/actions/video";

const menu = [
  "visibility",
  "Restricted",
  "date",
  "Views",
  "likes",
  "delete",
  "edit",
];

const Page = () => {
  const { user } = useContext(Context);
  const [videos, setVideos] = useState(null);

  async function getMyVideos() {
    try {
      const res: any = await fetchUserVideos(user.id);
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
    <div className="w-full flex min-h-screen gap-5 bg-white/[0.1]">
      <SideBar />
      <div className="w-full flex flex-col gap-10 mt-5">
        <p className="text-3xl text-white font-semibold">Channel content</p>
        {/* videos */}
        <div>
          <div className="w-full justify-between flex capitalize py-3 px-5 gap-5 text-white/[0.5] items-center">
            <p className="w-[55%]">Video</p>
            <div className="w-full justify-between items-center flex">
              {menu?.map((item) => (
                <div key={item}>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
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
