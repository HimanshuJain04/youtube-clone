
import client from "@/db";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const videoId = req.nextUrl.searchParams.get("videoId");


        const videoData = await client.video.findFirst(
            {
                where: {
                    id: videoId
                },
                select: {
                    id: true,
                    title: true,
                    createdAt: true,
                    url: true,
                    description: true,
                    viewsCount: true,
                    tags: true,
                    likesCount: true,
                    user: {
                        select: {
                            id: true,
                            profileImage: true,
                            userName: true,
                            name: true,
                        }
                    }
                }
            }
        );

        return NextResponse.json(
            {
                message: "Get video successfully",
                data: videoData,
                success: true
            },
            {
                status: 200
            }
        );

    } catch (err: any) {

        console.log(err)
        return NextResponse.json(
            {
                error: err.message,
                success: false,
                message: "Server failed to get video, try again later",
                data: null
            },
            {
                status: 500
            }
        );
    }
}
