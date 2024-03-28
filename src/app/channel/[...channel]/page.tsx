"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

const Page = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getChannelDetails() {
      const username = window.location.pathname
        .split("/")
        .at(-1)
        ?.replace("@", "");
      const res = await axios.get(`/api/channel?username=${username}`);
      setData(res.data.data);
    }

    getChannelDetails();
  }, []);

  return (
    <div className="min-h-screen w-full flex justify-center items-start">
      {data && (
        <div className="w-11/12 flex flex-col gap-5 justify-start items-start">
          {/* cover image */}
          <div className="w-full bg-white/[0.1] rounded-3xl h-[260px]">
            {data.coverImage && (
              <Image
                alt="Cover-profile"
                height={300}
                className=""
                src={data?.coverImage}
                width={100}
              />
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
            <div className="flex gap-3 flex-col">
              {/* name */}
              <div>
                <p className="text-5xl font-bold text-white">{data.name}</p>
              </div>

              {/* username | subscribers*/}
              <div className="text-white/[0.7] justify-center items-center  flex gap-2">
                <p>@{data.userName}</p>

                <div className="h-[3px] w-[3px] rounded-full bg-white/[0.5]"></div>

                <span className="flex gap-1">
                  <p>{data.subscribersCount}</p>
                  <p>subscribers</p>
                </span>

                <div className="h-[3px] w-[3px] rounded-full bg-white/[0.5]"></div>

                <span className="flex gap-1">
                  <p>{1}</p>
                  <p>videos</p>
                </span>
              </div>
              {/* description or additional details */}
              <div className="text-white/[0.7]">{data?.description}njjnv</div>

              <div className="bg-white">
                <button>Subscribe</button>
              </div>
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
