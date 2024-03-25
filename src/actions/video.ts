
"use server";
import client from "@/db";
import { uploadFileToCloudinary } from "@/utils/uploadFileToCloudinary";
import { FileIntoBuffer } from "@/utils/FileIntoBuffer";
import { currentUser } from "@clerk/nextjs";

interface requestType {
    description: String
    title: String
    isAgeRestricted: Boolean
    tags: String[]
    thumbnailFile: File
    videoFile: File
}

async function createVideo(body: requestType) {
    try {

        const user = await currentUser();

        // const file = body.get("file") as File;

        // const buffer = await FileIntoBuffer(file);

        // const response = await uploadFileToCloudinary(buffer);

        console.log(body);

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

        return true;

    } catch (error: any) {
        console.log(error)
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

        return null;
    }


}