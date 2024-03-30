"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getTime, getViews } from "@/utils/videoUtils";
import SubscribeButton from "@/components/buttons/SubscribeButton";
import LikeButtons from "@/components/buttons/LikeButtons";

export default function Watch() {
  const videoId = usePathname().split("/").at(-1);
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  async function getVideos() {
    try {
      setLoading(true);
      const res = await axios.get(`/api/video?videoId=${videoId}`);
      setVideoData(res.data.data);
    } catch (error) {
      console.log("Error : ", error);
      router.push("/something-went-wrong");
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
        videoData && (
          <div className="w-11/12 pt-5 pb-10 flex justify-normal min-h-screen items-start">
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
                    <Link
                      href={`/channel/@${videoData?.user?.userName}`}
                      className="w-12 h-12 cursor-pointer rounded-full overflow-auto"
                    >
                      <Image
                        width={48}
                        src={videoData?.user?.profileImage}
                        height={48}
                        className="rounded-full object-cover"
                        alt="channel"
                      />
                    </Link>
                    {/* channel | subscriber */}
                    <div className="flex flex-col items-start">
                      <Link
                        href={`/channel/@${videoData?.user?.userName}`}
                        className=" font-semibold cursor-pointer text-lg"
                      >
                        {videoData?.user?.name}
                      </Link>
                      <div className="flex gap-2 text-sm text-white/[0.7]">
                        <span>{videoData?.user?.subscribersCount}</span>
                        <span>subscribers</span>
                      </div>
                    </div>

                    <SubscribeButton channelId={videoData?.user?.id} />
                  </div>

                  {/* likes | dislikes | etc */}
                  <LikeButtons
                    videoId={videoId}
                    likesCount={videoData.likesCount}
                  />
                </div>

                {/* description */}
                <div className="w-full bg-white/[0.15] gap-1 flex-col mt-2 flex justify-normal items-start rounded-lg p-3">
                  {/* views |  timeline | tags */}
                  <div className="flex gap-5">
                    {/* view */}
                    <span className="text-white flex justify-center items-center gap-1 font-semibold">
                      <p>{getViews(videoData?.viewsCount)}</p>
                      <p>views</p>
                    </span>

                    {/* time */}
                    <span className="text-white font-semibold flex justify-center items-center gap-1">
                      <p>{getTime(videoData?.createdAt)}</p>
                      <p>ago</p>
                    </span>
                  </div>

                  {/* tags */}
                  <span className="text-blue-400 flex gap-2 font-semibold">
                    {videoData?.tags?.map((tag, index) => (
                      <Link
                        href={`/search?value=${tag}`}
                        key={tag + index}
                        className="hover:underline"
                      >
                        <p>#{tag}</p>
                      </Link>
                    ))}
                  </span>

                  {/* description */}
                  <div>
                    <p>{videoData?.description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* recommendation */}
            <div className="w-[30vw] h-screen "></div>
          </div>
        )
      )}
    </div>
  );
}
