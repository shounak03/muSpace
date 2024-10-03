'use client'


import { Labrada } from "next/font/google"
import { Button } from "../ui/button"
import Link from "next/link"
import { Url } from "url"

interface backButtonProps{
     href :String
     label: String
}

export  const BackButton = ({label,href}:backButtonProps)=>{
    return (
        <div>
        <Button variant={"link"} className="font-normal w-full" size={"sm"} asChild> 
            <Link href={href}>
                {label}
            </Link>
        </Button>
    </div>
  )
}
