import { getTime, getViews } from "@/utils/videoUtils";
import React from "react";
import { Icons } from "@/constant/Icons";
import VideoCard from "@/components/cards/VideoCard";
import { deleteVideo } from "@/actions/video";
import toast from "react-hot-toast";
import Link from "next/link";

const MyVideoCard = ({ video }: any) => {
  async function deleteHandeler() {
    const res = await deleteVideo(video.id);
    console.log(res);
    if (res) {
      toast.success("Video Deleted!");
    } else {
      toast.error("Video Not Delete!");
    }
  }

  return (
    <div>
      <div className="w-full flex justify-between border-white/[0.2] border-b-2 text-white/[0.8] hover:bg-black/[0.35]  pr-5 pl-2 transition-all py-2 duration-300 ease-in-out font-semibold items-start">
        {/* video | title */}
        <div className="flex w-3/5 justify-start items-start gap-8">
          <div>
            <VideoCard
              imageUrl={video.thumbnail}
              videoUrl={video.url}
              duration={video.duration}
              css="w-[180px] h-[80px]"
            />
          </div>
          <div className="py-3">
            <p>{video.title}</p>
          </div>
        </div>

        <div className="w-full py-3 flex justify-between items-start">
          {/* visibility */}
          <div>Visible</div>

          {/* restriction */}
          <div>
            <p>{video.isAgeRestricted ? "Yes" : "No"}</p>
          </div>

          {/* date */}
          <div>
            <p>{getTime(video.createdAt)} ago</p>
          </div>

          {/* views */}
          <div>
            <p>{getViews(video.viewsCount)}</p>
          </div>

          {/* Likes */}
          <div>
            <p>{getViews(video.likesCount)}</p>
          </div>
          {/* edit */}
          <Link
            href={`/video/edit-video?videoId=${video.id}`}
            className="cursor-pointer p-2 hover:bg-white/[0.2] rounded-full transition-all duration-200 ease-in-out"
          >
            <Icons.FaEdit />
          </Link>

          {/* delete */}
          <button
            onClick={deleteHandeler}
            className="cursor-pointer p-2 hover:bg-white/[0.2] transition-all duration-200 ease-in-out rounded-full"
          >
            <Icons.RiDeleteBin6Line />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyVideoCard;
