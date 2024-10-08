'use client';

import { signOut } from "@/auth";
import { useRouter } from "next/navigation";

interface LogoutButtonProps {
    children: React.ReactNode;
}

export const LogoutButton = ({
    children
}: LogoutButtonProps) => {
    const router = useRouter();

    const onClick = async () => {
        try {
            await signOut({ redirectTo: '/' });
            router.refresh();
        } catch (error) {
            console.error("Logout error:", error);
        }
    }

    return (
        <span onClick={onClick} style={{ cursor: 'pointer' }}>
            {children}
        </span>
    )
}