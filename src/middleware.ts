import type { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(request: NextRequest, next: () => void) {
    try {
        // Fetch token from cookies
        const token = request.cookies.get('YOUTUBE_TOKEN')?.value || "";

        if (!token) {
            return;
        }

        const decodedToken = await jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET!);

        if (!decodedToken) {
            return;
        }

        console.log("Decoded token:", decodedToken);

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
