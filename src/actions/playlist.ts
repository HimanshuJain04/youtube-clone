"use server";

import client from "@/db";



export const createPlaylist = async (title: string, userId: string) => {
    try {

        if (!title || !userId) {
            return false;
        }

        await client.playlist.create(
            {
                data: {
                    title,
                    user: {
                        connect: {
                            id: userId
                        }
                    }
                }
            }
        );

        return true;

    } catch (error: any) {
        console.log(error)
        throw new Error("Server failed to create playlist", error);
    }
}



export const addToPlaylist = async (videoId: string, playlistId: string) => {
    try {

        if (!videoId || !playlistId) {
            return false;
        }

        await client.playlistVideo.create(
            {
                data: {
                    video: {
                        connect: {
                            id: videoId
                        }
                    },
                    playlist: {
                        connect: {
                            id: playlistId
                        }
                    }
                }
            }
        );

        return true;

    } catch (error: any) {
        console.log(error)
        throw new Error("Server failed to create playlist", error);
    }
}