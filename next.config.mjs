/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "ui-avatars.com"
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com"
            },
            {
                protocol: "https",
                hostname: "e0.pxfuel.com"
            },
        ],
    },
    env: {
        BASE_URL: "http://localhost:3000"
    },
};

export default nextConfig;
