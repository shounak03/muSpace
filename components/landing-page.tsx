'use client'
import { Link } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

export function SpaceCheckComp() {
    
    const router = useRouter()
    const checkSpace = async () => {
        const resp = await fetch('api/getSpaceId')
        const data = await resp.json()
        
        if(data.success){
            router.push(`spaces/${data.spaceId}`)
        }
        else{
            router.push('/dashboard')
        }
      };
    
      return (
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter p-2 sm:text-4xl md:text-5xl lg:text-6xl/none text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Listen Together, Anywhere
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                Create your own music space, invite friends, and enjoy synchronized listening experiences. Your music, your rules.
              </p>
            </div>
            <div className="flex space-x-4">
              {/* <Link href={'/dashboard'}> */}
                <Button onClick={checkSpace} className="bg-purple-600 text-white hover:bg-purple-700">Create a Space</Button>
              {/* </Link> */}
                <Button  variant="outline" className="text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-gray-900">Join a Space</Button>
            </div>
            
          </div>
        </div>
      </section>
    )
}
