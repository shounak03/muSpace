"use client"



interface loginProps{
    
    children: React.ReactNode,
    mode?: "modal" | "redirect",
    asChild?:boolean

};

export const LoginButton = ({
    children,mode="redirect",asChild
}:loginProps
) => {
  return (
    <span>
        {children}
    </span>
  )
}
