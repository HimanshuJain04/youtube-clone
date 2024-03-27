"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { videoIcons } from "@/constant/Icons";
import { BiDislike } from "react-icons/bi";

export default function Watch() {
  const videoId = usePathname().split("/").at(-1);
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getVideos() {
    try {
      setLoading(true);
      const res = await axios.get(`/api/video?videoId=${videoId}`);
      console.log(res.data.data);
      setVideoData(res.data.data);
    } catch (error) {
      console.log("Error : ", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getVideos();
  }, [videoId]);

  return (
    <div className="min-h-screen justify-center flex items-center text-white w-full">
      {loading ? (
        <>loading...</>
      ) : (
        <div className="w-11/12 py-5 flex justify-normal min-h-screen items-start">
          {/* video part */}
          <div className="w-[65vw]">
            {/* video */}
            <div className="w-full h-[80vh] overflow-hidden">
              <video
                src={videoData?.url}
                className="w-full object-contain max-h-full"
                controls
              />
            </div>

            {/* video details */}
            <div className="flex flex-col justify-start items-start gap-3">
              {/* video title */}
              <div>
                <p className="text-2xl font-bold">{videoData?.title}</p>
              </div>

              {/* channel | likes | etc */}
              <div className="flex w-full justify-between items-center">
                {/* channel */}
                <div className="flex justify-center items-center gap-2">
                  {/* channel image */}
                  <div className="w-12 h-12 rounded-full overflow-auto">
                    <Image
                      width={48}
                      src={videoData?.user?.profileImage}
                      height={48}
                      className="rounded-full object-cover"
                      alt="channel"
                    />
                  </div>
                  {/* channel | subscriber */}
                  <div className="flex flex-col items-start">
                    <p className=" font-semibold text-lg">
                      {videoData?.user?.name}
                    </p>
                    <div className="flex gap-2 text-sm text-white/[0.7]">
                      <span>{videoData?.user?.userName}</span>
                      <span>subscribers</span>
                    </div>
                  </div>

                  {/* button */}
                  <div>
                    <button className="px-5 py-2 bg-white text-black rounded-full font-semibold">
                      Subscribe
                    </button>
                  </div>
                </div>

                {/* likes | dislikes | etc */}
                <div className="">
                  {/* like | dislike */}
                  <div className="text-white flex justify-center text-2xl items-center py-2 px-5 rounded-full bg-white/[0.2]">
                    {/* like */}
                    <div className="flex border-r-2 border-white/[0.5] justify-center items-center">
                      <videoIcons.BiLike />
                      <p>{videoData?.likesCount}</p>
                    </div>
                    {/* dislike */}
                    <div>
                      <videoIcons.BiDislike />
                    </div>
                  </div>
                  {/* share */}
                  <div></div>
                  {/* dots */}
                  <div></div>
                </div>
              </div>
            </div>
          </div>

          {/* recommendation */}
          <div className="w-[30vw] h-screen "></div>
        </div>
      )}
    </div>
  );
}
