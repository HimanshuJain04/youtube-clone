"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Icons } from "@/constant/Icons";
import { Context } from "@/app/context";
import toast from "react-hot-toast";
import { addToWatchLater } from "@/actions/video";

const CardOptions = ({ setShowOptions, videoId }: any) => {
  const optionsRef = useRef(null);
  const { user } = useContext(Context);

  const [showPlaylists, setShowPlaylists] = useState(false);

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
    setShowPlaylists(true);
  }

  return (
    <div
      ref={optionsRef}
      className="p-2 absolute right-5 z-10 top-5 flex rounded-lg flex-col gap-2 font-semibold bg-[#212020] text-white"
    >
      {showPlaylists && (
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="w-screen justify-center flex items-center text-white h-screen fixed top-0 left-0 backdrop-blur-sm "
        >
          <div className="p-3 z-10 flex flex-col gap-2 w-[300px] bg-[#302e2e] rounded-lg">
            {/* navbar */}
            <div className="w-full font-semibold flex justify-between gap-8 items-center">
              <p>Playlists</p>
              <button
                onClick={() => {
                  setShowPlaylists(false);
                  setShowOptions(false);
                }}
                className="hover:bg-white/[0.1] text-lg p-2 rounded-full"
              >
                <Icons.RxCross1 />
              </button>
            </div>

            {/* playlists */}
            <div className="w-full"></div>

            {/* button */}
            <div className="w-full flex gap-2 justify-center items-center">
              <button className="w-full py-2 rounded-lg bg-blue-500 font-semibold">
                Add to playlist
              </button>
              <button className="w-full py-2 rounded-lg bg-blue-500 font-semibold">
                Create Playlist
              </button>
            </div>
          </div>
        </div>
      )}

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
