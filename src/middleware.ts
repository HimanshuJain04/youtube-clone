import { NextRequest, NextResponse } from 'next/server';

export default async function middlware() {
}


export const config = {
    matcher: [
        "/",
        "/login",
        "/signup",
        "/profile",
    ],
};


