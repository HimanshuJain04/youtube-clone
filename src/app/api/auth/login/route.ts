import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";


export async function POST(req: NextRequest) {

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

    if (existedUser) {
        return NextResponse.json(
            {
                message: "User already registered!",
                data: null,
                success: false
            },
            {
                status: 401
            }
        );
    }

    // hashed the password
    const hashedPass = await bcrypt.hash(password, 10);

    const createdUser = await User.create(
        {
            email,
            password: hashedPass
        }
    );

    // return response
    return NextResponse.json(
        {
            message: "Signup successful",
            data: createdUser,
            success: true
        },
        {
            status: 201
        }
    );

}