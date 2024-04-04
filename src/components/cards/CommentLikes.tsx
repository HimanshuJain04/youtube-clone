"use client";
import { Icons } from "@/constant/Icons";
import React from "react";

const CommentLikes = () => {
  return (
    <div className="flex text-white mt-1 gap-5 justify-center items-center">
      <div className="flex justify-center items-center">
        <span className="p-1 cursor-pointer text-2xl rounded-full hover:bg-white/[0.2]">
          <Icons.BiLike />
        </span>
        <span>12</span>
      </div>

      <span className="p-1 cursor-pointer text-2xl rounded-full hover:bg-white/[0.2]">
        <Icons.BiDislike />
      </span>
    </div>
  );
};

export default CommentLikes;
