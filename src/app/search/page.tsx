"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchSearchedVideos } from "@/actions/video";
import ShowVideos from "@/components/cards/ShowVideos";

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
  }, [value]);

  return (
    <div className="w-full gap-5 flex relative min-h-screen bg-black">
      {videos &&
        (videos?.length > 0 ? (
          <ShowVideos flag={true} Type="Playlist" videos={videos} />
        ) : (
          <div className="text-white text-2xl font-bold pt-20">
            <p>No videos found</p>
          </div>
        ))}
    </div>
  );
}
