import client from "@/db";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { sendEmail } from "@/helper/mailer";


export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json();
        const { userName, email, password, name } = reqBody;

        if (!userName || !email || !password || !name) {
            return NextResponse.json(
                {
                    success: false,
                    message: "All fields are required",
                    data: null
                }, {
                status: 404
            })
        }

        const existedUser = await client.user.findFirst(
            {
                where: {
                    email
                }
            }
        );

        if (existedUser) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User already exist,please login",
                    data: null
                }, {
                status: 400
            })
        }

        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const imageUrl = `https://ui-avatars.com/api/?name=${name}`

        const newUser = await client.user.create(
            {
                data: {
                    name,
                    email,
                    password: hashedPass,
                    userName,
                    profileImage: imageUrl
                }
            }
        );

        if (!newUser) {
            return NextResponse.json(
                {
                    success: false,
                    message: "New user not signup!",
                    data: null
                }, {
                status: 500
            })
        }

        await sendEmail({
            email, emailType: "VERIFY", userId: newUser.id
        });

        return NextResponse.json(
            {
                message: "User signup successfully",
                data: null,
                success: true
            },
            { status: 200 }
        );

    } catch (err: any) {
        console.log(err)
        return NextResponse.json(
            {
                error: err.message,
                success: false,
                message: "Server failed to signup new user, try again later",
                data: null
            },
            { status: 500 }
        )
    }
}