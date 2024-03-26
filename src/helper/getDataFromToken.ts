import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";


export async function getDatafromToken(req: NextRequest) {
    try {

        const token = req.cookies.get('token')?.value || "";

        const userData: any = jwt.verify(token, process.env.JWT_SECRET!);

        return userData.id;

    } catch (err: any) {
        throw new Error(err.message);
    }
}