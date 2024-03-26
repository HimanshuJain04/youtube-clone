"use server";

import client from "@/db";

export async function signup(userData) {

    try {

        const { name, userName, email, password } = userData;
        console.log(userData)

        if (!name || !userName || !email || !password) {
            return false;
        }

        const createdUser = await client.user.create(
            {
                data: {
                    name,
                    userName,
                    password,
                    email
                }
            }
        )

        console.log("created: ", createdUser);

        return true;

    } catch (error) {
        console.log("Error: ", error)
        return false;
    }
}