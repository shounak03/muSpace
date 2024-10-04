// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";
import { auth, signOut } from "@/auth";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (session) {
      await signOut();
      window.location.reload();
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, message: "No active session" }, { status: 401 });
    }
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ success: false, message: "An error occurred during logout" }, { status: 500 });
  }
}