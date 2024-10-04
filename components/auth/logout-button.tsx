"use client"

import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

interface LogoutButtonProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect";
    asChild?: boolean;
}

export const LogoutButton = ({
    children,
    mode = "redirect",
    asChild
}: LogoutButtonProps) => {
    const router = useRouter();

    const onClick = async () => {

        await signOut({ redirect: false });
        router.push('/auth/login');
        router.refresh(); 
    }

    // if (asChild) {
    //     return (
    //         <span onClick={onClick}>
    //             {children}
    //         </span>
    //     )
    // }

    return (
        <span onClick={onClick} style={{ cursor: 'pointer' }}>
            {children}
        </span>
    )
}