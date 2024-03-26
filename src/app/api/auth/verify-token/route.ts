import User from "@/models/userSchema";
import { dbConnection } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

dbConnection();

export async function POST(req: NextRequest) {
    try {

        const reqBody = await req.json();
        const { token } = reqBody;

        const user = await User.findOne(
            {
                verifyToken: token,
                verifyTokenExpiry: { $gte: Date.now() }
            }
        );

        if (!user) {
            return NextResponse.json(
                {
                    message: "Invalid Token",
                    success: false,
                },
                { status: 400 }
            )
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return NextResponse.json(
            {
                message: "Verification Successfully",
                success: true,
            },
            { status: 200 }
        )

    } catch (err: any) {
        return NextResponse.json(
            {
                error: err.message
            },
            { status: 500 }
        )
    }
}


