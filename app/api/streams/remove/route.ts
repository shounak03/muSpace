import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function DELETE(req: NextRequest) {

      try {
        const body = await req.json()
        const { songId, spaceId } = body
        

        await prisma.song.delete({
          where: { 
            id: songId,
            space: spaceId 
          }
        });
  
        NextResponse.json({ message: 'Song removed successfully' },{status:200});
      } catch (error) {
        NextResponse.json({ message: 'Erro removing song' },{status:500});
      }
    
    
  }