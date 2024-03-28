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
    timer = setTimeout(() => {
      setShowVideo(true);
    }, 2000);
  };

  const handleMouseLeave = () => {
    clearTimeout(timer);
    setShowVideo(false);
  };

  return (
    <>
      {/* Image || Video */}
      <div
        className="relative sm:h-[250px] overflow-hidden w-full h-[150px] cursor-pointer"
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
                className="rounded-2xl transition-opacity duration-[2000] ease-in-out  w-full h-full"
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
