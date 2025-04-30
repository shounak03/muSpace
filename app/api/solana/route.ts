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

    const { songId, amount } = await req.json()
    const bidAmount = Number(amount);
    if (isNaN(bidAmount)) {
        return NextResponse.json({ success: false, error: 'Invalid amount' }, { status: 400 });
    }

    console.log('Processing bid:', bidAmount, user.id, songId);


    try {
        await prisma.bid.create({
            data: {
                userId: user?.id,
                songId,
                amount:bidAmount
            },
        });
        // const newBid = await prisma.song.update({
        //     where: { id: songId },
        //     data: { highestBid: amount },
        //     select:{highestBid:true}
        // })
        return NextResponse.json("done");

    } catch (e: any) {
        console.log(e);
        
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

export async function GET(req: NextRequest) {
    // const session = await auth()
    // if (!session?.user?.id) {
    //     return NextResponse.json({ success: false, error: 'User not authenticated' }, { status: 401 });
    // }
    // const user = await prisma.user.findUnique({
    //     where: { email: session?.user?.email ?? "" },
    // });

    // if (!user) {
    //     return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    // }
    const { searchParams } = new URL(req.url);
    const songId = searchParams.get('songId');
    if (!songId) {
        return NextResponse.json({ success: false, error: 'songId not found' }, { status: 404 });
    }
    const highestBid = await prisma.bid.findFirst({
        where: { songId },
        orderBy: { amount: 'desc' },
        select: { amount: true },
    });

    // if(!highestBid?.amount){
    //     return NextResponse.json({ success: false, error: 'songId not found' }, { status: 404 });
    // }


    // const newBid = (highestBid?.amount * 0.2) + 0.01 

    // const setnewBid = await prisma.song.update({
    //     where: { id:songId },
    //     data:{
    //         highestBid:newBid
    //     },
    //     select:{highestBid:true}
    // })

    // console.log(setnewBid);


    return NextResponse.json(highestBid);



}