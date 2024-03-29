


import client from "@/db";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const userName = req.nextUrl.searchParams.get("username");

        if (!userName) {
            return NextResponse.json(
                {
                    message: "Fetched channel failed",
                    data: null,
                    success: false
                },
                {
                    status: 400
                }
            );
        }

        const userData = await client.user.findFirst(
            {
                where: {
                    userName
                },
                select: {
                    id: true,
                    name: true,
                    userName: true,
                    description: true,
                    profileImage: true,
                    coverImage: true,
                    subscribersCount: true,
                }
            }
        )

        return NextResponse.json(
            {
                message: "Fetched channel successfully",
                data: userData,
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
                message: "Server failed to fetched channel, try again later",
                data: null
            },
            {
                status: 500
            }
        );
    }
}
