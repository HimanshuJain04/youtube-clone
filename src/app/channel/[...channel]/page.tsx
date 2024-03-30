"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import SubscribeButton from "@/components/buttons/SubscribeButton";

const Page = () => {
  const [data, setData] = useState(null);
  const [subscribers, setSubscribers] = useState(null);

  useEffect(() => {
    async function getChannelDetails() {
      const username = window.location.pathname
        .split("/")
        .at(-1)
        ?.replace("@", "");
      const { data } = await axios.get(`/api/channel?username=${username}`);
      setData(data.data);
      setSubscribers(data.data.subscribersCount);
    }

    getChannelDetails();
  }, []);

  return (
    <div className="min-h-screen w-full flex justify-center items-start">
      {data && (
        <div className="w-10/12 flex flex-col gap-5 justify-start items-start">
          {/* cover image */}

          <div className="w-full bg-white/[0.15]  relative rounded-3xl h-[200px]">
            {data.coverImage && (
              <Image alt="Cover-profile" src={data.coverImage} layout="fill" />
            )}
          </div>

          {/* profile description */}
          <div className="flex gap-10 mt-5">
            {/* profileimage */}
            <div className="h-[200px] w-[200px] rounded-full overflow-auto bg-white/[0.1]">
              {data.profileImage && (
                <Image
                  alt="profile"
                  width={200}
                  height={200}
                  src={data.profileImage}
                  className="rounded-full object-cover"
                />
              )}
            </div>

            {/* details */}
            <div className="flex gap-3 justify-start items-start flex-col">
              {/* name */}
              <div>
                <p className="text-5xl font-bold text-white">{data.name}</p>
              </div>

              {/* username | subscribers*/}
              <div className="text-white/[0.7] justify-center items-center  flex gap-2">
                <p>@{data.userName}</p>

                <div className="h-[3px] w-[3px] rounded-full bg-white/[0.5]"></div>

                <span className="flex gap-1">
                  <p>{subscribers}</p>
                  <p>subscribers</p>
                </span>

                <div className="h-[3px] w-[3px] rounded-full bg-white/[0.5]"></div>

                <span className="flex gap-1">
                  <p>{1}</p>
                  <p>videos</p>
                </span>
              </div>
              {/* description or additional details */}
              <div className="text-white/[0.7]">{data?.description}</div>

              <SubscribeButton
                setSubscribers={setSubscribers}
                channelId={data?.id}
              />
            </div>
          </div>

          {/* videos */}
          <div></div>
        </div>
      )}
    </div>
  );
};
export default Page;
