"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getTime, getViews } from "@/utils/videoUtils";
import VideoCard from "@/components/cards/VideoCard";
import { useContext } from "react";
import { Context } from "@/app/context";

function HomeCard({ video }: any) {
  const router = useRouter();
  const { showSideBar } = useContext(Context);
  // TODO : fix small cards

  return (
    <Link href={`video/watch/${video.id}`}>
      <div
        className={`flex group flex-col relative  text-white  justify-start items-start
         overflow-hidden sm:w-[400px] ${
           showSideBar ? "w-[250px]" : "w-[150px]"
         }`}
      >
        {/* video | image */}
        <VideoCard
          imageUrl={video?.thumbnail}
          videoUrl={video?.url}
          duration={video?.duration}
        />
        {/* details */}
        <div className="flex gap-3 cursor-pointer justify-start items-start mt-3">
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
                <p>
                  <span>{getViews(video?.viewsCount)}</span> views
                </p>
                <p className="text-center bg-[white]/[0.7] h-[2px] w-[2px] rounded-full"></p>
                {/* Time */}
                <p>
                  <span>{getTime(video?.createdAt)}</span> ago
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default HomeCard;
