import { verifyTokenCookie } from "@/helper/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {

        const userPayload: any = await verifyTokenCookie(req);

        return NextResponse.json(
            {
                message: "User Data fetch successfully",
                data: userPayload,
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
