"use server";

import client from "@/db";



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
