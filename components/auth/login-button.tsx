"use client"

import { useRouter } from "next/navigation"

interface loginProps{
    
    children: React.ReactNode,
    mode?: "modal" | "redirect",
    asChild?:boolean

};

export const LoginButton = ({
    children,mode="redirect",asChild
}:loginProps
) => {

    const router = useRouter()
    const onClick =()=>{
        router.push('/auth/login')
    }

  return (
    <span onClick={onClick}>
        {children}
    </span>
  )
}
