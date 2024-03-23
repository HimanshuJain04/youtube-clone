import { authMiddleware } from "@clerk/nextjs";


export default authMiddleware({

    // publicRoutes:["/"]

});


export const config = {
    matcher: [
        "/((?!.+\\.[\\w]+$|_next).*)",
        // Re-include any files in the api or trpc folders that might have an extension
        "/(api|trpc)(.*)"
    ]
};