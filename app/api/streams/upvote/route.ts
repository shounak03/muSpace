import { auth } from "@/auth";
import { upvoteSchema } from "@/schema";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {

    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json(
          { success: false, message: "You must be logged in to retrieve space information" },
          { status: 401 }
        );
      }

      try {
        const body = upvoteSchema.parse(await req.json());
        const { songId} = body;
        
        await prisma.vote.create({
          data: {
            userId: session.user.id,
            songId: songId,

          },
        });
        return NextResponse.json({
          message: "Done!",
        });
      } catch (e) {
        return NextResponse.json(
          {
            message: "Error while upvoting",
          },
          {
            status: 403,
          },
        );
      }


}

export async function DELETE(req: NextRequest){
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      {
        message: "Unauthenticated",
      },
      {
        status: 403,
      },
    );
  }

  const body = upvoteSchema.parse(await req.json());
  const { songId} = body;

  try {
    await prisma.vote.delete({
      where:{
        userId_songId: {
          userId: session.user.id,
          songId: songId
        },
      },
    });
    return NextResponse.json({message:"Downvoted successfully"});
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error while downvoting",
      },
      {
        status: 403,
      },
    );

    
  }


}