import React, { useEffect, useState } from "react";
import { fetchUserVideos } from "@/actions/video";
import CardVideoFlexCol from "@/components/cards/CardVideoFlexCol";

const menu = [
  {
    title: "Home",
    func: fetchUserVideos,
  },
  {
    title: "Videos",
    func: fetchUserVideos,
  },
  {
    title: "Live",
    func: fetchUserVideos,
  },
  {
    title: "Playlists",
    func: fetchUserVideos,
  },
];

const VideosSection = ({ channelId }: any) => {
  const [option, setOption] = useState(menu[0]);
  const [videos, setVideos] = useState(null);

  async function getVideos() {
    const res = await option.func(channelId);
    setVideos(res);
  }

  useEffect(() => {
    getVideos();
  }, [option]);

  return (
    <div className="w-full">
      <div className="w-full">
        {/* menu bar */}
        <div className="border-b-[1px] flex gap-8 px-5 border-white/[0.2] w-full">
          {menu.map((item) => (
            <>
              <div
                onClick={() => setOption(item)}
                className={` ${
                  option.title === item.title
                    ? "text-white border-white"
                    : "text-white/[0.5] border-transparent"
                } font-semibold cursor-pointer transition-all capitalize duration-200 ease-in-out border-b-[3px] pb-2 `}
              >
                {item.title}
              </div>
            </>
          ))}
        </div>

        {/* videos */}
        <div className="w-full mt-10 pb-10">
          <div className="flex flex-wrap gap-5">
            {videos &&
              videos?.map((video) => (
                <CardVideoFlexCol video={video} key={video.id} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideosSection;
