import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/user.model";
import { dbConnection } from "@/config/dbConnection";

dbConnection();

export async function POST(req: NextRequest) {

    try {
        const body = await req.json();

        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                {
                    message: "Email and password are required",
                    data: null,
                    success: false
                },
                {
                    status: 401
                }
            );
        }

        console.log(email, password);

        // do database things here

        // check user is exist or not with email or username
        const existedUser = await User.findOne({ email });

        if (!existedUser) {
            return NextResponse.json(
                {
                    message: "User is not registered!",
                    data: null,
                    success: false
                },
                {
                    status: 404
                }
            );
        }

        // hashed the password
        const comparedPass = await bcrypt.compare(password, existedUser.password);

        if (!comparedPass) {
            return NextResponse.json(
                {
                    message: "Password doesn't match!",
                    data: null,
                    success: false
                },
                {
                    status: 401
                }
            );
        }

        // return response
        return NextResponse.json(
            {
                message: "Login successful",
                data: existedUser,
                success: true
            },
            {
                status: 201
            }
        );

    } catch (error) {
        return NextResponse.json(
            {
                message: "Server can't login user!",
                data: null,
                success: false,
                error: error
            },
            {
                status: 501
            }
        );
    }

}