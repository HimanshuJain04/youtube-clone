"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

const Page = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getChannelDetails() {
      console.log("hih");
      const username = window.location.pathname.split("/").at(-1);
      const res = await axios.get(`/api/channel?username=${username}`);
      console.log("res: ", res.data.data);
      setData(res.data.data);
    }

    getChannelDetails();
  }, []);

  return (
    <div className="min-h-screen w-full">
      <div>
        {/* cover image */}
        <div>
          <Image
            alt="Cover-profile"
            height={100}
            className=""
            src={""}
            width={100}
          />
        </div>

        {/* profile description */}
        <div>
          {/* profileimage */}
          <div>
            <Image
              alt="profile"
              width={100}
              height={100}
              src={""}
              className=""
            />
          </div>
          {/* details */}
          <div>
            {/* name */}
            <div>
              <p></p>
            </div>

            {/* username | subscribers*/}
            <div>
              <p>@{}</p>
              <span>
                <p>{}</p>
                <p>subscribers</p>
              </span>

              <span>
                <p>{}</p>
                <p>videos</p>
              </span>
            </div>
            {/* description or additional details */}
            <div></div>

            <div>
              <button>Subscribe</button>
            </div>
          </div>
        </div>

        {/* videos */}
        <div></div>
      </div>
    </div>
  );
};

export default Page;
