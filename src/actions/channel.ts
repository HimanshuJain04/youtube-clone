"use server";

import client from "@/db";

export const subscribeUnsubscribeHandler = async (channelId: string, userId: string) => {
    try {

        // check user is already subscribed to channel or not

        // const isSubscribed = await client.user.findUnique(
        //     {
        //         where: { id: userId },
        //         include: { subscribesTo: { where: { id: channelId } } }
        //     }
        // );

        const isSubscribed = false;

        console.log("isSubscribed: ", isSubscribed)

        if (!isSubscribed) {
            // Subscribe the user to the channel
            await client.user.update({
                where: { id: userId },
                data: {
                    subscribesTo: { connect: { id: channelId } },
                    subscribesToCount: { increment: 1 }
                }
            });

            // Update the channel's subscriber count
            await client.user.update({
                where: { id: channelId },
                data: {
                    subscribers: { connect: { id: userId } },
                    subscribersCount: { increment: 1 }
                }
            });

        } else {

            // Unsubscribe the user from the channel
            await client.user.update({
                where: { id: userId },
                data: {
                    subscribesTo: { disconnect: { id: channelId } },
                    subscribesToCount: { decrement: 1 }
                }
            });

            // Update the channel's subscriber count
            await client.user.update({
                where: { id: channelId },
                data: {
                    subscribers: { disconnect: { id: userId } },
                    subscribersCount: { decrement: 1 }
                }
            });
        }

        return true;

    } catch (error) {

        return false;

    }
}
