"use client";

import React from "react";
import image from "/public/fake.jpeg";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

function HomeCard({ video }) {
  console.log("video: ", video);
  const router = useRouter();

  return (
    <Link
      href={`video/watch/${video.id}`}
      className="flex group flex-col relative  text-white w-[250px] overflow-hidden sm:w-[380px]"
    >
      {/* Image || Video */}
      <div className="relative sm:h-[225px] w-full h-[150px] cursor-pointer">
        <div className="w-full h-full">
          <Image
            loading="lazy"
            alt="thumbnail"
            width={380}
            height={250}
            className="rounded-md transition-opacity duration-[2000] ease-in-out group-hover:hidden block w-full h-full"
            src={video.thumbnail}
          />
          <video
            src={video.url}
            className="group-hover:block transition-opacity duration-[2000] ease-in-out hidden"
            width="100%"
            height="100%"
            muted
            autoPlay
            controls
          />
        </div>
        <span className="absolute right-2 px-1 font-semibold rounded-md text-sm bg-black bottom-3">
          {"4:17"}
        </span>
      </div>

      <div className="flex gap-3 cursor-pointer justify-start items-start mt-3">
        {/* Channel Logo */}
        <div
          onClick={() => {
            router.push(`/channel`);
          }}
          className="mt-1 w-[40px] rounded-full shrink-0 h-[40px]"
        >
          <Image
            alt="channel-logo"
            loading="lazy"
            width={40}
            height={40}
            className="h-full w-full shrink-0 object-cover rounded-full"
            src={image}
          />
        </div>

        {/* Video Related Data */}
        <div className="flex gap-1 flex-col w-[(calc(100%-40px))]">
          {/* Title of video */}
          <p className="sm:text-[17px] text-sm font-semibold">{`${video.title.substring(
            0,
            100
          )}..`}</p>

          <div className="flex gap-0 w-full justify-start items-start flex-col">
            {/* Channel Name */}
            <p
              onClick={() => {
                router.push(`/channel`);
              }}
              className="sm:text-[15px] text-[13px] hover:text-white transition-all duration-150 ease-in-out  text-[white]/[0.8]"
            >
              Channel Name
            </p>

            {/* View And Time */}
            <div className="flex justify-start items-center gap-1 text-[white]/[0.7] text-[13px] sm:text-[15px] ">
              {/* Views */}
              <p>
                <span>{"50k"}</span> views
              </p>
              <p className="text-center bg-[white]/[0.7] h-[2px] w-[2px] rounded-full"></p>
              {/* Time */}
              <p>
                <span>{"2 month"}</span> ago
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default HomeCard;
