"use server";

import client from "@/db";
import { uploadFileToCloudinary } from "@/utils/uploadFileToCloudinary";
import { FileIntoBuffer } from "@/utils/FileIntoBuffer";
import { formToJSON } from "axios";


export async function createVideo(body: any) {
    try {
        const { title, description, isAgeRestricted, userId, tags, thumbnailFile, videoFile
        } = formToJSON(body);

        if (!title || !description || !tags || !thumbnailFile || !videoFile) {
            throw new Error("All fields are required");
        }

        if (!userId) {
            throw new Error("User not found, Try again later");
        }

        const thumbnailBuffer = await FileIntoBuffer(thumbnailFile);
        const videoBuffer = await FileIntoBuffer(videoFile);

        const thumbnailRes = await uploadFileToCloudinary(thumbnailBuffer);
        const videoRes = await uploadFileToCloudinary(videoBuffer);

        const allTags = tags.split(",");

        const createdVideo = await client.video.create(
            {
                data: {
                    title,
                    description,
                    url: videoRes?.secure_url,
                    thumbnail: thumbnailRes?.secure_url,
                    isAgeRestricted: isAgeRestricted === "true" ? true : false,
                    tags: allTags,
                    userId: userId,
                    duration: videoRes.duration,
                }
            }
        );

        if (!createdVideo) {
            throw new Error("Server is failed to created video, Try again later");
        }

        return createdVideo;

    } catch (error: any) {
        console.log(error)
        throw new Error("Server failed to create video", error);
    }
}


export async function updateVideo(body: any) {
    try {
        const { title, description, isAgeRestricted, userId, tags, thumbnailFile, videoFile, status, videoId } = formToJSON(body);

        if (!title || !description || !tags || !thumbnailFile || !videoFile || !videoId) {
            throw new Error("All fields are required");
        }

        if (!userId) {
            throw new Error("User not found, Try again later");
        }

        let videoRes = videoFile;

        if (typeof videoFile !== "string") {
            const videoBuffer = await FileIntoBuffer(videoFile);
            videoRes = await uploadFileToCloudinary(videoBuffer);
        }

        let thumbnailRes = thumbnailFile;

        if (typeof thumbnailFile !== "string") {
            const thumbnailBuffer = await FileIntoBuffer(thumbnailFile);
            thumbnailRes = await uploadFileToCloudinary(thumbnailBuffer);
        }

        const allTags = tags.split(",");

        const updatedVideo = await client.video.update(
            {
                where: {
                    id: videoId
                },
                data: {
                    title,
                    description,
                    url: videoRes?.secure_url,
                    thumbnail: thumbnailRes?.secure_url,
                    isAgeRestricted: isAgeRestricted === "true" ? true : false,
                    tags: allTags,
                    userId: userId,
                    duration: videoRes.duration,
                }
            }
        );

        if (!updatedVideo) {
            throw new Error("Server is failed to update video, Try again later");
        }

        return updatedVideo;

    } catch (error: any) {
        console.log(error)
        throw new Error("Server failed to update video", error);
    }
}


export async function deleteVideo(videoId: string, userId: string) {
    try {

        if (!videoId || userId) {
            throw new Error("Video Id and User Id is required");
        }

        // likes
        await client.likesOnVideo.deleteMany(
            {
                where: {
                    videoId,
                }
            }
        );

        // dislikes
        await client.dislikesOnVideo.deleteMany(
            {
                where: {
                    videoId,
                }
            }
        );

        // views
        await client.viewsOnVideo.deleteMany(
            {
                where: {
                    videoId,
                }
            }
        );


        // playlist
        await client.playlistVideo.deleteMany(
            {
                where: {
                    videoId,
                }
            }
        );


        // delete video
        await client.video.delete(
            {
                where: {
                    id: videoId
                }
            }
        );

        return true;

    } catch (error: any) {
        console.log(error)
        return false;
    }
}


export async function fetchUserVideos(channelId: string) {
    try {

        if (!channelId) {
            return null;
        }

        const allVideos = await client.video.findMany(
            {
                where: {
                    userId: channelId
                },
                select: {
                    id: true,
                    title: true,
                    duration: true,
                    description: true,
                    thumbnail: true,
                    createdAt: true,
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
        );
        return allVideos;

    } catch (error) {
        return null;
    }
}


export async function fetchUserLikedVideos(userId: string) {
    try {

        if (!userId) {
            return null;
        }

        const allVideos = await client.likesOnVideo.findMany(
            {
                where: {
                    userId: userId
                },
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
                    },
                },
            }
        );
        return allVideos;

    } catch (error) {
        return null;
    }
}


export async function fetchUserHistoryVideos(userId: string) {
    try {

        if (!userId) {
            return null;
        }

        const allVideos = await client.viewsOnVideo.findMany(
            {
                where: {
                    userId: userId
                },
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
                    },
                },
            }
        );

        return allVideos;

    } catch (error) {
        return null;
    }
}


export async function fetchSubscribedChannelVideos(userId: string) {
    try {

        if (!userId) return null;

        const videoData = await client.user.findFirst(
            {
                where: {
                    id: userId
                },
                select: {
                    subscribesTo: {
                        select: {
                            videos: {
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
        );

        return videoData;

    } catch (err: any) {

        console.log("Server failed to get subscribed channel videos, try again later: ", err)
        throw new Error("Server failed to get video, try again later")
    }
}

export async function fetchVideo(videoId: string) {
    try {

        const videoData = await client.video.findFirst(
            {
                where: {
                    id: videoId
                },
                select: {
                    id: true,
                    title: true,
                    createdAt: true,
                    url: true,
                    description: true,
                    viewsCount: true,
                    tags: true,
                    isAgeRestricted: true,
                    thumbnail: true,
                    likesCount: true,
                    user: {
                        select: {
                            id: true,
                            profileImage: true,
                            userName: true,
                            name: true,
                            subscribersCount: true
                        }
                    }
                }
            }
        );

        return videoData;

    } catch (err: any) {

        console.log("Server failed to get video, try again later: ", err)
        throw new Error("Server failed to get video, try again later")
    }
}

export async function fetchUserWatchLater(userId: string) {
    try {

        if (!userId) {
            return false;
        }


        const allVideos = await client.watchLater.findMany(
            {
                where: {
                    userId: userId
                },
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
                    },
                },
            }
        );
        return allVideos;

    } catch (err: any) {

        console.log("Server failed to removeFromWatchLater, try again later: ", err)
        throw new Error("Server failed to remove video from watch later, try again later")
    }
}

export async function addToWatchLater(videoId: string, userId: string) {
    try {

        if (!videoId || !userId) {
            return false;
        }

        const isAlreadyExist = await client.watchLater.findFirst(
            {
                where: {
                    userId,
                    videoId
                }
            }
        )

        if (isAlreadyExist) {
            return true;
        }

        await client.watchLater.create(
            {

                data: {
                    video: { connect: { id: videoId } },
                    user: { connect: { id: userId } },
                }
            }
        );

        return true;

    } catch (err: any) {

        console.log("Server failed to addToWatchLater, try again later: ", err)
        throw new Error("Server failed to add video to watch later, try again later")
    }
}

export async function removeFromWatchLater(videoId: string, userId: string) {
    try {

        if (!videoId || !userId) {
            return false;
        }

        await client.watchLater.delete(
            {
                where: {
                    videoId_userId: {
                        videoId: videoId,
                        userId: userId
                    }
                }
            }
        );

        return true;

    } catch (err: any) {

        console.log("Server failed to removeFromWatchLater, try again later: ", err)
        throw new Error("Server failed to remove video from watch later, try again later")
    }
}

export async function removeFromHistory(videoId: string, userId: string) {
    try {

        if (!videoId || !userId) {
            return false;
        }

        await client.viewsOnVideo.delete(
            {
                where: {
                    videoId_userId: {
                        videoId: videoId,
                        userId: userId
                    }
                }
            }
        );

        return true;

    } catch (err: any) {

        console.log("Server failed to removeFromHistory, try again later: ", err)
        throw new Error("Server failed to remove video from history, try again later")
    }
}


export const viewsHandler = async (postId: string, userId: string) => {
    try {

        // if the user is loggedIn then push the user into viewsOnVideo DB

        // userId, that means user is loggedIn
        if (userId) {

            // check user is already watched video or not
            const isAlreadyWatched = await client.viewsOnVideo.findFirst(
                {
                    where: {
                        videoId: postId,
                        userId
                    }

                }
            );

            // if not then create new entry in db
            if (!isAlreadyWatched) {

                const enrty = await client.viewsOnVideo.create(
                    {
                        data: {
                            video: { connect: { id: postId } },
                            user: { connect: { id: userId } },
                        }
                    }
                );
            }
        }

        // Increase the count on video
        const viewsCount = await client.video.update(
            {
                where: {
                    id: postId,
                },
                data: {
                    viewsCount: { increment: 1 }
                },
                select: {
                    viewsCount: true
                }
            }
        );

        return {
            viewsCount
        };

    } catch (error) {
        console.log("Error Views: ", error)
        return false;

    }
}













