import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname;

    const isPublic = path === "/login" || path === "/signup";

    const token = request.cookies.get('token')?.value || "";

    if (token && isPublic) {
        return NextResponse.redirect(new URL('/profile', request.nextUrl));
    }


    if (!token && !isPublic) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
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