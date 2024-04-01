"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getTime, getViews } from "@/utils/videoUtils";
import VideoThumbnailCard from "@/components/cards/VideoThumbnailCard";

function VideoCard({ video, css }: any) {
  const router = useRouter();

  return (
    <Link href={`/video/watch/${video.id}`}>
      <div
        className={`flex group flex-row gap-5 relative  text-white  justify-start items-start
         overflow-hidden w-full ${css}`}
      >
        {/* video | image */}
        <VideoThumbnailCard
          imageUrl={video?.thumbnail}
          videoUrl={video?.url}
          duration={video?.duration}
          css="w-[500px] h-[250px]"
        />

        {/* details */}
        <div className="flex gap-1 flex-col overflow-hidden cursor-pointer justify-start items-start mt-3">
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
                  layout="fill"
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
          <p className="text-[white]/[0.6] mt-2 max-w-full text-[15px]">
            {`${video?.description?.substring(0, 200)}..`}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;
