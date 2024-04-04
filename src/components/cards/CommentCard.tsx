"use client";
import React from "react";
import Image from "next/image";
import { getTime } from "@/utils/videoUtils";
import Link from "next/link";

const CommentCard = ({ comment }) => {
  return (
    <div className="flex flex-row gap-5 justify-start items-start">
      {/* user image */}
      <Link href={`/channel/${comment?.user?.userName}`}>
        <div className="relative cursor-pointer rounded-full bg-white/[0.2] h-12 w-12 shrink-0">
          {comment.user && (
            <Image
              src={comment?.user?.profileImage}
              objectFit="cover"
              layout="fill"
              className="rounded-full object-cover"
              alt="user"
            />
          )}
        </div>
      </Link>

      {/* others */}
      <div className="flex w-full flex-col justify-start items-start gap-1">
        {/* name | createdAt */}
        <div className="flex justify-start gap-2 items-center">
          <Link
            href={`/channel/${comment?.user?.userName}`}
            className="font-semibold cursor-pointer"
          >
            @{comment?.user?.userName}
          </Link>
          <span className="text-white/[0.7] font-light text-sm">
            {getTime(comment?.createdAt)} ago
          </span>
        </div>
        {/* content */}
        <div className="font-medium max-w-[90%]">
          <p>{comment?.content}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
