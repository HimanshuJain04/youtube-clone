"use server";
import client from "@/db";


export const subscribeUnsubscribeHandler = async (channelId: string, userId: string) => {
    try {

        // check user is already subscribed to channel or not
        const userSubscribedTo = await client.user.findUnique(
            {
                where: { id: userId },
                select: {
                    subscribesTo: true
                }
            }
        );

        const isSubscribed = userSubscribedTo?.subscribesTo?.some(
            (item: any) => item.id === channelId
        );

        if (!isSubscribed) {
            // Subscribe the user to the channel
            await client.user.update(
                {
                    where: { id: userId },
                    data: {
                        subscribesTo: { connect: { id: channelId } },
                        subscribesToCount: { increment: 1 }
                    }
                }
            );

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

        const channelSubscribers = await client.user.findFirst(
            {
                where: {
                    id: channelId
                },
                select: {
                    subscribersCount: true
                }
            }
        )

        return {
            status: !isSubscribed,
            channelSubscribers
        };

    } catch (error) {

        return false;

    }
}
