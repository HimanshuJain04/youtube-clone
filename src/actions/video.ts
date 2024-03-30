"use server";

import client from "@/db";
import { uploadFileToCloudinary } from "@/utils/uploadFileToCloudinary";
import { FileIntoBuffer } from "@/utils/FileIntoBuffer";
import { formToJSON } from "axios";


export async function createVideo(body: any) {
    try {
        const { title, description, isAgeRestricted, userId, tags, thumbnailFile, videoFile
        } = formToJSON(body);

        if (!title || !description || !tags || !thumbnailFile || !videoFile) {
            throw new Error("All fields are required");
        }

        if (!userId) {
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
                    userId: userId,
                    duration: videoRes.duration,
                }
            }
        );

        if (!createdVideo) {
            throw new Error("Server is failed to created video, Try again later");
        }

        return createdVideo;

    } catch (error: any) {
        console.log(error)
        throw new Error("Server failed to create video", error);
    }
}


export async function fetchUserVideos(channelId: string) {
    try {

        if (!channelId) {
            return null;
        }

        const allVideos = await client.video.findMany(
            {
                where: {
                    userId: channelId
                },
                select: {
                    id: true,
                    title: true,
                    duration: true,
                    thumbnail: true,
                    createdAt: true,
                    url: true,
                    viewsCount: true,
                    user: {
                        select: {
                            id: true,
                            profileImage: true,
                            userName: true,
                            name: true,
                        },
                    },
                },
            }
        );
        return allVideos;

    } catch (error) {
        return null;
    }
}








