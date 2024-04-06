import { NextRequest, NextResponse } from "next/server";
import client from "@/db";
import jwt from "jsonwebtoken"

export async function GET(req: NextRequest) {
    try {

        const token = req.cookies.get('YOUTUBE_TOKEN')?.value || "";

        if (!token) {
            return NextResponse.json(
                {
                    message: "Token not found",
                    data: null,
                },
                { status: 404 }
            )
        }

        const userData = await jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET!);

        if (!userData) {
            return NextResponse.json(
                {
                    message: "User not found",
                    data: null,
                },
                { status: 404 }
            )
        }



        const user = await client.user.findFirst(
            {
                where: {
                    id: userData.id,
                },
                select: {
                    id: true,
                    subscribesTo: true,
                    userName: true,
                    name: true,
                    email: true,
                    profileImage: true,
                    likedVideos: true,
                    dislikedVideos: true,
                    playlists: {
                        select: {
                            title: true,
                            id: true,
                        }
                    },
                }
            }
        );

        return NextResponse.json(
            {
                message: "User Data fetch successfully",
                data: user,
                success: true

            },
            { status: 200 }
        )

    } catch (error: any) {
        return NextResponse.json(
            {
                message: "Something went wrong",
                error: error.message,
                data: null
            },
            { status: 500 }
        )
    }
}
