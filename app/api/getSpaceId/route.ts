import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


const prisma = new PrismaClient()

export async function GET(req:NextRequest) {

    const session = await auth();
    
    if (!session?.user?.id) {
        return NextResponse.json({ success: false, error: 'User not authenticated' }, { status: 401 });
    }



    try {
        console.log(session.user.id);
        
        const user = await prisma.user.findUnique({
          where: { id: session?.user?.id },
          include: { hostedSpaces: true },
        });
    
        if (!user) {
            return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
        }
    
        
        if (user.hostedSpaces.length > 0) {
          console.log("space exisits");
          
          return NextResponse.json({ success: true, spaceId: user.hostedSpaces[0].id }, { status: 200 });

        } else {
            return NextResponse.json({ success: false, message:"no space found" }, { status: 200 });
        }
    
      } catch (error) {
        return NextResponse.json({ success: false, err:"Something went wrong" }, { status: 500 });
      }
}