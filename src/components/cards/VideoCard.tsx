"use client";
import React, { useState } from "react";
import Image from "next/image";
import { getDuration } from "@/utils/videoUtils";

interface videoCardProps {
  imageUrl: string;
  videoUrl: string;
  duration: number;
  css: string;
}

const VideoCard = (props: videoCardProps) => {
  const { imageUrl, videoUrl, duration, css } = props;
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
        className={`relative overflow-hidden cursor-pointer ${css}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="w-full h-full relative flex justify-center items-center">
          {showVideo ? (
            <video
              src={videoUrl}
              className=" transition-opacity duration-[2000] object-contain w-full h-full ease-in-out "
              muted
              autoPlay
              controls
            />
          ) : (
            <Image
              loading="lazy"
              alt="thumbnail"
              layout="fill"
              sizes="(max-width: 100%), (max-width: 100%)"
              className="rounded-2xl transition-opacity duration-[2000] ease-in-out  w-full h-full"
              src={imageUrl}
            />
          )}
        </div>
        <div className="absolute right-2 text-white px-1 font-semibold rounded-md text-sm bg-black bottom-3">
          {getDuration(duration)}
        </div>
      </div>
    </>
  );
};

export default VideoCard;
