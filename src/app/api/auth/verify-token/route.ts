import { NextRequest, NextResponse } from "next/server";
import client from '@/db';

export async function PATCH(req: NextRequest) {

    try {
        const body = await req.json();
        const { verificationToken, userId } = body;

        const existingUser = await client.user.findFirst(
            {
                where: {
                    id: userId
                }
            }
        );

        if (!existingUser) {
            return NextResponse.json({
                message: "User not found, please sign up",
                success: false,
                data: null
            }, {
                status: 404
            });
        }

        if (existingUser.verifyTokenExpiry < Date.now()) {
            return NextResponse.json({
                message: "Link is expired, Try again",
                success: false,
                data: null
            }, {
                status: 401
            });
        }


        const isTokenCorrect = existingUser.verifyToken === verificationToken;

        if (!isTokenCorrect) {
            return NextResponse.json({
                message: "Token is not correct",
                success: false,
                data: null
            }, {
                status: 401
            });
        }

        // Update user's verification status
        await client.user.update({
            where: {
                id: userId
            },
            data: {
                isVerified: true,
                verifyToken: null,
                verifyTokenExpiry: null
            }
        });

        return NextResponse.json({
            message: "Verification successful",
            success: true,
            data: null
        }, {
            status: 200
        });

    } catch (err: any) {
        console.error("Error verifying token:", err);

        return NextResponse.json({
            error: err.message,
            message: "Server failed to verify token, please try again",
            success: false,
            data: null
        }, {
            status: 500
        });
    }
}
