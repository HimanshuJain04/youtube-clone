import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(request: NextRequest, next: () => void) {
    try {
        // Fetch token from cookies
        const token = request.cookies.get('YOUTUBE_TOKEN')?.value || "";

        if (!token) {
            return;
        }

        console.log("hih")
        // Manually verify the JWT token without using crypto module
        const decodedToken = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET, {
            algorithms: ['HS256'], // Specify the algorithm used for signing the token
        });

        console.log("decode: ", decodedToken);

        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        return; // Token verification failed, return or handle the error accordingly
    }
}

export const config = {
    matcher: [
        "/",
        "/login",
        "/signup",
        "/profile",
    ],
};
