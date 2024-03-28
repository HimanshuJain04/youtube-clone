"use server";

import client from "@/db";



export const likedPost = async (postId: string, userId: string) => {
    try {

        // Check if the user has already liked the video
        const existingLike = await client.likesOnVideo.findFirst({
            where: {
                videoId: postId,
                userId: userId
            }
        });

        if (existingLike) {
            // If the user has already liked the video, unlike it
            await client.likesOnVideo.delete({
                where: {
                    videoId_userId: {
                        videoId: postId,
                        userId: userId
                    }
                }
            });

            // Decrease the likesCount of the video
            await client.video.update({
                where: { id: postId },
                data: { likesCount: { decrement: 1 } }
            });

        } else {
            // If the user hasn't liked the video, like it
            await client.likesOnVideo.create({
                data: {
                    video: { connect: { id: postId } },
                    user: { connect: { id: userId } },
                    likedAt: new Date()
                }
            });

            // Increment the likesCount of the video
            await client.video.update({
                where: { id: postId },
                data: { likesCount: { increment: 1 } }
            });
        }


        return true;

    } catch (error) {

        return false;

    }
}


export const dislikedPost = async (postId: string, userId: string) => {
    try {

        // Check if the user has already liked the video
        const existingDislike = await client.dislikesOnVideo.findFirst({
            where: {
                videoId: postId,
                userId: userId
            }
        });

        if (existingDislike) {
            // If the user has already disliked the video, undislike it
            await client.dislikesOnVideo.delete({
                where: {
                    videoId_userId: {
                        videoId: postId,
                        userId: userId
                    }
                }
            });

            // decrement the dislikesCount of the video
            await client.video.update({
                where: { id: postId },
                data: { likesCount: { decrement: 1 } }
            });

        } else {
            // If the user hasn't disliked the video, dislike it
            await client.dislikesOnVideo.create({
                data: {
                    video: { connect: { id: postId } },
                    user: { connect: { id: userId } },
                    dislikedAt: new Date()
                }
            });
            // Increment the dislikesCount of the video
            await client.video.update({
                where: { id: postId },
                data: { likesCount: { increment: 1 } }
            });
        }

        return true;
    } catch (error) {
        return false;
    }
}