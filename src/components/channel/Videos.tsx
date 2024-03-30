"use server";

import { fetchUserVideos } from "@/actions/video";
import CardVideoFlexCol from "@/components/cards/CardVideoFlexCol";

async function getVideos(userId) {
  return await fetchUserVideos(userId);
}

const Videos = async ({ userId }: any) => {
  const allVideos = await getVideos(userId);

  return (
    <>
      {allVideos && (
        <div className="flex w-full flex-wrap">
          {allVideos?.map((video) => (
            <CardVideoFlexCol video={video} key={video.id} />
          ))}
        </div>
      )}
    </>
  );
};

export default Videos;
