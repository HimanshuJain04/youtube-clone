"use client";
import React, { useContext, useEffect, useRef } from "react";
import { Icons } from "@/constant/Icons";
import { Context } from "@/app/context";
import toast from "react-hot-toast";
import { addToWatchLater } from "@/actions/video";

const CardOptions = ({ setShowOptions, videoId }: any) => {
  const optionsRef = useRef(null);
  const { user } = useContext(Context);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: any) => {
    if (optionsRef.current && !optionsRef.current.contains(event.target)) {
      setShowOptions(false);
    }
  };

  async function watchLaterHandler(event: any) {
    event.preventDefault();
    event.stopPropagation();

    if (!user) {
      toast.error("Please Login");
      return;
    }

    const res = await addToWatchLater(videoId, user.id);

    if (res) {
      toast.success("Added!");
    } else {
      toast.error("Something went wrong");
    }
    setShowOptions(false);
  }

  async function playlistHandler(event: any) {
    event.preventDefault();
    event.stopPropagation();

    if (!user) {
      toast.error("Please Login");
      return;
    }
  }

  return (
    <div
      ref={optionsRef}
      className="p-2 absolute right-5 z-10 top-5 flex rounded-lg flex-col gap-2 font-semibold bg-[#212020] text-white"
    >
      <span
        onClick={watchLaterHandler}
        className="py-2 pl-1 pr-5 flex gap-2 items-center hover:bg-white/[0.15] rounded-md"
      >
        <Icons.MdOutlineWatchLater className="text-2xl" />
        <p>Watch later</p>
      </span>
      <span
        onClick={playlistHandler}
        className="py-2 pl-1 pr-5 flex gap-2 items-center hover:bg-white/[0.15] rounded-md"
      >
        <Icons.MdPlaylistAdd className="text-2xl" />
        <p>Add to playlist</p>
      </span>
    </div>
  );
};

export default CardOptions;