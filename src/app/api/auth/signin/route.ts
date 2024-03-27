import client from "@/db";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { serialize } from 'cookie';
import jwt from "jsonwebtoken";


export async function POST(request: NextRequest, response: NextResponse) {
    try {

        const reqBody = await request.json();
        const { userNameOrEmail, password } = reqBody;

        if (!userNameOrEmail || !password) {
            return NextResponse.json(
                {
                    success: false,
                    message: "All fields are required",
                    data: null
                }, {
                status: 404
            })
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

        if (!existedUser) {

            return NextResponse.json(
                {
                    success: false,
                    message: "User not found, please signup",
                    data: null
                }, {
                status: 404
            })
        }

        const passCheck = await bcrypt.compare(password, existedUser.password);

        if (!passCheck) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Password is not correct",
                    data: null
                }, {
                status: 401
            })
        }

        // create jwt token
        const tokenData = {
            id: existedUser.id,
            email: existedUser.email,
            userName: existedUser.userName,
            name: existedUser.name,
            profileImage: existedUser.profileImage,
        };

        console.log("env: ", process.env.JSON_WEB_TOKEN_SECRET)

        const cookieValue = serialize(
            'YOUTUBE_TOKEN',
            tokenData,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development', // 'secure' should be true in production
                expires: new Date(Date.now() + 3600000), // Adjust the expiry time as needed
                path: '/', // Path for which the cookie is valid
                sameSite: 'strict', // Configure sameSite attribute as needed
            }
        );

        // Set the cookie in the response header
        response.setHeader('Set-Cookie', cookieValue);

        console.log("cookie set")

        return NextResponse.json(
            {
                success: true,
                message: "Sign in successfully",
                data: existedUser,
            },
            {
                status: 200
            }
        );



    } catch (err: any) {
        return NextResponse.json(
            {
                success: false,
                message: "Server failed to sign in user, try again later",
                error: err.message,
                data: null,
            }, {
            status: 501
        });
    }
}