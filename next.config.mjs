/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "dl6yzo6d9",
        NEXT_PUBLIC_CLOUDINARY_PRESET_NAME: "reawsuji"
    },
    images: {
        domains: ["res.cloudinary.com"],
    }
};

export default nextConfig;
