"use client";

import HomeCard from "@/components/cards/CardVideoFlexCol";
import Sidebar from "@/components/common/Sidebar";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchSearchedVideos } from "@/actions/video";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const value = searchParams.get("value");
  const [videos, setVideos] = useState(null);
  const router = useRouter();

  async function getSearchedVideos() {
    if (!value) return;
    const res: any = await fetchSearchedVideos(value);
    if (!res) {
      router.push("/something-went-wrong");
      return;
    }
    setVideos(res);
  }

  useEffect(() => {
    if (!value) {
      return;
    }
    getSearchedVideos();
  }, []);

  return (
    <div className="w-full gap-5 flex relative min-h-screen bg-black">
      <div>
        <Sidebar />
      </div>

      <div className="w-full bg-black flex flex-wrap justify-start items-start gap-y-10 gap-x-5">
        {videos &&
          (videos?.length > 0 ? (
            videos?.map((video: any) => (
              <HomeCard key={video?.id} video={video} />
            ))
          ) : (
            <div className="text-white text-2xl font-bold pt-20">
              <p>No videos found</p>
            </div>
          ))}
      </div>
    </div>
  );
}
