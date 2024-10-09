
import { auth } from '@/auth';
import { spaceSchema } from '@/schema';
import { PrismaClient } from '@prisma/client';

import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export async function POST(request: Request) {

    const session = await auth();
    
    if (!session?.user?.id) {
        return NextResponse.json({ success: false, error: 'User not authenticated' }, { status: 401 });
    }
    try {
        const body = await request.json();
        const { name, description, privateKey } = spaceSchema.parse(body)


        // const url = `${process.env.NEXT_PUBLIC_BASE_URL}/space/${uuidv4()}`;

        const space = await prisma.space.create({

            data: {
                name:name,
                description:description,
                privateKey: privateKey,
                hostId:session.user.id
            },
        });

        

        return NextResponse.json({ success: true,message:"space created successfully", space }, { status: 201 });
    } catch (error) {
        console.error('Error creating space:', error);
        NextResponse.json({ success: false, error: 'Error creating space' }, { status: 500 });
    }
}
