"use server";

import client from "@/db"
import { auth, currentUser } from "@clerk/nextjs";


export async function getUserDetails() {

    try {
        const user = await currentUser();
        console.log("user: ", user);

        if (!user) {
            return false;
        }

        // client.user.create(
        //     data: {
        //     name: user?.firstName + user?.lastName,
        //     email: user.emailAddresses[0].emailAddress,
        //     userName: userName,
        //     profileImage: "user"
        // }
        // )

        return true;

    } catch (error) {

        console.log("Error: ", error);

        return false;
    }
}