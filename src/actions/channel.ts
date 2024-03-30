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
            const updatedUser = await client.user.update(
                {
                    where: { id: userId },
                    data: {
                        subscribesTo: { connect: { id: channelId } },
                        subscribesToCount: { increment: 1 }
                    },
                    select: {
                        subscribesTo: true,
                        subscribesToCount: true,
                        name: true,
                    }
                }
            );

            // Update the channel's subscriber count
            const updatedChannel = await client.user.update({
                where: { id: channelId },
                data: {
                    subscribers: { connect: { id: userId } },
                    subscribersCount: { increment: 1 }
                },
                select: {
                    subscribers: true,
                    subscribersCount: true,
                    name: true,
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

        return {
            status: !isSubscribed
        };

    } catch (error) {

        return false;

    }
}
