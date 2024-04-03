"use server";

import client from "@/db";



export const createPlaylist = async (title: string, userId: string) => {
    try {

        if (!title || !userId) {
            return false;
        }

        const res = await client.playlist.create(
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

        return res;

    } catch (error: any) {
        console.log(error)
        throw new Error("Server failed to create playlist", error);
    }
}

export const fetchPlaylistVideos = async (playlistId: string) => {
    try {

        if (!playlistId) {
            return false;
        }

        const allVideos = await client.playlist.findFirst(
            {
                where: {
                    id: playlistId
                },
                select: {
                    videos: {
                        select: {
                            video: {
                                select: {
                                    id: true,
                                    title: true,
                                    duration: true,
                                    thumbnail: true,
                                    createdAt: true,
                                    description: true,
                                    url: true,
                                    viewsCount: true,
                                    likesCount: true,
                                    isAgeRestricted: true,
                                    user: {
                                        select: {
                                            id: true,
                                            profileImage: true,
                                            userName: true,
                                            name: true,
                                        },
                                    },
                                },
                            }
                        }
                    }
                }
            }
        )

        return allVideos;

    } catch (error: any) {
        console.log(error)
        throw new Error("Server failed to fetch playlist videos: ", error);
    }
}


export const addVideoToPlaylist = async (videoId: string, playlistId: string) => {
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