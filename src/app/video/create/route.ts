import { NextRequest, NextResponse } from "next/server";
import { currentUser } from '@clerk/nextjs';
import { uploadFileToCloudinary } from "@/utils/uploadFileToCloudinary";


export async function POST(req: NextRequest) {

    try {

        // const user = await currentUser();
        const body = await req.formData();

        const file = body.get("file") as File;
        const arrayBuffer = await file.arrayBuffer();

        const buffer = new Uint8Array(arrayBuffer);

        const response = await uploadFileToCloudinary(buffer);

        console.log(response)

        return NextResponse.json(
            {
                success: true,
                message: "Server successfully create video",
                data: response
            },
            {
                status: 201
            }
        );

    } catch (error: any) {
        console.log(error)
        return NextResponse.json(
            {
                success: false,
                message: "Server failed to create video, try again later",
                error: error,
                data: null
            },
            {
                status: 501
            }
        );
    }

}
