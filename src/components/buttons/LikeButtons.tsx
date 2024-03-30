import { dislikedPostHandler, likedPostHandler } from "@/actions/like";
import { Context } from "@/app/context";
import { videoIcons } from "@/constant/Icons";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

const LikeButtons = ({ videoId, likesCount }: any) => {
  const { user }: any = useContext(Context);

  const [totalLikes, setTotalLikes] = useState(likesCount);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  async function likeHandler() {
    const res = await likedPostHandler(videoId!, user.id);

    if (!res) {
      toast.error("Like Handler Failed");
    } else {
      console.log("res: ", res);
      setIsLiked(res.status);
      setIsDisliked(false);
      toast.success(res.status ? "Liked" : "Unliked");
      setTotalLikes(res.likeCount?.likesCount);
    }
  }

  async function dislikeHandler() {
    const res = await dislikedPostHandler(videoId!, user.id);

    if (!res) {
      toast.error("Dislike Handler Failed");
    } else {
      setIsDisliked(res.status);
      setTotalLikes(res.likeCount?.likesCount);
      setIsLiked(false);
      toast.success(res.status ? "Disliked" : "Undisliked");
    }
  }

  return (
    <div>
      <div className="flex justify-center items-center gap-5">
        {/* like | dislike */}
        <div className="text-white flex justify-center text-2xl items-center rounded-full bg-white/[0.2]">
          {/* like */}
          <div
            onClick={likeHandler}
            className="flex border-r-2  transition-all duration-200 ease-in-out py-[8px] px-4 gap-2 cursor-pointer rounded-l-full hover:bg-white/[0.25] border-white/[0.5] justify-center items-center"
          >
            {isLiked ? <videoIcons.BiSolidLike /> : <videoIcons.BiLike />}
            <p className="text-base">{totalLikes > 0 && totalLikes}</p>
          </div>
          {/* dislike */}
          <div
            onClick={dislikeHandler}
            className="flex px-4 hover:bg-white/[0.25] transition-all duration-200 ease-in-out cursor-pointer py-[8px] rounded-r-full  justify-center items-center"
          >
            {isDisliked ? (
              <videoIcons.BiSolidDislike />
            ) : (
              <videoIcons.BiDislike />
            )}
          </div>
        </div>
        {/* share */}
        <div className="text-white flex justify-center items-center gap-2 rounded-full cursor-pointer hover:bg-white/[0.25] transition-all duration-200 ease-in-out text-xl py-2 px-4 bg-white/[0.2]">
          <videoIcons.FaShare />
          <p className="text-base">Share</p>
        </div>
        {/* dots */}
        <div className="p-3 bg-white/[0.2] rounded-full hover:bg-white/[0.25] transition-all duration-200 ease-in-out text-2xl cursor-pointer">
          <videoIcons.HiDotsHorizontal />
        </div>
      </div>
    </div>
  );
};

export default LikeButtons;
