"use server";

import client from "@/db";

export async function signup(userData) {

    try {
        const { name, userName, email, password } = userData;
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
        console.log("Error when signup user: ", error)
        return false;
    }
}


export async function signin(userData) {

    try {
        const { userNameOrEmail, password } = userData;
        if (!userNameOrEmail || !password) {
            return null;
        }


        let whereCondition;

        if (userNameOrEmail.includes("@gmail.com")) {
            whereCondition = {
                email: userNameOrEmail
            };
        } else {
            whereCondition = {
                userName: userNameOrEmail
            };
        }

        const existedUser = await client.user.findUnique({
            where: whereCondition,
        });

        return existedUser;

    } catch (error) {
        console.log("Error when signup user: ", error);
        return null;
    }
}