import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()
export async function POST(req: NextRequest) {

    const session = await auth()
    if (!session?.user?.id) {
        return NextResponse.json({ success: false, error: 'User not authenticated' }, { status: 401 });
    }
    const user = await prisma.user.findUnique({
        where: { email: session?.user?.email ?? "" },
    });

    if (!user) {
        return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    const { songId } = await req.json()


    try {
        await prisma.bid.create({
            data: {
                userId: user?.id,
                songId: songId,
                amount:0.01
            },
        });
        return NextResponse.json({
            message: "Done!",
        });
    } catch (e: any) {

        return NextResponse.json(
            {
                message: "Error while bidding", error: e.message
            },
            {
                status: 403,
            },
        );
    }
}