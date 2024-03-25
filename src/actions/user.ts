"use server";

import client from "@/db"
import { auth, currentUser } from "@clerk/nextjs";

async function getUserDetails() {
    try {
        const { userId }: { userId: string | null } = auth();
        const user = await currentUser();

        console.log("userId: ", userId);
        console.log("user: ", user);

        return true;

    } catch (error) {

        console.log("Error: ", error);

        return false;
    }
}