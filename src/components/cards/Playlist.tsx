"use client";

import { createPlaylist } from "@/actions/playlist";
import { Icons } from "@/constant/Icons";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Playlist = ({ setShowOptions, setShowPlaylists, userId }: any) => {
  const [playlistName, setPlaylistName] = useState("");
  const [showForm, setShowForm] = useState(false);

  async function createPlaylistHandelr() {
    if (!userId || playlistName.trim().length === 0) {
      toast.error("User or playlist name is missing");
      return;
    }
    const res = await createPlaylist(playlistName, userId);

    console.log("res");

    if (res) {
      toast.success("Playlist created!!");
    } else {
      toast.error("Something went wrong!");
    }
  }

  return (
    <div>
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
          {!showForm && (
            <div className="w-full flex gap-2 justify-center items-center">
              <button className="w-full py-2 rounded-lg bg-blue-500 font-semibold">
                Add to playlist
              </button>
              <button
                onClick={() => setShowForm(true)}
                className="w-full py-2 rounded-lg bg-blue-500 font-semibold"
              >
                Create Playlist
              </button>
            </div>
          )}

          {showForm && (
            <div className="w-full flex flex-col gap-2">
              <input
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                type="text"
                className="px-3 py-2 text-white outline-none rounded-md bg-white/[0.1] w-full"
                placeholder="Playlist name"
              />

              <button
                onClick={createPlaylistHandelr}
                className="w-full text-white bg-blue-500 py-2 px-3 rounded-lg"
              >
                Create Playlist
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Playlist;
