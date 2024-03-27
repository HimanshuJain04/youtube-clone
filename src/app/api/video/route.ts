
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
                include: {
                    user: true
                }
            }
        );

        console.log("videoData:   ", videoData)

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
