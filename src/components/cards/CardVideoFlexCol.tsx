"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getTime, getViews } from "@/utils/videoUtils";
import VideoThumbnailCard from "@/components/cards/VideoThumbnailCard";
import { Icons } from "@/constant/Icons";
import { useEffect, useRef, useState } from "react";

function VideoCard({ video, css }: any) {
  const router = useRouter();

  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);

  const handleOptionsClick = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setShowOptions(!showOptions);
  };

  const handleClickOutside = (event: any) => {
    if (optionsRef.current && !optionsRef.current.contains(event.target)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Link href={`video/watch/${video.id}`}>
      <div
        className={`flex group flex-col relative  text-white  justify-start items-start sm:w-[400px] ${css}`}
      >
        {/* video | image */}
        <VideoThumbnailCard
          imageUrl={video?.thumbnail}
          videoUrl={video?.url}
          duration={video?.duration}
          css="w-[400px] h-[240px]"
        />

        <div className="mt-3 relative flex justify-between items-start w-full">
          {/* details */}
          <div className="flex gap-3 cursor-pointer justify-start items-start">
            {/* Channel Logo */}
            <Link href={`/channel/@${video?.user.userName}`}>
              <div className="mt-1 w-12 h-12 rounded-full shrink-0 bg-white/[0.2] ">
                <Image
                  alt="channel"
                  loading="lazy"
                  width={48}
                  height={48}
                  className="h-full w-full shrink-0 object-cover rounded-full"
                  src={video?.user?.profileImage}
                />
              </div>
            </Link>
            {/* Video Related Data */}
            <div className="flex gap-1 flex-col w-[(calc(100%-48px))]">
              {/* Title of video */}
              <p className="sm:text-[17px] text-sm font-semibold">{`${video.title.substring(
                0,
                100
              )}..`}</p>

              <div className="flex gap-0 w-full justify-start items-start flex-col">
                {/* Channel Name */}
                <Link href={`/channel/@${video?.user.userName}`}>
                  <p className="sm:text-[15px] text-[13px] hover:text-white transition-all duration-150 ease-in-out  text-[white]/[0.8]">
                    {video?.user?.name}
                  </p>
                </Link>

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
            </div>
          </div>
          <span
            onClick={handleOptionsClick}
            className="text-white group-hover:block hidden text-xl hover:bg-white/[0.15] p-2  rounded-full"
          >
            <Icons.HiDotsVertical />
          </span>

          {showOptions && (
            <div
              ref={optionsRef}
              className="p-2 absolute right-5 z-10 top-5 flex rounded-lg flex-col gap-2 font-semibold bg-[#212020] text-white"
            >
              <span className="py-2 pl-1 pr-5 flex gap-2 items-center hover:bg-white/[0.15] rounded-md">
                <Icons.MdOutlineWatchLater className="text-2xl" />
                <p>Watch later</p>
              </span>
              <span className="py-2 pl-1 pr-5 flex gap-2 items-center hover:bg-white/[0.15] rounded-md">
                <Icons.MdPlaylistAdd className="text-2xl" />
                <p>Add to playlist</p>
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;
