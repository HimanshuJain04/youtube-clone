"use server";

import client from "@/db";


// Check if the user has already liked the video
const isAlreadyLiked = async (postId: string, userId: string) => {

    try {

        return await client.likesOnVideo.findFirst({
            where: {
                videoId: postId,
                userId: userId
            }
        });

    } catch (error) {
        console.log("Error isAlreadyLiked: ", error);
        throw new Error("isAlreadyLiked crashed");
    }

}


// Check if the user has already disliked the video
const isAlreadyDisliked = async (postId: string, userId: string) => {
    try {

        return await client.dislikesOnVideo.findFirst({
            where: {
                videoId: postId,
                userId: userId
            }
        });

    } catch (error) {
        console.log("Error isAlreadyDisliked: ", error);
        throw new Error("isAlreadyDisliked crashed");
    }
}


// Remove the like from db
const removeLike = async (postId: string, userId: string) => {
    try {
        // remove like
        const res = await client.likesOnVideo.delete({
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

        return true;

    } catch (error) {
        console.log("Error removeLike: ", error);
        throw new Error("ERROR : removeLike: ");
    }
}


// Remove the dislike from db
const removeDislike = async (postId: string, userId: string) => {
    try {
        // remove dislike
        const res = await client.dislikesOnVideo.delete({
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
            data: { dislikesCount: { decrement: 1 } }
        });

        return true;

    } catch (error) {
        console.log("Error removeDislike: ", error);
        throw new Error("ERROR : removeDislike: ");
    }

}



export const likedPostHandler = async (postId: string, userId: string) => {
    try {

        const isLiked = await isAlreadyLiked(postId, userId)

        if (isLiked) {
            // If the user has already liked the video, unlike it
            await removeLike(postId, userId);

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

        const likeCount = await client.video.findFirst(
            {
                where: {
                    id: postId
                },
                select: {
                    likesCount: true,
                    dislikesCount: true
                }
            }
        )

        return {
            status: !isLiked,
            likeCount
        };

    } catch (error) {

        return false;

    }
}



export const dislikedPostHandler = async (postId: string, userId: string) => {
    try {

        const isDisliked = await isAlreadyDisliked(postId, userId);

        if (isDisliked) {
            // If the user has already disliked the video, undislike it

            // removal dilike
            await removeDislike(postId, userId)

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

        const likeCount = await client.video.findFirst(
            {
                where: {
                    id: postId
                },
                select: {
                    likesCount: true,
                    dislikesCount: true
                }
            }
        );

        return {
            status: !isDisliked,
            likeCount
        };

    } catch (error) {

        return false;
    }
}




