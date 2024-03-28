"use client";
import React, { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { videoIcons } from "@/constant/Icons";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getTime, getViews } from "@/utils/videoUtils";
import { likedPost, dislikedPost } from "@/actions/like";
import { Context } from "@/app/context";
import toast from "react-hot-toast";
import { subscribeUnsubscribeHandler } from "../../../../actions/channel";

export default function Watch() {
  const videoId = usePathname().split("/").at(-1);
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useContext(Context);

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

  async function likeHandler() {
    if (await likedPost(videoId!, "clu9efnl700023k9sklzjfjp7")) {
      toast.success("liked Success");
    }
  }

  async function dislikeHandler() {
    if (await dislikedPost(videoId!, "clu9efnl700023k9sklzjfjp7")) {
      toast.success("disliked Success");
    }
  }

  async function subscribeButtonHandler() {
    if (
      await subscribeUnsubscribeHandler(
        "clu9efnl700023k9sklzjfjp7",
        "clu9efnl700023k9sklzjfjp7"
      )
    ) {
      toast.success("channel subscribe Success");
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
                    href={`/@${videoData?.user?.userName}`}
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
                      href={`/@${videoData?.user?.userName}`}
                      className=" font-semibold cursor-pointer text-lg"
                    >
                      {videoData?.user?.name}
                    </Link>
                    <div className="flex gap-2 text-sm text-white/[0.7]">
                      <span>{videoData?.user?.subscribersCount}</span>
                      <span>subscribers</span>
                    </div>
                  </div>

                  {/* button */}
                  <div onClick={subscribeButtonHandler}>
                    <button className="px-5 py-2 bg-white text-black rounded-full font-semibold">
                      Subscribe
                    </button>
                  </div>
                </div>

                {/* likes | dislikes | etc */}
                <div className="flex justify-center items-center gap-5">
                  {/* like | dislike */}
                  <div className="text-white flex justify-center text-2xl items-center rounded-full bg-white/[0.2]">
                    {/* like */}
                    <div
                      onClick={likeHandler}
                      className="flex border-r-2  transition-all duration-200 ease-in-out py-[8px] px-4 gap-2 cursor-pointer rounded-l-full hover:bg-white/[0.25] border-white/[0.5] justify-center items-center"
                    >
                      <videoIcons.BiLike />
                      <p className="text-base">
                        {videoData?.likesCount > 0 && videoData?.likesCount}
                      </p>
                    </div>
                    {/* dislike */}
                    <div
                      onClick={dislikeHandler}
                      className="flex px-4 hover:bg-white/[0.25] transition-all duration-200 ease-in-out cursor-pointer py-[8px] rounded-r-full  justify-center items-center"
                    >
                      <videoIcons.BiDislike />
                    </div>
                  </div>
                  {/* share */}
                  <div className="text-white flex justify-center items-center gap-2 rounded-full cursor-pointer hover:bg-white/[0.25] transition-all duration-200 ease-in-out text-xl py-2 px-4 bg-white/[0.2]">
                    <videoIcons.FaShare />
                    <p className="text-base">Share</p>
                  </div>
                  {/* dots */}
                  <div className="p-3 bg-white/[0.2] rounded-full hover:bg-white/[0.25] transition-all duration-200 ease-in-out text-2xl cursor-pointer">
                    <videoIcons.HiDotsHorizontal />
                  </div>
                </div>
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
      )}
    </div>
  );
}
