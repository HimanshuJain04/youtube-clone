
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function verifyTokenCookie(request: NextRequest) {
    try {
        // Fetch token from cookies
        const token = request.cookies.get('YOUTUBE_TOKEN')?.value || "";

        if (!token) {
            return;
        }

        const data = await jwt.decode(token);
        return data;

    } catch (error) {
        console.error("Error verifying token:", error);
        return null; // Token verification failed, return or handle the error accordingly
    }
}