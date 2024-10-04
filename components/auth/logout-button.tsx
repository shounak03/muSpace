"use client"

import { useRouter } from "next/navigation"

interface LogoutButtonProps {
    children: React.ReactNode;
}

export const LogoutButton = ({
    children
}: LogoutButtonProps) => {
    const router = useRouter();

    const onClick = async () => {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
            });

            if (response.ok) {
                router.push('/'); // Redirect to home page after logout
                router.refresh(); // Refresh the current route
            } else {
                console.error("Logout failed");
            }
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