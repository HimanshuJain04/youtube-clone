"use client";

import { fetchVideo } from "@/actions/video";
import FormVideo from "@/components/form/FormVideo";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UpdateVideo() {
  const searchParams = useSearchParams();
  const videoId = searchParams.get("videoId");
  const [video, setVideo] = useState(null);

  async function getVideo() {
    try {
      const res: any = await fetchVideo(videoId!);
      setVideo(res);
    } catch (error) {
      console.log("ERROR UpdateVideo: ", error);
    }
  }

  useEffect(() => {
    if (videoId) {
      getVideo();
    }
  }, [videoId]);

  return (
    <div className="min-h-screen pb-10 pt-5 bg-black flex justify-center items-center">
      {video && (
        <FormVideo
          InitialFormValues={{
            title: video?.title,
            description: video?.description,
            isAgeRestricted: video?.isAgeRestricted,
            tags: video?.tags,
            thumbnailFile: video?.thumbnail,
            videoFile: video?.url,
            videoId: video?.id,
            status: video?.status || "",
          }}
          TYPE="UPDATE"
        />
      )}
    </div>
  );
}
