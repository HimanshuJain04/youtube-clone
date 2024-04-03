"use client";

import { addVideoToPlaylist, createPlaylist } from "@/actions/playlist";
import { Context } from "@/app/context";
import { Icons } from "@/constant/Icons";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const Playlist = ({ setShowOptions, setShowPlaylists, videoId }: any) => {
  const [playlistName, setPlaylistName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [playlists, setPlaylists] = useState(null);
  const [addToPlaylist, setAddToPlaylist] = useState(null);

  const { user }: any = useContext(Context);

  async function createPlaylistHandelr() {
    if (!user.id || playlistName.trim().length === 0) {
      toast.error("User or playlist name is missing");
      return;
    }
    const res = await createPlaylist(playlistName, user.id);

    if (res) {
      toast.success("Playlist created!!");
      setShowForm(false);
      setPlaylists([...playlists, res]);
    } else {
      toast.error("Something went wrong!!");
    }
  }

  async function addToPlaylistHandelr() {
    if (!videoId) return;
    if (!addToPlaylist) {
      toast.error("Please select playlist");
      return;
    }
    const res = await addVideoToPlaylist(videoId, addToPlaylist);

    if (res) {
      toast.success("Video added to playlist!!");
      setShowOptions(false);
    } else {
      toast.error("Something went wrong!!");
    }
  }

  useEffect(() => {
    if (!user) {
      return;
    }

    setPlaylists(user.playlists);
  }, [user]);

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
          <div className="w-full h-[300px] overflow-auto">
            {playlists &&
              playlists?.map((playlist: any) => (
                <div
                  onClick={() => {
                    if (addToPlaylist === playlist.id) {
                      setAddToPlaylist(null);
                    } else {
                      setAddToPlaylist(playlist.id);
                    }
                  }}
                  key={playlist.id}
                >
                  <div className="flex justify-between">
                    <label
                      htmlFor={playlist.id}
                      className="text-white font-semibold"
                    >
                      {playlist.title}
                    </label>
                    <input
                      id={playlist.id}
                      checked={addToPlaylist === playlist.id}
                      type="checkbox"
                    />
                  </div>
                </div>
              ))}
          </div>

          {/* button */}
          {!showForm && (
            <div className="w-full mt-2 flex gap-2 justify-center items-center">
              <button
                onClick={addToPlaylistHandelr}
                className="w-full py-2 rounded-lg bg-blue-500 font-semibold"
              >
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
            <div className="w-full mt-2 flex flex-col gap-2">
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
