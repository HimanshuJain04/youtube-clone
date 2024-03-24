import { v2 as cloudinary } from "cloudinary";
import { cloudinaryConnection } from '@/config/cloudinaryConnection';

cloudinaryConnection();

export const uploadFileToCloudinary = async (file: any) => {
    try {
        const options: any = {
            folder: "Youtube",
            resource_type: "auto",
            quality: 100
        };

        // Using async/await for clarity
        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(options, function (error: any, result: any) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            }).end(file);
        });

        return result;

    } catch (error) {
        throw new Error("Upload File To Cloudinary Failed!!");
    }
}
