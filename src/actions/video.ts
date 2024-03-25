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

        console.log(body)
        const { title, description, isAgeRestricted, tags, thumbnailFile, videoFile } = formToJSON(body);

        console.log(formToJSON(body))
        console.log(thumbnailFile)

        // const user = await currentUser();

        // const file = body.get("file") as File;

        // const buffer = await FileIntoBuffer(file);

        // const response = await uploadFileToCloudinary(buffer);

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

        return body;

    } catch (error: any) {
        throw new Error("Failed to create video: " + error.message);
        // return NextResponse.json(
        //     {
        //         success: false,
        //         message: "Server failed to create video, try again later",
        //         error: error,
        //         data: null
        //     },
        //     {
        //         status: 501
        //     }
        // );
    }


}