'use server'

import { auth } from "@/auth";

export const getMail = async () => {
    const session = await auth();
    const email = session?.user?.email;
    if (!email) {
        throw new Error("User not authenticated");
    }
    return email;
}
