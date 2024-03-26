import { dbConnection } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "../../../../models/userSchema";
import bcrypt from "bcrypt";
import { sendEmail } from "@/helpers/mailer";


dbConnection();


export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json();
        const { username, email, password } = reqBody;


        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({
                error: "User already exist,please login",
                success: true
            }, { status: 400 })
        }

        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPass
        });

        const savedUser = await newUser.save();

        await sendEmail({
            email, emailType: "VERIFY", userId: savedUser._id
        });

        return NextResponse.json(
            {
                message: "User created successfully",
                data: savedUser,
                success: true
            },
            { status: 200 }
        );

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