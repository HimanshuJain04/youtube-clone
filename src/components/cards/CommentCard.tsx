"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { getTime } from "@/utils/videoUtils";
import Link from "next/link";
import { Icons } from "@/constant/Icons";
import { Context } from "@/app/context";
import toast from "react-hot-toast";
import { deleteComment } from "@/actions/comment";

const CommentCard = ({ comment }: any) => {
  const { user }: any = useContext(Context);

  async function deleteHandler() {
    try {
      const res = await deleteComment(comment.id);

      toast.success("Comment Deleted!!");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }

  return (
    <div className="flex group flex-row gap-5 w-full relative justify-start items-start">
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

      {user?.id === comment?.user?.id && (
        <span
          onClick={deleteHandler}
          className="text-xl top-1 transition-all duration-100 ease-in-out hidden group-hover:block absolute right-0 cursor-pointer p-2 hover:bg-white/[0.15] rounded-full"
        >
          <Icons.RiDeleteBin6Line />
        </span>
      )}
    </div>
  );
};

export default CommentCard;
