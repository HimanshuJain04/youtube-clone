"use server";

import client from "@/db";


// Check if the user has already liked the video
const isAlreadyLiked = async (postId: string, userId: string) => {
    return await client.likesOnVideo.findFirst({
        where: {
            videoId: postId,
            userId: userId
        }
    });
}


// Check if the user has already disliked the video
const isAlreadyDisliked = async (postId: string, userId: string) => {
    return await client.dislikesOnVideo.findFirst({
        where: {
            videoId: postId,
            userId: userId
        }
    });
}


// Remove the like from db
const removeLike = async (postId: string, userId: string) => {
    // remove like
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
}


// Remove the dislike from db
const removeDislike = async (postId: string, userId: string) => {
    // remove dislike
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
}




export const likedPost = async (postId: string, userId: string) => {
    try {

        if (await isAlreadyLiked(postId, userId)) {
            // If the user has already liked the video, unlike it
            await removeLike(postId, userId)

        } else {
            // If the user hasn't liked the video, then we will check user dislike post or not

            if (await isAlreadyDisliked(postId, userId)) {
                // user already dislike the video| post so un-dislike the post then like it

                // removal of dislike
                await removeDislike(postId, userId)
            }

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


        if (await isAlreadyDisliked(postId, userId)) {
            // If the user has already disliked the video, undislike it

            // removal dilike
            removeDislike(postId, userId)

        } else {

            // If the user hasn't disliked the video, then we will check user like post or not

            if (await isAlreadyLiked(postId, userId)) {
                // user already like the video| post so un-like the post then dislike it

                // removal of like
                await removeLike(postId, userId)
            }

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
                data: { dislikesCount: { increment: 1 } }
            });
        }

        return true;

    } catch (error) {

        return false;

    }
}


