import { verifyTokenCookie } from "@/helper/verifyToken";
import { NextRequest, NextResponse } from "next/server";
import client from "@/db";

export async function GET(req: NextRequest) {
    try {

        const userData: any = await verifyTokenCookie(req);

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
