import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json(
            {
                message: "Logout successful",
                success: true,
                data: null
            },
            { status: 200 }
        )

        response.cookies.set(
            "YOUTUBE_TOKEN",
            "",
            {
                httpOnly: true,
                secure: true,
                expires: new Date(0) // Set expiration date to a past time
            }
        );

        return response;

    } catch (err: any) {
        return NextResponse.json(
            {
                message: "Something went wrong",
                error: err.message,
                success: false
            },
            { status: 500 }
        )
    }
}