import client from "@/db";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { serialize } from 'cookie';
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {

    try {

        const reqBody = await request.json();
        const { userNameOrEmail, password } = reqBody;

        if (!userNameOrEmail || !password) {
            return NextResponse.json({
                success: false,
                message: "All fields are required",
                data: null
            }, {
                status: 404
            });
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
            return NextResponse.json({
                success: false,
                message: "User not found, please signup",
                data: null
            }, {
                status: 404
            });
        }

        const passCheck = await bcrypt.compare(password, existedUser.password);

        if (!passCheck) {
            return NextResponse.json({
                success: false,
                message: "Password is not correct",
                data: null
            }, {
                status: 401
            });
        }

        // Create JWT token
        const tokenData = {
            id: existedUser.id,
            email: existedUser.email,
            userName: existedUser.userName,
            name: existedUser.name,
            profileImage: existedUser.profileImage,
        };

        const token = await jwt.sign(
            tokenData,
            process.env.JSON_WEB_TOKEN_SECRET,
            {
                expiresIn: "1h"
            }
        );

        const response = NextResponse.json(
            {
                success: true,
                message: "Sign in successfully",
                data: existedUser,
            },
            {
                status: 200
            }
        );


        response.cookies.set(
            "YOUTUBE_TOKEN",
            token,
            {
                httpOnly: true,
                secure: true,
            }
        );

        return response;

        return
    } catch (err: any) {
        return NextResponse.json({
            success: false,
            message: "Server failed to sign in user, try again later",
            error: err.message,
            data: null,
        }, {
            status: 501
        });
    }
}
