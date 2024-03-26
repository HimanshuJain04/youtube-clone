import { dbConnection } from "@/dbConfig/dbConfig";
import { getDatafromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userSchema";
import { NextRequest, NextResponse } from "next/server";

dbConnection();

export async function GET(req: NextRequest) {
    try {

        const userId: any = await getDatafromToken(req);

        const user = await User.findById(userId)
            .select("-password");

        return NextResponse.json(
            {
                message: "User Data fetch successfully",
                data: user,
                success: true

            },
            { status: 200 }
        )

    } catch (error: any) {
        return NextResponse.json(
            {
                message: "Something went wrong",
                error: error.message

            },
            { status: 500 }
        )
    }
}
