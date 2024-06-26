"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { getTime, getViews } from "@/utils/videoUtils";
import VideoThumbnailCard from "@/components/cards/VideoThumbnailCard";
import { Icons } from "@/constant/Icons";
import { removeFromHistory, removeFromWatchLater } from "@/actions/video";
import { useContext, useRef, useState } from "react";
import { Context } from "@/app/context";
import toast from "react-hot-toast";
import { dislikedPostHandler } from "@/actions/like";
import { removeFromPlaylist } from "@/actions/playlist";
import CardOptions from "@/components/buttons/CardOptions";

function VideoCard({ video, Type, css = "w-[400px] h-[200px]", flag }: any) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showOptions, setShowOptions] = useState(false);
  const dotRef = useRef();

  const { user }: any = useContext(Context);

  const handleDeleteClick = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    if (!user) {
      toast.error("Please login");
      return;
    }

    let callingFun;
    let Arg1;
    let Arg2;

    switch (Type) {
      case "WatchLater":
        callingFun = removeFromWatchLater;
        Arg1 = video.id;
        Arg2 = user.id;
        break;

      case "History":
        callingFun = removeFromHistory;
        Arg1 = video.id;
        Arg2 = user.id;
        break;

      case "Like":
        callingFun = dislikedPostHandler;
        Arg1 = video.id;
        Arg2 = user.id;
        break;

      case "Playlist":
        callingFun = removeFromPlaylist;
        Arg1 = video.id;
        Arg2 = searchParams.get("playlistId");
        break;
      default:
        callingFun = null;
    }

    if (!callingFun || !Arg1 || !Arg2) {
      return;
    }

    const res = await callingFun(Arg1, Arg2);

    if (res) {
      toast.success("Removed");
    } else {
      toast.error("Something went wrong");
    }
  };

  const handleOptionsClick = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setShowOptions(!showOptions);
  };

  return (
    <Link href={`/video/watch/${video?.id}`}>
      <div className="w-full relative group flex justify-between items-start">
        <div
          className={`flex group flex-row gap-5 relative  text-white  justify-start items-start
         overflow-hidden w-full `}
        >
          {/* video | image */}
          <VideoThumbnailCard
            imageUrl={video?.thumbnail}
            videoUrl={video?.url}
            duration={video?.duration}
            css={css}
          />

          {/* details */}
          <div className="flex gap-1 pr-4 flex-col overflow-hidden cursor-pointer justify-start items-start mt-3">
            {/* Title of video */}
            <p className="sm:text-[19px] max-w-full text-sm font-semibold">
              {`${video.title.substring(0, 100)}..`}
            </p>

            {/* video info */}
            <div className="flex mt-1 gap-5 w-full justify-start items-center flex-row">
              {/* View And Time */}
              <div className="flex justify-start items-center gap-1 text-[white]/[0.7] text-[13px] sm:text-[15px] ">
                {/* Views */}
                <div>
                  <span>{getViews(video?.viewsCount)}</span> views
                </div>
                <p className="text-center bg-[white]/[0.7] h-[2px] w-[2px] rounded-full"></p>
                {/* Time */}
                <div>
                  <span>{getTime(video?.createdAt)}</span> ago
                </div>
              </div>
            </div>

            {/* channel info */}
            <div className="flex gap-2 mt-2 w-full justify-start items-center flex-row">
              {/* Channel Logo */}
              <Link href={`/channel/@${video?.user.userName}`}>
                <div className=" w-10 h-10 relative overflow-hidden rounded-full shrink-0 bg-white/[0.2] ">
                  <Image
                    alt="channel"
                    loading="lazy"
                    fill
                    src={video?.user?.profileImage}
                  />
                </div>
              </Link>
              {/* Channel Name */}
              <Link href={`/channel/@${video?.user.userName}`}>
                <p className="sm:text-[15px] text-[13px] hover:text-white transition-all duration-150 ease-in-out  text-[white]/[0.8]">
                  {video?.user?.name}
                </p>
              </Link>
            </div>

            {/* description of video */}
            <p
              className={`text-[white]/[0.6] mt-2 max-w-full text-[15px]  ${
                Type === "Recommended" ? "hidden" : "block"
              }`}
            >
              {`${video?.description?.substring(0, 200)}..`}
            </p>
          </div>
        </div>
        {/* hover dots */}
        {flag ? (
          <>
            <div
              ref={dotRef}
              onClick={handleOptionsClick}
              className="text-white absolute right-0 group-hover:block hidden text-xl hover:bg-white/[0.15] p-2  rounded-full"
            >
              <Icons.HiDotsVertical />
            </div>

            {showOptions && (
              <CardOptions
                dotRef={dotRef}
                setShowOptions={setShowOptions}
                videoId={video.id}
              />
            )}
          </>
        ) : (
          <div
            onClick={handleDeleteClick}
            className="group-hover:block relative hidden hover:bg-white/[0.15] p-2 rounded-full text-white"
          >
            <span className="text-xl ">
              <Icons.RiDeleteBin6Line />
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}

export default VideoCard;
