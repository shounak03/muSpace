// app/api/register/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import * as z from 'zod'

import { RegisterSchema } from "@/schema";


const prisma = new PrismaClient();

export async function POST(request: Request, values:z.infer<typeof RegisterSchema>) {
  try {
    
    const body = await request.json();
    const { email, password, fullname } = RegisterSchema.parse(body);

    // const validatedFields = RegisterSchema.safeParse(values)

    // if(!validatedFields)
    //   return NextResponse.json({ error: "Invalid fields" }, { status: 400 });

    // const { email, password, fullname } = validatedFields.data


    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const user = await prisma.user.create({
      data: {
        email,
        fullname,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ 
      user: { id: user.id, email: user.email, fullname: user.fullname } 
    }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}