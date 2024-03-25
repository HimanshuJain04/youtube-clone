"use server";

import client from "@/db";
import { uploadFileToCloudinary } from "@/utils/uploadFileToCloudinary";
import { FileIntoBuffer } from "@/utils/FileIntoBuffer";
import { currentUser } from "@clerk/nextjs";
import { formToJSON } from "axios";

// interface requestType {
//     description: String
//     title: String
//     isAgeRestricted: Boolean
//     tags: String[]
//     thumbnailFile: Blob;
//     videoFile: Blob;
// }

export async function createVideo(body: any) {
    try {
        const { title, description, isAgeRestricted, tags, thumbnailFile, videoFile } = formToJSON(body);

        if (!title || !description || !tags || !thumbnailFile || !videoFile) {
            throw new Error("All fields are required");
        }

        const user = await currentUser();

        if (!user) {
            throw new Error("User not found, Try again later");
        }

        const thumbnailBuffer = await FileIntoBuffer(thumbnailFile);
        const videoBuffer = await FileIntoBuffer(videoFile);

        const thumbnailRes = await uploadFileToCloudinary(thumbnailBuffer);
        const videoRes = await uploadFileToCloudinary(videoBuffer);

        const allTags = tags.split(",");

        const createdVideo = await client.video.create(
            {
                data: {
                    title,
                    description,
                    url: videoRes?.secure_url,
                    thumbnail: thumbnailRes?.secure_url,
                    isAgeRestricted: isAgeRestricted === "true" ? true : false,
                    tags: allTags,
                    userId: 1,
                    duration: videoRes.duration,
                }
            }
        );

        if (!createdVideo) {
            throw new Error("Server is failed to created video, Try again later");
        }

        console.log("Created: ", createdVideo);

        return createdVideo;

    } catch (error: any) {
        console.log(error)
        throw new Error("Server failed to create video", error);
    }
}


// return NextResponse.json(
//     {
//         success: true,
//         message: "Server successfully create video",
//         data: response
//     },
//     {
//         status: 201
//     }
// );