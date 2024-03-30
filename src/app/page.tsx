import HomeCard from "@/components/cards/CardVideoFlexCol";
import Sidebar from "@/components/common/Sidebar";
import { redirect } from "next/navigation";
import client from "@/db";

async function getHomeVideos() {
  try {
    const allVideo = client.video.findMany({
      select: {
        id: true,
        title: true,
        duration: true,
        thumbnail: true,
        createdAt: true,
        url: true,
        viewsCount: true,
        user: {
          select: {
            id: true,
            profileImage: true,
            userName: true,
            name: true,
          },
        },
      },
    });

    return allVideo;
  } catch (error: any) {
    console.log("ERROR HOMEPAGE: ", error);
    redirect("/something-went-wrong");
  }
}

export default async function Home() {
  const videos = await getHomeVideos();

  return (
    <div className="w-full gap-5 flex relative min-h-[calc(100vh-100px)] bg-black">
      <div>
        <Sidebar />
      </div>

      <div className="w-full flex flex-wrap justify-start items-start gap-y-10 gap-x-5">
        {videos?.length > 0 &&
          videos?.map((video) => <HomeCard key={video?.id} video={video} />)}
      </div>
    </div>
  );
}
