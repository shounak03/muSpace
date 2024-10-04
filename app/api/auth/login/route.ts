// app/api/auth/login/route.ts

import { NextResponse } from 'next/server';
import { LoginSchema } from "@/schema";
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = LoginSchema.parse(body);

        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        });

        return NextResponse.json({ success: "Login successful" });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
                case "CallbackRouteError":
                    return NextResponse.json({ error: "There was a problem with the login callback" }, { status: 500 });
                default:
                    return NextResponse.json({ error: "An unexpected authentication error occurred" }, { status: 500 });
            }
        } else if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}