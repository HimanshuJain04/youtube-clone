"use client";

import { fetchRecommendedVideos } from "@/actions/video";
import React, { useEffect, useState } from "react";
import CardVideoFlexRow from "./CardVideoFlexRow";

const RecommendedVideos = ({ videoId }: any) => {
  const [videos, setVideos] = useState(null);

  async function getVideos() {
    if (!videoId) {
      return;
    }
    try {
      const res: any = await fetchRecommendedVideos(videoId);
      setVideos(res);
    } catch (error) {
      console.log("Error RecommendedVideos: ", error);
    }
  }
  useEffect(() => {
    getVideos();
  }, [videoId]);

  return (
    <div>
      <div className="flex flex-col gap-5">
        {videos &&
          videos?.map((video: any) => (
            <div key={video.id}>
              <div>
                <CardVideoFlexRow
                  css="w-[220px] h-[130px]"
                  flag={true}
                  video={video}
                  Type="Recommended"
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecommendedVideos;
