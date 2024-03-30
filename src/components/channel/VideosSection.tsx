import React, { useState } from "react";
import Videos from "@/components/channel/Videos";

const menu = [
  {
    title: "Home",
  },
  {
    title: "Videos",
  },
  {
    title: "Live",
  },
  {
    title: "Playlists",
  },
];

const VideosSection = ({ channelId }: any) => {
  const [option, setOption] = useState(menu[0].title);

  return (
    <div className="w-full">
      <div className="w-full">
        {/* menu bar */}
        <div className="border-b-[1px] flex gap-8 px-5 border-white/[0.2] w-full">
          {menu.map((item) => (
            <>
              <div
                onClick={() => setOption(item.title)}
                className={` ${
                  option === item.title
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
        <div className="w-full">
          <Videos userId={channelId} />
        </div>
      </div>
    </div>
  );
};

export default VideosSection;
