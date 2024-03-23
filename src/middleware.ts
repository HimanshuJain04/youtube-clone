import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({

});

export const config = {
    matcher: [
        // Protect all routes except internal Next.js paths and static files
        "/((?!.+\\.[\\w]+$|_next).*)",
        "/(api|trpc)(.*)",
    ],
};