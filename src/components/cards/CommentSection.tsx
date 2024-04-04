"use client";
import { Context } from "@/app/context";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { createComment, fetchVideoComments } from "@/actions/comment";
import CommentCard from "@/components/cards/CommentCard";

const CommentSection = () => {
  const [inputValue, setInputValue] = useState("");
  const [comments, setComments] = useState(null);
  const { user }: any = useContext(Context);

  const videoId = window.location.pathname.split("/").at(-1);

  async function getVideoComments() {
    if (!videoId) {
      return;
    }

    try {
      const res: any = await fetchVideoComments(videoId);
      setComments(res);
    } catch (error) {
      console.log("Error getVideoComments: ", error);
      toast.error("Something went wrong!");
    }
  }

  async function createComments() {
    if (!user) {
      toast.error("Please Login!");
      return;
    }

    if (!inputValue) {
      toast.error("BKL kuch likh tohh!");
      return;
    }

    try {
      const res = await createComment({
        videoId,
        userId: user.id,
        content: inputValue,
      });
      toast.success("Comment created");
      setInputValue("");
      setComments([res, ...comments]);
    } catch (error) {
      console.log("Error createComments: ", error);
      toast.error("Something went wrong!");
    }
  }

  useEffect(() => {
    if (videoId) {
      getVideoComments();
    }
  }, [videoId]);

  return (
    <div className="flex flex-col pb-10 justify-start items-start gap-5">
      {/* comments */}
      <div className="flex font-bold text-2xl gap-2 justify-start items-center">
        <span>{comments?.length || "No"}</span>
        <p>Comments</p>
      </div>

      {user && (
        // create comment
        <div className="w-full flex justify-start gap-5 items-start">
          {/* profile image */}
          <div className="relative h-12 w-12 shrink-0">
            <Image
              src={user?.profileImage}
              objectFit="cover"
              layout="fill"
              className="rounded-full object-cover"
              alt="user"
            />
          </div>

          {/* input field | button */}
          <div className="w-full group flex flex-col gap-2 justify-start items-start">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Add a comment..."
              className="w-full outline-none bg-black focus-within:border-white/[0.8] transition-all duration-300 ease-in-out border-b-2 border-[white]/[0.3]"
            />
            <div className=" justify-end hidden group-focus-within:flex gap-5 w-full items-center">
              <button
                onClick={createComments}
                className="px-5 py-2 rounded-full cursor-pointer font-semibold text-black bg-blue-500 hover:bg-blue-400"
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* previos comments */}
      <div className="mt-5 w-full">
        {comments && (
          <div className="flex flex-col gap-8 justify-normal items-start">
            {comments?.map((comment: any) => (
              <CommentCard comment={comment} key={comment.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
