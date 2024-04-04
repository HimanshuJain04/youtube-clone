"use server";
import client from "@/db";

// create
export const createComment = async (body: any) => {
    try {

        const { userId, content, videoId } = body;

        console.log(userId, content, videoId)

        if (!userId || !content || !videoId) {
            return null;
        }

        const createdComment = await client.comment.create(
            {
                data: {
                    user: {
                        connect: {
                            id: userId
                        }
                    },
                    video: {
                        connect: {
                            id: videoId
                        }
                    },
                    content
                },
                select: {
                    id: true,
                    content: true,
                    createdAt: true,
                    user: {
                        select: {
                            profileImage: true,
                            id: true,
                            userName: true
                        }
                    }
                }
            }
        );

        return createdComment;

    } catch (error) {
        console.log("Error when creating comment: ", error)
        throw new Error("Comment can't be created");
    }
}

// delete
export const deleteComment = async (commentId: string) => {
    try {

        if (!commentId) {
            return { message: "All fields are required", data: null }
        }

        // delete from like db
        await client.likesOnComment.deleteMany(
            {
                where: {
                    commentId
                }
            }
        );

        // delete from dislike db
        await client.disLikesOnComment.deleteMany(
            {
                where: {
                    commentId
                }
            }
        );

        // delete from comment db
        const deletedComment = await client.comment.delete(
            {
                where: {
                    id: commentId
                }
            }
        );

        return true;

    } catch (error) {
        console.log("Error when deleting comment: ", error)
        throw new Error("Comment can't be deleted");
    }
}

// read
export const fetchVideoComments = async (videoId: string) => {
    try {

        if (!videoId) {
            return null;
        }

        // delete from comment db
        const allComments = await client.comment.findMany(
            {
                where: {
                    videoId
                },
                select: {
                    id: true,
                    content: true,
                    createdAt: true,
                    user: {
                        select: {
                            profileImage: true,
                            id: true,
                            userName: true
                        }
                    }
                }
            }
        );

        return allComments;

    } catch (error) {
        console.log("Error when fetching comment: ", error)
        throw new Error("Comment can't be fetched");
    }
}