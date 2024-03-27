"use client";
import React, { useState } from "react";
import Image from "next/image";
import { getDuration } from "@/utils/videoUtils";

interface videoCardProps {
  imageUrl: string;
  videoUrl: string;
  duration: number;
}

const VideoCard = (props: videoCardProps) => {
  const { imageUrl, videoUrl, duration } = props;
  const [showVideo, setShowVideo] = useState(false);
  let timer: any;

  const handleMouseEnter = () => {
    console.log("enter");
    timer = setTimeout(() => {
      setShowVideo(true);
    }, 2000);
  };

  const handleMouseLeave = () => {
    console.log("eave");
    clearTimeout(timer);
    setShowVideo(false);
  };

  return (
    <>
      {/* Image || Video */}
      <div
        className="relative sm:h-[225px] overflow-hidden bg-red-100 w-full h-[150px] cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="w-full h-full">
          {showVideo ? (
            <>
              <video
                src={videoUrl}
                className=" transition-opacity duration-[2000] ease-in-out "
                width="100%"
                height="100%"
                muted
                autoPlay
                controls
              />
            </>
          ) : (
            <>
              <Image
                loading="lazy"
                alt="thumbnail"
                width={380}
                height={250}
                className="rounded-md transition-opacity duration-[2000] ease-in-out  w-full h-full"
                src={imageUrl}
              />
            </>
          )}
        </div>
        <span className="absolute right-2 px-1 font-semibold rounded-md text-sm bg-black bottom-3">
          {getDuration(duration)}
        </span>
      </div>
    </>
  );
};

export default VideoCard;
