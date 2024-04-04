import { Context } from "@/app/context";
import React, { useContext, useState } from "react";
import Image from "next/image";

const CommentSection = () => {
  const [inputValue, setInputValue] = useState("");

  const { user } = useContext(Context);

  return (
    <div className="flex flex-col justify-start items-start gap-5">
      {/* comments */}
      <div className="flex font-bold text-2xl gap-2 justify-start items-center">
        <span>{"109"}</span>
        <p>Comments</p>
      </div>

      {/* create comment */}
      <div className="w-full">
        {/* profile image */}
        <div className="relative">
          {user && (
            <Image
              src={user.profileImage}
              objectFit="cover"
              layout="fill"
              className="rounded-full object-cover"
              alt="user"
            />
          )}
        </div>

        {/* input field */}
        <div className="w-full flex flex-col justify-start items-start">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full"
          />
          <div className="flex justify-end gap-5 items-center">
            <button className="px-5 py-2 rounded-full cursor-pointer font-semibold text-white bg-black hover:bg-white/[0.2]">
              Cancel
            </button>
            <button className="px-5 py-2 rounded-full cursor-pointer font-semibold text-black bg-blue-500 hover:bg-blue-400">
              Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
