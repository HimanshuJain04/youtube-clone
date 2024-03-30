"use server";

import client from "@/db";




export const viewsHandler = async (postId: string, userId: string) => {
    try {


        // if the user is loggedIn then push the user into viewsOnVideo DB

        if (userId) {
            // userId, that means user is loggedIn

            // check user is already watched video or not
            const isAlreadyWatched = await client.viewsOnVideo.findFirst(
                {
                    where: {
                        videoId: postId,
                        userId
                    }

                }
            )

            // if not then create new entry in db

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

        console.log("viewCount: ", viewsCount);

        return {
            viewsCount
        };

    } catch (error) {
        console.log("Error Views: ", error)
        return false;

    }
}
