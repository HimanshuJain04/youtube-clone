import { dbConnection } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "../../../../models/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dbConnection();

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json();
        const { email, password } = reqBody;

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({
                error: "User not found,please signup",
                success: false
            }, { status: 400 })
        }

        const passCheck = await bcrypt.compare(password, user.password);

        if (!passCheck) {
            return NextResponse.json({
                error: "Password does not match",
                success: false
            }, { status: 400 })
        }

        // create jwt token

        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username
        };

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1h" });

        const response = NextResponse.json(
            {
                message: "Login Successfully",
                data: user,
            },
            { status: 200 }
        )

        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;

    } catch (err: any) {
        return NextResponse.json(
            {
                error: err.message,
                success: false
            },
            { status: 500 }
        )
    }
}